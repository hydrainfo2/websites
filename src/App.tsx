/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryStrip } from './components/CategoryStrip';
import { FeaturedArticles } from './components/FeaturedArticles';
import { Sidebar } from './components/Sidebar';
import { FitnessTools } from './components/FitnessTools';
import { Footer } from './components/Footer';

// Pages
import { TrainingPage } from './pages/TrainingPage';
import { NutritionPage } from './pages/NutritionPage';
import { WellnessPage } from './pages/WellnessPage';
import { WorkoutPlansPage } from './pages/WorkoutPlansPage';
import { RecipesPage } from './pages/RecipesPage';
import { AboutPage } from './pages/AboutPage';

// Modals
import { ToolCalculatorModal } from './components/Modals/ToolCalculatorModal';
import { ArticleModal } from './components/Modals/ArticleModal';
import { SearchModal } from './components/Modals/SearchModal';
import { BookmarksModal } from './components/Modals/BookmarksModal';
import { SubscribeModal } from './components/Modals/SubscribeModal';
import { AdminPostModal } from './components/Admin/AdminPostModal';

// Data & Types
import { categories, articles as initialArticles, fitnessTools } from './data/fitnessData';
import { Article, CategoryId, ToolType } from './types';
import { ChevronRight, Home } from 'lucide-react';
import {
  fetchArticlesFromServer,
  createArticleOnServer,
  deleteArticleOnServer,
  subscribeNewsletterOnServer,
} from './api';

export default function App() {
  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  // Dynamic articles state (with custom local storage articles)
  const [allArticles, setAllArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mf_custom_articles');
      if (saved) {
        try {
          const parsed: Article[] = JSON.parse(saved);
          return [
            ...parsed,
            ...initialArticles.filter((a) => !parsed.some((p) => p.id === a.id)),
          ];
        } catch {
          return initialArticles;
        }
      }
    }
    return initialArticles;
  });

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('mf_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('mf_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('mf_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Bookmarks state with localStorage persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mf_bookmarks');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch {
          return new Set();
        }
      }
    }
    return new Set(['featured-main']);
  });

  const toggleBookmark = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      localStorage.setItem('mf_bookmarks', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [activeToolModal, setActiveToolModal] = useState<ToolType | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Fetch articles from Node.js / MongoDB backend on load
  useEffect(() => {
    fetchArticlesFromServer().then((serverArticles) => {
      if (serverArticles && serverArticles.length > 0) {
        setAllArticles(serverArticles);
      }
    });
  }, []);

  // Admin Article Actions (MongoDB + Node.js API synced)
  const handlePublishArticle = async (newArticle: Article) => {
    setAllArticles((prev) => {
      const existingIdx = prev.findIndex((a) => a.id === newArticle.id);
      let next: Article[];
      if (existingIdx >= 0) {
        next = [...prev];
        next[existingIdx] = newArticle;
      } else {
        next = [newArticle, ...prev];
      }
      return next;
    });

    const res = await createArticleOnServer(newArticle);
    if (res.success) {
      triggerToast(res.data ? `Article "${newArticle.title}" saved to database!` : 'Article saved to database!');
    } else {
      triggerToast(`Saved locally (Database sync: ${res.error || 'fallback active'})`);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    setAllArticles((prev) => prev.filter((a) => a.id !== articleId));
    await deleteArticleOnServer(articleId);
    triggerToast('Article deleted from database.');
  };

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setBookmarksOpen(false);
        setSubscribeOpen(false);
        setAdminModalOpen(false);
        setActiveToolModal(null);
        setActiveArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter articles based on active category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return allArticles;

    const categoryMap: Record<CategoryId, string[]> = {
      all: [],
      strength: ['Training', 'Strength'],
      'muscle-building': ['Training', 'Strength', 'Muscle Building'],
      'fat-loss': ['Nutrition', 'Fat Loss'],
      nutrition: ['Nutrition'],
      mobility: ['Wellness', 'Mobility'],
      recovery: ['Wellness', 'Recovery'],
      'home-workouts': ['Home Workouts', 'Training'],
      running: ['Running', 'Cardio', 'Training'],
    };

    const targetCategories = categoryMap[activeCategory] || [];
    return allArticles.filter((art) => targetCategories.includes(art.category));
  }, [activeCategory, allArticles]);

  // Main featured article
  const mainFeatured = useMemo(() => {
    return (
      allArticles.find((a) => a.featured) ||
      allArticles.find((a) => a.id === 'featured-main') ||
      allArticles[0]
    );
  }, [allArticles]);

  // 3 Stacked Articles for right side of Featured Articles
  const stackedArticles = useMemo(() => {
    const customFirst = allArticles.filter(
      (a) => a.id !== mainFeatured.id && !a.popular
    );
    if (customFirst.length >= 3) {
      return customFirst.slice(0, 3);
    }
    const ids = ['stacked-1', 'stacked-2', 'stacked-3'];
    return ids
      .map((id) => allArticles.find((a) => a.id === id))
      .filter(Boolean) as Article[];
  }, [allArticles, mainFeatured]);

  // 3 Popular posts for the sidebar
  const popularPosts = useMemo(() => {
    const populars = allArticles.filter((a) => a.popular);
    if (populars.length >= 3) return populars.slice(0, 3);
    const ids = ['popular-1', 'popular-2', 'popular-3'];
    return ids
      .map((id) => allArticles.find((a) => a.id === id))
      .filter(Boolean) as Article[];
  }, [allArticles]);

  // Bookmarked articles list
  const savedArticlesList = useMemo(() => {
    return allArticles.filter((a) => bookmarkedIds.has(a.id));
  }, [bookmarkedIds, allArticles]);

  // Handle Tab changes
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    setActiveArticle(null);
    setActiveToolModal(null);
    setSearchOpen(false);
    setBookmarksOpen(false);
    setSubscribeOpen(false);
    setAdminModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'Home') {
      setActiveCategory('all');
    }
  };

  const handleHeroRead = (articleId: string) => {
    const art = allArticles.find((a) => a.id === articleId) || allArticles[0];
    setActiveArticle(art);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenSubscribe={() => setSubscribeOpen(true)}
        savedCount={bookmarkedIds.size}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenTool={(tool) => setActiveToolModal(tool)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full">
        {/* Breadcrumbs for Subpages */}
        {activeTab !== 'Home' && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <button
              onClick={() => handleSelectTab('Home')}
              className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 dark:text-white font-bold">{activeTab}</span>
          </nav>
        )}

        {/* 1. HOME TAB (Original Design Clone) */}
        {activeTab === 'Home' && (
          <>
            {/* Hero Section */}
            <HeroBanner
              onStartTraining={() => {
                const main = allArticles.find((a) => a.id === 'featured-main') || allArticles[0];
                if (main) setActiveArticle(main);
              }}
              onExploreArticles={() => {
                const el = document.getElementById('featured-section-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onReadArticle={handleHeroRead}
            />

            {/* 9 Category Pills Strip */}
            <CategoryStrip
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                if (catId === 'all') setActiveTab('Home');
              }}
            />

            {/* Main Content Grid: Left 8 cols (Featured Articles) + Right 4 cols (Sidebar) */}
            <div
              id="featured-section-anchor"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
              {/* Left Column: Featured Articles (Big card + 3 stacked) */}
              <section className="lg:col-span-8">
                <FeaturedArticles
                  mainFeatured={mainFeatured}
                  stackedArticles={stackedArticles}
                  onReadArticle={(article) => setActiveArticle(article)}
                  onToggleBookmark={(id, e) => {
                    toggleBookmark(id, e);
                    triggerToast(
                      bookmarkedIds.has(id)
                        ? 'Removed from reading list'
                        : 'Saved to reading list'
                    );
                  }}
                  bookmarkedIds={bookmarkedIds}
                  onViewAllArticles={() => setSearchOpen(true)}
                />
              </section>

              {/* Right Column: Sidebar (Newsletter Card + Popular Posts) */}
              <section className="lg:col-span-4">
                <Sidebar
                  popularPosts={popularPosts}
                  onReadArticle={(article) => setActiveArticle(article)}
                  onViewAllPopular={() => setSearchOpen(true)}
                  onSubscribeEmail={async (email) => {
                    await subscribeNewsletterOnServer(email);
                    triggerToast(`Thank you! Added ${email} to weekly updates.`);
                  }}
                />
              </section>
            </div>

            {/* Free Fitness Tools Section */}
            <FitnessTools
              tools={fitnessTools}
              onOpenTool={(toolType) => setActiveToolModal(toolType)}
            />
          </>
        )}

        {/* 2. TRAINING PAGE */}
        {activeTab === 'Training' && (
          <TrainingPage
            articles={allArticles}
            onReadArticle={(article) => setActiveArticle(article)}
            onNavigateToPlans={() => handleSelectTab('Workout Plans')}
          />
        )}

        {/* 3. NUTRITION PAGE */}
        {activeTab === 'Nutrition' && (
          <NutritionPage
            articles={allArticles}
            onReadArticle={(article) => setActiveArticle(article)}
            onOpenTool={(tool) => setActiveToolModal(tool)}
            onNavigateToRecipes={() => handleSelectTab('Recipes')}
          />
        )}

        {/* 4. WELLNESS PAGE */}
        {activeTab === 'Wellness' && (
          <WellnessPage
            articles={allArticles}
            onReadArticle={(article) => setActiveArticle(article)}
          />
        )}

        {/* 5. WORKOUT PLANS PAGE */}
        {activeTab === 'Workout Plans' && <WorkoutPlansPage />}

        {/* 6. RECIPES PAGE */}
        {activeTab === 'Recipes' && <RecipesPage />}

        {/* 7. ABOUT PAGE */}
        {activeTab === 'About' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setActiveTab('Home');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        onOpenTool={(toolType) => setActiveToolModal(toolType)}
      />

      {/* Modals */}
      {/* 1. Interactive Tool Calculator Modal */}
      <ToolCalculatorModal
        toolType={activeToolModal || 'bmi'}
        isOpen={activeToolModal !== null}
        onClose={() => setActiveToolModal(null)}
        onSelectTool={(tool) => setActiveToolModal(tool)}
      />

      {/* 2. Full Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        isOpen={activeArticle !== null}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? bookmarkedIds.has(activeArticle.id) : false}
        onToggleBookmark={(id) => {
          toggleBookmark(id);
          triggerToast(
            bookmarkedIds.has(id)
              ? 'Removed from reading list'
              : 'Saved to reading list'
          );
        }}
      />

      {/* 3. Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={allArticles}
        onSelectArticle={(art) => setActiveArticle(art)}
      />

      {/* 4. Bookmarks Modal */}
      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedArticles={savedArticlesList}
        onSelectArticle={(art) => setActiveArticle(art)}
        onRemoveBookmark={(id) => {
          toggleBookmark(id);
          triggerToast('Article removed from saved');
        }}
      />

      {/* 5. Newsletter Subscribe Modal */}
      <SubscribeModal
        isOpen={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
        onSubscribe={async (email) => {
          await subscribeNewsletterOnServer(email);
          triggerToast(`Subscribed ${email} to weekly science updates!`);
        }}
      />

      {/* 6. Admin Article Publishing & Management Modal */}
      <AdminPostModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onPublishArticle={handlePublishArticle}
        onDeleteArticle={handleDeleteArticle}
        articles={allArticles}
      />

      {/* Toast Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-semibold shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

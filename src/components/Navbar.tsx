import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  Bookmark,
  Moon,
  Sun,
  Menu,
  X,
  PlusCircle,
  Home,
  Dumbbell,
  Apple,
  HeartPulse,
  CalendarRange,
  UtensilsCrossed,
  UserCheck,
  ChevronRight,
  Calculator,
  Mail,
  Sparkles,
  Flame,
  Droplets,
  Scale
} from 'lucide-react';
import { ToolType } from '../types';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenSubscribe: () => void;
  savedCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
  onOpenTool?: (tool: ToolType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenBookmarks,
  onOpenSubscribe,
  savedCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenAdmin,
  onOpenTool,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Automatically close sidebar if window is resized to desktop (lg)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const navLinks = [
    {
      name: 'Home',
      id: 'Home',
      icon: Home,
      description: 'Featured research & latest fitness articles',
    },
    {
      name: 'Training',
      id: 'Training',
      icon: Dumbbell,
      description: 'Biomechanics, progressive overload & lifts',
    },
    {
      name: 'Nutrition',
      id: 'Nutrition',
      icon: Apple,
      description: 'Protein targets, macros & meal science',
    },
    {
      name: 'Wellness',
      id: 'Wellness',
      icon: HeartPulse,
      description: 'CNS recovery & daily readiness scorecard',
    },
    {
      name: 'Workout Plans',
      id: 'Workout Plans',
      icon: CalendarRange,
      description: '3-Day, 4-Day & PPL structured training splits',
    },
    {
      name: 'Recipes',
      id: 'Recipes',
      icon: UtensilsCrossed,
      description: 'High-protein recipes with complete macro breakdown',
    },
    {
      name: 'About',
      id: 'About',
      icon: UserCheck,
      description: 'Head Coach Mukesh Kumar & CSCS philosophy',
    },
  ];

  const quickTools: { id: ToolType; label: string; icon: React.ElementType }[] = [
    { id: 'bmi', label: 'BMI', icon: Scale },
    { id: 'calorie', label: 'Calories', icon: Flame },
    { id: 'macro', label: 'Macros', icon: Apple },
    { id: '1rm', label: '1-Rep Max', icon: Dumbbell },
    { id: 'water', label: 'Hydration', icon: Droplets },
  ];

  const handleLinkClick = (id: string) => {
    onSelectTab(id);
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Brand Logo */}
          <button
            onClick={() => onSelectTab('Home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden text-left cursor-pointer"
            id="brand-logo-btn"
          >
            {/* Stylized "M" Fitness Logo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 44 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-xs transition-transform group-hover:scale-105"
              >
                <path d="M4 36L14 4L22 22L16 36H4Z" fill="#059669" />
                <path
                  d="M40 36L30 4L22 22L28 36H40Z"
                  fill="#1f2937"
                  className="dark:fill-emerald-400"
                />
                <circle cx="22" cy="11" r="3.5" fill="#10b981" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
                Mukesh
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wide text-emerald-600 dark:text-emerald-400 leading-none mt-1">
                Fitness
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Horizontal Nav Items */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                id={`nav-link-${link.id.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative px-2.5 py-1.5 text-[14px] 2xl:text-[15px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions Bar (Fully Adaptive across Mobile, Tablet, Laptop) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            id="navbar-search-btn"
            aria-label="Search articles"
            className="p-2 sm:p-2.5 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Search articles (Ctrl+K)"
          >
            <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            id="navbar-bookmarks-btn"
            aria-label="Saved articles"
            className="relative p-2 sm:p-2.5 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Saved bookmarks"
          >
            <Bookmark className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            id="navbar-theme-toggle"
            aria-label="Toggle dark mode"
            className="p-2 sm:p-2.5 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400 stroke-[2.2]" />
            ) : (
              <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
            )}
          </button>

          {/* Admin Editorial CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            id="navbar-admin-post-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 rounded-lg border border-emerald-500/50 dark:border-emerald-600/50 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer shrink-0"
            title="Admin Editorial CMS - Write or Manage Articles"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden md:inline">Admin Post</span>
          </button>

          {/* Subscribe CTA Button (Visible on tablet & desktop) */}
          <button
            onClick={onOpenSubscribe}
            id="navbar-subscribe-btn"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 lg:px-4.5 lg:py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all shrink-0 cursor-pointer"
          >
            Subscribe
          </button>

          {/* PROMINENT MENU BUTTON (OPENS FULL SIDEBAR DRAWER ON MOBILE & TABLET, HIDDEN ON LG SCREENS) */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            id="navbar-menu-btn"
            aria-expanded={sidebarOpen}
            aria-controls="navigation-sidebar-drawer"
            className={`flex lg:hidden items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer select-none ${
              sidebarOpen
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'border-neutral-200/90 dark:border-neutral-700 bg-neutral-50/90 dark:bg-neutral-800/90 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500/50 text-neutral-800 dark:text-neutral-200 hover:text-emerald-700 dark:hover:text-emerald-300'
            }`}
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            title={sidebarOpen ? 'Close Menu' : 'Open Navigation Menu'}
          >
            {sidebarOpen ? (
              <X className="w-4.5 h-4.5 stroke-[2.3]" />
            ) : (
              <Menu className="w-4.5 h-4.5 stroke-[2.3]" />
            )}
            <span className="font-bold">{sidebarOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>

    {/* FULL RESPONSIVE NAVIGATION SIDEBAR DRAWER (PORTALED DIRECTLY TO BODY TO AVOID STACKING/BLUR TRAP) */}
    {mounted &&
      createPortal(
        <AnimatePresence>
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-50 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />

              {/* Side Bar Panel (Slides in smoothly from the right) */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                id="navigation-sidebar-drawer"
                className="fixed inset-y-0 right-0 w-full sm:max-w-md md:max-w-lg bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col h-full overflow-hidden z-10"
              >
            {/* Sidebar Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-950/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-neutral-900 dark:text-white text-base leading-tight">
                    Navigation Menu
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Mukesh Fitness • Science-Backed Protocols
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                id="sidebar-close-btn"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close sidebar"
                title="Close Sidebar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Interactive Utility Bar in Sidebar */}
            <div className="p-3.5 sm:p-4 border-b border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
              <div className="grid grid-cols-3 gap-2">
                {/* Search Quick Button */}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    onOpenSearch();
                  }}
                  id="sidebar-search-trigger"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 text-xs font-semibold gap-1.5 transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Search</span>
                </button>

                {/* Bookmarks Quick Button */}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    onOpenBookmarks();
                  }}
                  id="sidebar-bookmarks-trigger"
                  className="relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 text-xs font-semibold gap-1.5 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="flex items-center gap-1">
                    Saved
                    {savedCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                        {savedCount}
                      </span>
                    )}
                  </span>
                </button>

                {/* Theme Toggle Button */}
                <button
                  onClick={onToggleDarkMode}
                  id="sidebar-theme-toggle"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 text-xs font-semibold gap-1.5 transition-colors cursor-pointer"
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-neutral-600" />
                  )}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            {/* Scrollable Navigation List with All Nav Links */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 px-2 flex items-center justify-between">
                <span>Navigation Pages</span>
                <span className="text-[10px] font-normal lowercase">Select to open</span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const IconComponent = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    id={`sidebar-link-${link.id.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl text-left transition-all cursor-pointer min-h-[52px] group ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                        }`}
                      >
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-bold leading-tight flex items-center gap-2">
                          <span>{link.name}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate leading-snug mt-0.5">
                          {link.description}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? 'text-emerald-600 dark:text-emerald-400 translate-x-0.5'
                          : 'text-neutral-400 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Free Tools Quick Bar inside Sidebar */}
              {onOpenTool && (
                <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Fitness Calculators</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {quickTools.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setSidebarOpen(false);
                            onOpenTool(tool.id);
                          }}
                          id={`sidebar-tool-${tool.id}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                          <ToolIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{tool.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Admin CMS Access Card inside Sidebar */}
              <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    onOpenAdmin();
                  }}
                  id="sidebar-admin-btn"
                  className="w-full p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 transition-colors flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                      <PlusCircle className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        Admin Editorial CMS
                      </div>
                      <div className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight mt-0.5">
                        Write, edit, or manage research articles
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Sidebar Bottom CTA */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/80 shrink-0">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onOpenSubscribe();
                }}
                id="sidebar-subscribe-btn"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe to Mukesh Fitness</span>
              </button>
              <p className="text-center text-[10px] text-neutral-400 mt-2">
                Weekly evidence-based protocols. No spam, ever.
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )}
</>
);
};

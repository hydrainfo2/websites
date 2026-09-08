import React, { useState } from 'react';
import { Award, ShieldCheck, Mail, Send, CheckCircle2, UserCheck, Dumbbell, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', goal: 'Muscle Building' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSent(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-neutral-900 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden border border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <UserCheck className="w-3.5 h-3.5" />
              About Head Coach
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Mukesh Kumar
            </h1>
            <p className="text-emerald-400 font-semibold text-lg">
              CSCS • Exercise Physiologist • Nutritionist
            </p>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              "My mission with Mukesh Fitness is simple: eradicate the deceptive gimmicks, quick-fix detoxes, and pointless junk volume that plagues the modern fitness industry. Real strength requires evidence, discipline, and progressive overload."
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-emerald-500/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                alt="Mukesh Kumar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center shadow-xs">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">12+</div>
          <div className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            Years Coaching Experience
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center shadow-xs">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">5,000+</div>
          <div className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            Athletes Trained
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center shadow-xs">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">100+</div>
          <div className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            Published Research Guides
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center shadow-xs">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
          <div className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            Evidence-Based Methodology
          </div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            No Pseudoscientific Nonsense
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every workout split, nutritional recommendation, and recovery protocol published here is derived from peer-reviewed sports science.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <Dumbbell className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            Progressive Overload Above All
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Muscles only respond to tension over time. We focus on compound mechanical tension, precise technical execution, and verifiable weekly progression.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            Sustainable Longevity
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Fitness shouldn't wreck your joints or dictate your entire life. We teach habits and lifestyle alignment you can maintain for decades.
          </p>
        </div>
      </div>

      {/* Contact & Coaching Inquiries */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-8 sm:p-10 shadow-xs max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            Get In Touch with Coach Mukesh
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Have a question about a workout plan, editorial inquiry, or 1-on-1 coaching? Send a direct message below.
          </p>
        </div>

        {formSent ? (
          <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
              Message Dispatched!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Coach Mukesh reviews inquiries every weekday. Expect a response within 24-48 hours.
            </p>
            <button
              onClick={() => {
                setFormSent(false);
                setFormData({ name: '', email: '', message: '', goal: 'Muscle Building' });
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                Primary Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
              >
                <option>Muscle Building & Hypertrophy</option>
                <option>Strength & Powerlifting (1RM)</option>
                <option>Fat Loss & Body Recomposition</option>
                <option>Mobility & Joint Rehabilitation</option>
                <option>General Editorial / Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                Message / Details
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell Coach Mukesh about your training background, current lifts, or question..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck, Dumbbell, BookOpen } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onSubscribe(email);
    setIsDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-5">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        {isDone ? (
          <div className="space-y-4 text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Welcome to the Inner Circle!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We've sent a confirmation email with your free starter program to{' '}
              <span className="font-semibold text-neutral-900 dark:text-white">
                {email}
              </span>
              .
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                Join Mukesh Fitness Weekly
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Get evidence-based training programs, diet templates, and exclusive advice straight to your inbox.
              </p>
            </div>

            <div className="space-y-2.5 py-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <Dumbbell className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free 12-Week Progressive Strength Spreadsheet</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Evidence-based macro breakdown handbook</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% spam-free. One-click unsubscribe at any time</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your best email..."
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                Join & Download Free Guide
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

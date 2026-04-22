'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="bg-navy-900 text-white rounded-2xl shadow-2xl p-5 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  {t('message')}{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-gold-400 hover:underline"
                  >
                    {t('learnMore')}
                  </Link>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-4 py-2 bg-gold-500 text-navy-900 rounded-lg text-sm font-semibold hover:bg-gold-400 transition-colors"
                  >
                    {t('accept')}
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/10"
                  >
                    {t('decline')}
                  </button>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="shrink-0 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

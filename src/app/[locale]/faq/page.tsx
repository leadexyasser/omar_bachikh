'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react';

const faqKeys = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'] as const;

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const faqs = faqKeys.map((key) => ({
    key,
    question: t(key as Parameters<typeof t>[0]),
    answer: t(key.replace('q', 'a') as Parameters<typeof t>[0]),
  }));

  const filtered = faqs.filter(
    (faq) =>
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300 mb-8">{t('pageSubtitle')}</p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 text-base outline-none border-2 border-transparent focus:border-gold-400 transition-all"
            />
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div
                key={faq.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream-100 transition-colors"
                  onClick={() => setOpen(open === faq.key ? null : faq.key)}
                  aria-expanded={open === faq.key}
                >
                  <span className="font-semibold text-navy-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-500 shrink-0 transition-transform duration-200 ${
                      open === faq.key ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {open === faq.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No questions found for &ldquo;{search}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-cream-100 rounded-3xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">Still Have Questions?</h2>
            <p className="text-gray-500 mb-6">Schedule a paid consultation and get personalized answers from Attorney Bachikh.</p>
            <Link href={localePath('/consultation')} className="btn-primary">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

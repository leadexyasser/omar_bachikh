'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ClipboardList, Calendar } from 'lucide-react';

export default function CtaSection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="relative bg-hero-gradient py-20 overflow-hidden" aria-label="Call to action">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gold-500/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-navy-800/50 translate-x-1/2 translate-y-1/2" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full text-gold-300 text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" /> Schedule Your Consultation Today
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href={localePath('/consultation')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold text-base hover:bg-gold-400 transition-all hover:-translate-y-0.5 shadow-gold hover:shadow-gold-hover"
            >
              {t('button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:4846408347"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white rounded-xl font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Phone className="w-5 h-5" />
              {t('phone')}
            </a>
          </div>

          <Link
            href={localePath('/visa-quiz')}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            {t('quiz')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

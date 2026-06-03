'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const areas = [
  { slug: 'family-based', tKey: 'familyBased' },
  { slug: 'asylum', tKey: 'asylum' },
  { slug: 'waivers', tKey: 'waivers' },
  { slug: 'removal-defense', tKey: 'removalDefense' },
  { slug: 'vawa-humanitarian', tKey: 'vawaHumanitarian' },
  { slug: 'employment-based', tKey: 'employmentBased' },
];

export default function PracticeAreasFeatured() {
  const t = useTranslations('practiceAreas');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-cream-100 py-24" aria-labelledby="practice-areas-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <div className="overline-label mb-5">
              <span className="w-8 h-px bg-gold-500" />
              Immigration Services
            </div>
            <h2 id="practice-areas-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-[0.95]">
              {t('title')}
            </h2>
          </div>
          <Link
            href={localePath('/practice-areas')}
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors shrink-0"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* Editorial numbered list */}
        <div className="grid lg:grid-cols-2 lg:gap-x-12 border-t border-gray-200">
          {areas.map((area, i) => {
            const titleKey = `${area.tKey}.title` as Parameters<typeof t>[0];
            const descKey = `${area.tKey}.desc` as Parameters<typeof t>[0];
            const num = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-gray-200"
              >
                <Link
                  href={localePath(`/practice-areas/${area.slug}`)}
                  className="group relative flex items-center gap-6 overflow-hidden px-5 sm:px-7 py-8 transition-colors duration-300 hover:bg-navy-900 rounded-2xl"
                >
                  {/* Decorative number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-4 rtl:right-auto rtl:left-4 font-serif text-[5rem] font-bold leading-none text-gray-100 transition-colors duration-300 group-hover:text-white/[0.06] select-none"
                  >
                    {num}
                  </span>

                  <span className="relative z-10 font-serif text-2xl font-bold text-gold-500/80 leading-none w-10 shrink-0">
                    {num}
                  </span>

                  <div className="relative z-10 flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-bold text-navy-900 transition-colors duration-300 group-hover:text-white">
                      {t(titleKey)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">
                      {t(descKey)}
                    </p>
                  </div>

                  <ArrowUpRight className="relative z-10 w-6 h-6 text-gray-300 shrink-0 transition-all duration-300 group-hover:text-gold-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile view-all */}
        <div className="sm:hidden mt-10">
          <Link
            href={localePath('/practice-areas')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart, Shield, Briefcase, Gavel, Scale } from 'lucide-react';

const areas = [
  { slug: 'family-based', tKey: 'familyBased', icon: Users, color: 'bg-blue-50 text-blue-700 group-hover:bg-blue-100', iconBg: 'bg-blue-100 group-hover:bg-blue-200' },
  { slug: 'asylum', tKey: 'asylum', icon: Shield, color: 'bg-green-50 text-green-700 group-hover:bg-green-100', iconBg: 'bg-green-100 group-hover:bg-green-200' },
  { slug: 'waivers', tKey: 'waivers', icon: Scale, color: 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100', iconBg: 'bg-indigo-100 group-hover:bg-indigo-200' },
  { slug: 'removal-defense', tKey: 'removalDefense', icon: Gavel, color: 'bg-red-50 text-red-700 group-hover:bg-red-100', iconBg: 'bg-red-100 group-hover:bg-red-200' },
  { slug: 'vawa-humanitarian', tKey: 'vawaHumanitarian', icon: Heart, color: 'bg-rose-50 text-rose-700 group-hover:bg-rose-100', iconBg: 'bg-rose-100 group-hover:bg-rose-200' },
  { slug: 'employment-based', tKey: 'employmentBased', icon: Briefcase, color: 'bg-purple-50 text-purple-700 group-hover:bg-purple-100', iconBg: 'bg-purple-100 group-hover:bg-purple-200' },
];

export default function PracticeAreasFeatured() {
  const t = useTranslations('practiceAreas');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-cream-100 py-20" aria-labelledby="practice-areas-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-navy-900/10 rounded-full text-navy-900 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Immigration Services
          </div>
          <h2 id="practice-areas-heading" className="section-title mb-4">
            {t('title')}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {areas.map((area, i) => {
            const Icon = area.icon;
            const titleKey = `${area.tKey}.title` as Parameters<typeof t>[0];
            const descKey = `${area.tKey}.desc` as Parameters<typeof t>[0];

            return (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  href={localePath(`/practice-areas/${area.slug}`)}
                  className="group flex flex-col bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full border border-gray-50"
                >
                  <div className={`w-12 h-12 rounded-xl ${area.iconBg} flex items-center justify-center mb-4 transition-colors duration-300`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${area.color.split(' ')[1]}`} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2 group-hover:text-navy-800 transition-colors">
                    {t(titleKey)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {t(descKey)}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                    {t('learnMore')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link href={localePath('/practice-areas')} className="btn-outline">
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

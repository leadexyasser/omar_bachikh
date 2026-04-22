'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

const posts = [
  { key: 'post1', slug: '2024-immigration-policy-updates', readTime: 8, category: 'Policy' },
  { key: 'post2', slug: 'marriage-green-card-complete-guide', readTime: 12, category: 'Green Cards' },
  { key: 'post3', slug: 'daca-renewal-guide-2024', readTime: 7, category: 'DACA' },
  { key: 'post4', slug: 'asylum-eligibility-process-rights', readTime: 10, category: 'Asylum' },
];

const categoryColors: Record<string, string> = {
  'Policy': 'bg-blue-100 text-blue-700',
  'Green Cards': 'bg-green-100 text-green-700',
  'DACA': 'bg-orange-100 text-orange-700',
  'Asylum': 'bg-purple-100 text-purple-700',
};

export default function BlogPreview() {
  const t = useTranslations('blog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-white py-20" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-navy-900/10 rounded-full text-navy-900 text-sm font-medium mb-3">
              <BookOpen className="w-4 h-4" />
              Immigration Insights
            </div>
            <h2 id="blog-heading" className="section-title">
              {t('title')}
            </h2>
            <p className="section-subtitle mt-2">{t('subtitle')}</p>
          </motion.div>
          <Link
            href={localePath('/blog')}
            className="shrink-0 btn-outline text-sm"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => {
            const titleKey = `${post.key}Title` as Parameters<typeof t>[0];
            const excerptKey = `${post.key}Excerpt` as Parameters<typeof t>[0];
            const dateKey = `${post.key}Date` as Parameters<typeof t>[0];

            return (
              <motion.article
                key={post.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={localePath(`/blog/${post.slug}`)}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Image placeholder */}
                  <div className={`h-44 bg-gradient-to-br ${
                    ['from-navy-900 to-navy-700', 'from-gold-600 to-gold-800', 'from-teal-600 to-navy-900', 'from-purple-600 to-navy-900'][i]
                  } flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                      </svg>
                    </div>
                    <BookOpen className="w-10 h-10 text-white/60" />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t(dateKey)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} {tc('minuteRead')}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-navy-900 leading-snug mb-2 group-hover:text-navy-700 transition-colors line-clamp-2">
                      {t(titleKey)}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3 mb-4">
                      {t(excerptKey)}
                    </p>

                    <div className="flex items-center gap-1 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

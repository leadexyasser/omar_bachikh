'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const posts = [
  { key: 'post1', slug: '2024-immigration-policy-updates', readTime: 8, category: 'Policy', gradient: 'from-navy-800 via-navy-900 to-[#060E1B]' },
  { key: 'post2', slug: 'marriage-green-card-complete-guide', readTime: 12, category: 'Green Cards', gradient: 'from-gold-600 via-gold-700 to-navy-900' },
  { key: 'post3', slug: 'daca-renewal-guide-2024', readTime: 7, category: 'DACA', gradient: 'from-teal-700 via-navy-800 to-navy-900' },
  { key: 'post4', slug: 'asylum-eligibility-process-rights', readTime: 10, category: 'Asylum', gradient: 'from-navy-700 via-navy-800 to-[#060E1B]' },
];

export default function BlogPreview() {
  const t = useTranslations('blog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  const featured = posts[0];
  const rest = posts.slice(1);

  const fk = (key: string, suffix: string) => `${key}${suffix}` as Parameters<typeof t>[0];

  return (
    <section className="bg-white py-24" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="overline-label mb-5">
              <span className="w-8 h-px bg-gold-500" />
              Immigration Insights
            </div>
            <h2 id="blog-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-[0.95]">
              {t('title')}
            </h2>
          </div>
          <Link
            href={localePath('/blog')}
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors shrink-0"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FEATURED */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={localePath(`/blog/${featured.slug}`)}
              className="group flex flex-col h-full rounded-3xl overflow-hidden bg-[#060E1B] shadow-deep border border-navy-900/50 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`relative h-56 sm:h-72 bg-gradient-to-br ${featured.gradient} overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="blog-grid-f" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blog-grid-f)" />
                  </svg>
                </div>
                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-navy-900">
                  {featured.category}
                </span>
              </div>
              <div className="p-7 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {t(fk(featured.key, 'Date'))}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime} {tc('minuteRead')}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-gold-400 transition-colors">
                  {t(fk(featured.key, 'Title'))}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3 mb-5">
                  {t(fk(featured.key, 'Excerpt'))}
                </p>
                <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                  {t('readMore')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </span>
              </div>
            </Link>
          </motion.article>

          {/* SMALL POSTS */}
          <div className="flex flex-col gap-5">
            {rest.map((post, i) => (
              <motion.article
                key={post.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <Link
                  href={localePath(`/blog/${post.slug}`)}
                  className="group flex items-stretch gap-5 h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`relative w-28 sm:w-36 shrink-0 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-[0.1]" aria-hidden="true">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`blog-grid-${i}`} width="18" height="18" patternUnits="userSpaceOnUse">
                            <path d="M 18 0 L 0 0 0 18" fill="none" stroke="white" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#blog-grid-${i})`} />
                      </svg>
                    </div>
                  </div>
                  <div className="py-4 pr-4 rtl:pr-0 rtl:pl-4 flex flex-col justify-center min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600 mb-1.5">{post.category}</span>
                    <h3 className="font-serif text-base font-bold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-600 transition-colors">
                      {t(fk(post.key, 'Title'))}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t(fk(post.key, 'Date'))}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} {tc('minuteRead')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile view-all */}
        <div className="sm:hidden mt-10">
          <Link
            href={localePath('/blog')}
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

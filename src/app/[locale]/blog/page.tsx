import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title'), description: t('subtitle') };
}

const categoryColors: Record<string, string> = {
  'Policy Updates': 'bg-blue-100 text-blue-700',
  'Green Cards': 'bg-green-100 text-green-700',
  'DACA': 'bg-orange-100 text-orange-700',
  'Asylum': 'bg-purple-100 text-purple-700',
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-white">
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={localePath(`/blog/${post.slug}`)}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-52 bg-gradient-to-br ${['from-navy-900 to-navy-700','from-gold-600 to-gold-800','from-teal-600 to-navy-900','from-purple-600 to-navy-900'][i % 4]} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`bg-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#bg-${i})`} />
                    </svg>
                  </div>
                  <BookOpen className="w-12 h-12 text-white/40" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} {tc('minuteRead')}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-navy-900 mb-3 group-hover:text-navy-700 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

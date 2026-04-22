import { getTranslations } from 'next-intl/server';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft, ArrowRight, Scale } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const localePath = (path: string) => `/${locale}${path}`;
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={localePath('/blog')} className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600 prose-strong:text-navy-900">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- (.*)/g, '<li>$1</li>') }} />
              </div>

              {/* CTA */}
              <div className="mt-12 bg-hero-gradient rounded-3xl p-8 text-white">
                <h3 className="font-serif text-2xl font-bold mb-3">Need Legal Help?</h3>
                <p className="text-gray-300 mb-6">Schedule a consultation with Attorney Bachikh to discuss your specific situation. A consultation fee applies.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={localePath('/consultation')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-xl font-bold text-sm hover:bg-gold-400 transition-colors">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href={localePath('/visa-quiz')} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
                    Take Visa Quiz
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Attorney card */}
              <div className="bg-cream-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">Omar M. Bachikh</p>
                    <p className="text-xs text-gray-500">Immigration Attorney, LLM</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  AILA member with 14+ years of experience serving the Orlando, FL community in English, Arabic, and French.
                </p>
                <Link href={localePath('/about')} className="text-xs font-semibold text-navy-900 hover:text-gold-600 transition-colors">
                  Learn more →
                </Link>
              </div>

              {/* Other posts */}
              {otherPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-navy-900 mb-4 text-sm">More Articles</h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={localePath(`/blog/${p.slug}`)}
                        className="block group"
                      >
                        <p className="text-sm font-medium text-gray-800 group-hover:text-navy-900 transition-colors leading-snug mb-1">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-400">{p.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

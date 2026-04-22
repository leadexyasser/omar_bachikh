import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Star, Quote, ArrowRight } from 'lucide-react';

const testimonialKeys = ['t1','t2','t3','t4','t5'] as const;
const colors = [
  'from-blue-600 to-navy-900',
  'from-green-600 to-teal-900',
  'from-purple-600 to-navy-900',
  'from-orange-500 to-red-900',
  'from-gold-500 to-navy-900',
];

export default function TestimonialsPage() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonialKeys.map((key, i) => (
              <div key={key} className="bg-white rounded-3xl p-7 shadow-card border border-gray-100 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center mb-5">
                  <Quote className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed flex-1 mb-6 text-sm">
                  &ldquo;{t(`${key}.text` as Parameters<typeof t>[0])}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white font-bold`}>
                    {(t(`${key}.name` as Parameters<typeof t>[0]) as string)[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{t(`${key}.name` as Parameters<typeof t>[0])}</p>
                    <p className="text-xs text-gray-500">{t(`${key}.origin` as Parameters<typeof t>[0])}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Video placeholder */}
            <div className="bg-cream-100 rounded-3xl p-7 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-semibold text-navy-900 mb-1">Video Testimonials</p>
              <p className="text-sm text-gray-500">Coming soon — real client stories</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-hero-gradient rounded-3xl p-10 text-center text-white">
            <h2 className="font-serif text-3xl font-bold mb-3">Ready to Write Your Success Story?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">Join hundreds of families and individuals who have trusted Attorney Bachikh with their immigration journey.</p>
            <Link href={localePath('/consultation')} className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold hover:bg-gold-400 transition-colors">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

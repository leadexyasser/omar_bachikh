import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Users, Heart, Shield, Briefcase, Gavel, Scale } from 'lucide-react';

const areas = [
  { slug: 'family-based', icon: Users, key: 'familyBased' },
  { slug: 'asylum', icon: Shield, key: 'asylum' },
  { slug: 'waivers', icon: Scale, key: 'waivers' },
  { slug: 'removal-defense', icon: Gavel, key: 'removalDefense' },
  { slug: 'vawa-humanitarian', icon: Heart, key: 'vawaHumanitarian' },
  { slug: 'employment-based', icon: Briefcase, key: 'employmentBased' },
];

const colors = [
  'from-blue-500 to-navy-900',
  'from-green-500 to-navy-900',
  'from-indigo-500 to-navy-900',
  'from-red-500 to-navy-900',
  'from-rose-500 to-navy-900',
  'from-purple-500 to-navy-900',
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'practiceAreas' });
  return { title: t('title'), description: t('subtitle') };
}

export default function PracticeAreasPage() {
  const t = useTranslations('practiceAreas');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map(({ slug, icon: Icon, key }, i) => {
              const titleKey = `${key}.title` as Parameters<typeof t>[0];
              const descKey = `${key}.desc` as Parameters<typeof t>[0];
              return (
                <Link
                  key={slug}
                  href={localePath(`/practice-areas/${slug}`)}
                  className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  {/* Color header */}
                  <div className={`h-28 bg-gradient-to-br ${colors[i]} flex items-center px-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pg-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pg-${i})`} />
                      </svg>
                    </div>
                    <Icon className="w-12 h-12 text-white/80" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-serif text-xl font-bold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
                      {t(titleKey)}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                      {t(descKey)}
                    </p>
                    <div className="flex items-center gap-1 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                      {t('learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Not Sure Where to Start?</h2>
          <p className="section-subtitle mb-8">Take our 3-minute Visa Eligibility Quiz to get personalized guidance on your immigration options.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localePath('/visa-quiz')} className="btn-primary">
              Take the Visa Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={localePath('/consultation')} className="btn-outline">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

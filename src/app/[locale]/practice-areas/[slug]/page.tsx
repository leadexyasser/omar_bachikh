import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, ArrowLeft, Phone, Calendar, Scale } from 'lucide-react';
import { practiceAreasData, practiceAreaSlugs, type PracticeAreaSlug } from '@/lib/practice-areas';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return practiceAreaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!practiceAreaSlugs.includes(slug as PracticeAreaSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'practiceAreas' });
  const key = slug.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
  const titleKey = `${key}.title` as Parameters<typeof t>[0];
  const descKey = `${key}.desc` as Parameters<typeof t>[0];
  return { title: t(titleKey), description: t(descKey) };
}

const areaColors: Record<PracticeAreaSlug, string> = {
  'family-based': 'from-blue-600 to-navy-900',
  'marriage-green-card': 'from-rose-500 to-navy-900',
  'citizenship': 'from-gold-500 to-navy-700',
  'asylum': 'from-green-600 to-teal-900',
  'work-visas': 'from-purple-600 to-navy-900',
  'student-visas': 'from-teal-600 to-navy-900',
  'deportation-defense': 'from-red-600 to-navy-900',
  'daca': 'from-orange-500 to-navy-900',
  'appeals-waivers': 'from-indigo-600 to-navy-900',
};

const slugToKey: Record<PracticeAreaSlug, string> = {
  'family-based': 'familyBased',
  'marriage-green-card': 'marriageGreenCard',
  'citizenship': 'citizenship',
  'asylum': 'asylum',
  'work-visas': 'workVisas',
  'student-visas': 'studentVisas',
  'deportation-defense': 'deportationDefense',
  'daca': 'daca',
  'appeals-waivers': 'appeals',
};

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;

  if (!practiceAreaSlugs.includes(slug as PracticeAreaSlug)) {
    notFound();
  }

  const areaSlug = slug as PracticeAreaSlug;
  const areaData = practiceAreasData[areaSlug];
  const t = await getTranslations('practiceAreas');
  const locale = (await params).locale;

  const localePath = (path: string) => `/${locale}${path}`;
  const key = slugToKey[areaSlug];
  const titleKey = `${key}.title` as Parameters<typeof t>[0];
  const descKey = `${key}.desc` as Parameters<typeof t>[0];
  const title = t(titleKey);
  const desc = t(descKey);
  const color = areaColors[areaSlug];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${color} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={localePath('/practice-areas')} className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Practice Areas
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">{desc}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key points */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">What We Handle</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {areaData.keyPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 bg-cream-100 rounded-xl p-4">
                      <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">The Process</h2>
                <div className="space-y-4">
                  {areaData.processSteps.map((step, i) => (
                    <div key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1 py-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Who May Qualify</h2>
                <ul className="space-y-3">
                  {areaData.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Consultation card */}
              <div className="bg-hero-gradient rounded-3xl p-6 text-white sticky top-24">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">
                  Need Help With {title}?
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Schedule a consultation with Attorney Bachikh to discuss your specific situation and options. A consultation fee applies.
                </p>
                <div className="space-y-3">
                  <Link
                    href={localePath('/consultation')}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gold-500 text-navy-900 rounded-xl font-bold text-sm hover:bg-gold-400 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Consultation
                  </Link>
                  <a
                    href="tel:4846408347"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-white/25 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (484) 640-8347
                  </a>
                </div>
              </div>

              {/* Other areas */}
              <div className="bg-cream-100 rounded-2xl p-5">
                <h3 className="font-semibold text-navy-900 mb-4 text-sm">Other Practice Areas</h3>
                <div className="space-y-2">
                  {practiceAreaSlugs
                    .filter((s) => s !== areaSlug)
                    .slice(0, 5)
                    .map((s) => {
                      const k = slugToKey[s];
                      const tk = `${k}.title` as Parameters<typeof t>[0];
                      return (
                        <Link
                          key={s}
                          href={localePath(`/practice-areas/${s}`)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900 hover:bg-white rounded-lg px-2 py-1.5 transition-all group"
                        >
                          <ArrowRight className="w-3 h-3 text-gold-500" />
                          {t(tk)}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

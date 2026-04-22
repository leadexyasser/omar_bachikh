import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

const resultKeys = ['r1','r2','r3','r4','r5','r6'] as const;
const resultCategories = ['Family', 'Deportation Defense', 'Asylum', 'Citizenship', 'Work Visas', 'DACA'];
const resultColors = [
  'bg-blue-500', 'bg-red-500', 'bg-green-500',
  'bg-gold-500', 'bg-purple-500', 'bg-orange-500',
];

export default function ResultsPage() {
  const t = useTranslations('results');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-12">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800">{t('disclaimer')}</p>
          </div>

          {/* Results grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {resultKeys.map((key, i) => {
              const titleKey = `${key}Title` as Parameters<typeof t>[0];
              const descKey = `${key}Desc` as Parameters<typeof t>[0];
              return (
                <div key={key} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-2 ${resultColors[i]}`} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">{resultCategories[i]}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-navy-900 mb-3">{t(titleKey)}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t(descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats row */}
          <div className="bg-hero-gradient rounded-3xl p-10 text-white">
            <h2 className="font-serif text-3xl font-bold text-center mb-10">A Track Record You Can Trust</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-10">
              {[
                { value: '500+', label: 'Cases Resolved' },
                { value: '14+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '100%', label: 'Dedication' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-serif text-4xl font-bold text-gold-400 mb-1">{value}</div>
                  <div className="text-gray-300 text-sm">{label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href={localePath('/consultation')} className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold hover:bg-gold-400 transition-colors">
                Get Your Case Review
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

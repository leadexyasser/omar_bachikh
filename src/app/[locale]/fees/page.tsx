import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle, ArrowRight, DollarSign, CreditCard, FileText, AlertTriangle } from 'lucide-react';

const stepIcons = [FileText, CheckCircle, FileText, FileText, FileText, FileText, CheckCircle];

export default function FeesPage() {
  const t = useTranslations('fees');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  const steps = [1,2,3,4,5,6,7];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Transparency pledge */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-100 rounded-3xl p-8 lg:p-12 mb-16">
            <div className="max-w-3xl">
              <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-navy-900" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mb-4">{t('transparencyTitle')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{t('transparencyText')}</p>
            </div>
          </div>

          {/* Process timeline */}
          <div className="mb-16">
            <h2 className="section-title text-center mb-4">{t('processTitle')}</h2>
            <p className="section-subtitle text-center mb-12">{t('processSubtitle')}</p>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200 hidden lg:block" />

              <div className="space-y-4">
                {steps.map((step) => {
                  const titleKey = `step${step}Title` as Parameters<typeof t>[0];
                  const descKey = `step${step}Desc` as Parameters<typeof t>[0];
                  return (
                    <div key={step} className="flex gap-6 items-start">
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center shrink-0 shadow-lg">
                        <span className="font-bold text-gold-400 text-lg">{step}</span>
                      </div>
                      <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-card transition-shadow">
                        <h3 className="font-semibold text-navy-900 mb-1">{t(titleKey)}</h3>
                        <p className="text-sm text-gray-600">{t(descKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fee overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-cream-100 rounded-3xl p-8">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">{t('feeTitle')}</h2>
              <p className="text-gray-600 text-sm mb-6">{t('feeNote')}</p>
              <div className="space-y-3">
                {[
                  { service: 'Family-Based Petition (I-130)', range: 'Starting at $1,500' },
                  { service: 'Adjustment of Status (I-485)', range: 'Starting at $2,500' },
                  { service: 'Naturalization (N-400)', range: 'Starting at $1,200' },
                  { service: 'Asylum Application', range: 'Starting at $2,000' },
                  { service: 'Deportation Defense', range: 'Starting at $3,000' },
                  { service: 'DACA Renewal', range: 'Starting at $500' },
                  { service: 'Work Visa (H-1B)', range: 'Starting at $3,500' },
                ].map(({ service, range }) => (
                  <div key={service} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 text-sm">
                    <span className="text-gray-700 font-medium">{service}</span>
                    <span className="text-navy-900 font-bold text-xs">{range}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                {t('feeDisclaimer')}
              </div>
            </div>

            <div className="bg-navy-900 rounded-3xl p-8 text-white">
              <h2 className="font-serif text-2xl font-bold mb-6">{t('paymentTitle')}</h2>
              <div className="space-y-4">
                {[t('payment1'), t('payment2'), t('payment3')].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <CreditCard className="w-5 h-5 text-gold-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-gray-300 text-sm mb-4">Get an exact quote — consultation fee applies.</p>
                <Link href={localePath('/consultation')} className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-xl font-bold text-sm hover:bg-gold-400 transition-colors">
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

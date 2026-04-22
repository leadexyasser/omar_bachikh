import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, GraduationCap, Globe, Phone, ArrowRight, CheckCircle, MapPin, Scale } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('pageTitle'), description: t('heroText') };
}

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full text-gold-300 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            {t('badgeText')}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
            {t('heroHeadline')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            {t('heroText')}
          </p>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — attorney photo */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
                <Image
                  src="/images/attorney-about.jpg"
                  alt="Omar Bachikh, Immigration Attorney"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Name overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6">
                  <p className="text-white font-serif text-xl font-bold">Omar M. Bachikh</p>
                  <p className="text-gold-400 text-sm mt-0.5">Immigration Attorney, Esq., LLM</p>
                  <p className="text-gray-300 text-xs mt-1">Orlando, Florida</p>
                  <div className="mt-3 flex gap-2">
                    {['EN', 'AR', 'FR'].map((lang) => (
                      <span key={lang} className="px-2.5 py-0.5 bg-white/20 rounded-full text-white text-xs font-semibold">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating credential card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-5 border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-gold-500" />
                  <span className="font-bold text-sm text-navy-900">Client Champion</span>
                </div>
                <p className="text-xs text-gray-500">Award Recipient 2021</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-500 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — bio text */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mb-2">
                {t('bio.title')}
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {[t('bio.credential1'), t('bio.credential2'), t('bio.credential3'), t('bio.credential4')].map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-full text-xs font-medium text-navy-900 border border-gray-200">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-500" />
                    {cred}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>{t('bio.p1')}</p>
                <p>{t('bio.p2')}</p>
                <p>{t('bio.p3')}</p>
              </div>

              {/* Philosophy quote */}
              <blockquote className="border-l-4 border-gold-500 pl-6 py-2 bg-cream-100 rounded-r-2xl italic text-navy-900 font-serif text-lg leading-relaxed mb-8">
                {t('bio.philosophy')}
              </blockquote>

              <Link href={localePath('/consultation')} className="btn-primary">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">{t('credentials.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('credentials.education'),
                icon: GraduationCap,
                items: [t('credentials.llm'), t('credentials.jd')],
                color: 'bg-blue-50 text-blue-600',
              },
              {
                title: t('credentials.admissions'),
                icon: Scale,
                items: [t('credentials.florida')],
                color: 'bg-navy-50 text-navy-600',
              },
              {
                title: t('credentials.memberships'),
                icon: Award,
                items: [t('credentials.aila')],
                color: 'bg-gold-50 text-gold-600',
              },
              {
                title: t('credentials.languages'),
                icon: Globe,
                items: [t('credentials.english'), t('credentials.arabic'), t('credentials.french')],
                color: 'bg-green-50 text-green-600',
              },
            ].map(({ title, icon: Icon, items, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-6">{t('philosophy.title')}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="text-lg">{t('philosophy.p1')}</p>
            <p>{t('philosophy.p2')}</p>
            <p>{t('philosophy.p3')}</p>
          </div>
        </div>
      </section>

      {/* Office info */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="font-serif text-3xl font-bold mb-6">{t('office.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
                  <div>
                    <p>{t('office.address')}</p>
                    <p>{t('office.city')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400" />
                  <a href="tel:4846408347" className="hover:text-gold-400 transition-colors">{t('office.phone')}</a>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gold-400 font-semibold mb-2">{t('office.hours')}</p>
                <p className="text-gray-300 text-sm">{t('office.monFri')}</p>
                <p className="text-gray-300 text-sm">{t('office.sat')}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-navy-800 h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-10 h-10 text-gold-400 mx-auto mb-2" />
                <p className="text-sm">6000 Turkey Lake Rd. Suite 201</p>
                <p className="text-xs">Orlando, Florida 32819</p>
                <a
                  href="https://maps.google.com/?q=6000+Turkey+Lake+Rd+Suite+201+Orlando+FL+32819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 px-4 py-2 bg-gold-500 text-navy-900 rounded-lg text-xs font-semibold hover:bg-gold-400 transition-colors"
                >
                  Open in Maps
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
      {/* Hero — full-width dark */}
      <section className="relative bg-[#060E1B] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060E1B] via-[#0A1628] to-[#0E2952]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overline-label mb-6">
            <span className="w-8 h-px bg-gold-500" />
            {t('badgeText')}
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] max-w-4xl tracking-tight">
            {t('heroHeadline')}
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mt-7">
            {t('heroText')}
          </p>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — attorney photo (no overlay) */}
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-navy-900/10 shadow-deep">
                <Image
                  src="/images/attorney-philadelphia.jpg"
                  alt="Omar M. Bachikh, Immigration Attorney"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Language badges below image */}
              <div className="mt-5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-500" aria-hidden="true" />
                {['EN', 'AR', 'FR', 'ES'].map((lang) => (
                  <span key={lang} className="px-3 py-1 rounded-full bg-cream-100 border border-gray-200 text-navy-900 text-xs font-semibold tracking-wide">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — bio text */}
            <div>
              <div className="overline-label mb-5">
                <span className="w-8 h-px bg-gold-500" />
                Meet Your Attorney
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-5 leading-tight">
                {t('bio.title')}
              </h2>
              <div className="flex flex-wrap gap-2 mb-7">
                {[t('bio.credential1'), t('bio.credential2'), t('bio.credential3'), t('bio.credential4')].map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-full text-xs font-medium text-navy-900 border border-gray-200">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-500" />
                    {cred}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-9">
                <p>{t('bio.p1')}</p>
                <p>{t('bio.p2')}</p>
                <p>{t('bio.p3')}</p>
              </div>

              {/* Philosophy quote — dramatic dark treatment */}
              <blockquote className="relative bg-[#060E1B] rounded-3xl p-8 sm:p-10 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" aria-hidden="true" />
                <span className="font-serif text-6xl text-gold-500/30 leading-none select-none" aria-hidden="true">&ldquo;</span>
                <p className="relative font-serif text-xl sm:text-2xl text-white leading-relaxed italic -mt-4">
                  {t('bio.philosophy')}
                </p>
              </blockquote>

              <Link
                href={localePath('/consultation')}
                className="mt-9 inline-flex items-center gap-2 px-7 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold text-base hover:bg-gold-400 transition-all hover:-translate-y-1 shadow-glow-gold"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials — dark cards */}
      <section className="bg-navy-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="overline-label justify-center mb-5">
              <span className="w-8 h-px bg-gold-500" />
              Qualifications
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{t('credentials.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: t('credentials.education'),
                icon: GraduationCap,
                items: [t('credentials.llm'), t('credentials.jd')],
              },
              {
                title: t('credentials.admissions'),
                icon: Scale,
                items: [t('credentials.florida')],
              },
              {
                title: t('credentials.memberships'),
                icon: Award,
                items: [t('credentials.aila')],
              },
              {
                title: t('credentials.languages'),
                icon: Globe,
                items: [t('credentials.english'), t('credentials.arabic'), t('credentials.french'), t('credentials.spanish')],
              },
            ].map(({ title, icon: Icon, items }) => (
              <div key={title} className="bg-navy-900 rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-semibold text-white mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
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

      {/* Philosophy — editorial layout */}
      <section className="bg-cream-100 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="overline-label mb-5">
                <span className="w-8 h-px bg-gold-500" />
                How We Work
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 leading-[0.95]">{t('philosophy.title')}</h2>
              <div className="w-12 h-0.5 bg-gold-500 mt-7" />
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg sm:text-xl text-navy-900 font-serif leading-relaxed">{t('philosophy.p1')}</p>
              <p>{t('philosophy.p2')}</p>
              <p>{t('philosophy.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Office info */}
      <section className="relative bg-[#060E1B] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060E1B] via-[#0A1628] to-[#0E2952]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="overline-label mb-5">
                <span className="w-8 h-px bg-gold-500" />
                Get In Touch
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-7 leading-tight">{t('office.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                  <div className="text-gray-300">
                    <p>{t('office.address')}</p>
                    <p>{t('office.city')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  <a href="tel:4846408347" className="text-gray-300 hover:text-gold-400 transition-colors">{t('office.phone')}</a>
                </div>
              </div>
              <div className="mt-7">
                <p className="text-gold-400 font-semibold mb-2">{t('office.hours')}</p>
                <p className="text-gray-400 text-sm">{t('office.monFri')}</p>
                <p className="text-gray-400 text-sm">{t('office.sat')}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden bg-navy-900 border border-white/5 h-72 flex items-center justify-center">
              <div className="text-center text-gray-400 px-6">
                <MapPin className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                <p className="text-sm text-gray-300">6000 Turkey Lake Rd. Suite 201</p>
                <p className="text-xs">Orlando, Florida 32819</p>
                <a
                  href="https://maps.google.com/?q=6000+Turkey+Lake+Rd+Suite+201+Orlando+FL+32819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gold-500 text-navy-900 rounded-xl text-sm font-semibold hover:bg-gold-400 transition-colors"
                >
                  Open in Maps
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

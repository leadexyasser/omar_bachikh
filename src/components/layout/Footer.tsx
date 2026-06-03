import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Award, Users, ArrowRight } from 'lucide-react';

const PRACTICE_AREA_SLUGS = [
  'family-based', 'asylum', 'waivers', 'removal-defense', 'vawa-humanitarian', 'employment-based',
];

const SLUG_TO_TITLE_KEY: Record<string, string> = {
  'family-based': 'familyBased.title',
  'asylum': 'asylum.title',
  'waivers': 'waivers.title',
  'removal-defense': 'removalDefense.title',
  'vawa-humanitarian': 'vawaHumanitarian.title',
  'employment-based': 'employmentBased.title',
};

export default function Footer() {
  const t = useTranslations('footer');
  const tp = useTranslations('practiceAreas');
  const tn = useTranslations('nav');
  const tc = useTranslations('cta');
  const locale = useLocale();

  const localePath = (path: string) => `/${locale}${path}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      {/* Pre-footer CTA bar */}
      <div className="bg-gold-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left rtl:md:text-right">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight max-w-xl">
            Ready to Protect Your Future?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={localePath('/consultation')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-navy-900 text-white rounded-xl font-semibold text-sm hover:bg-navy-800 transition-colors"
            >
              {tn('freeConsultation')}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href="tel:4846408347"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-navy-900 text-navy-900 rounded-xl font-semibold text-sm hover:bg-navy-900 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              {tc('phone')}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#060E1B] border-t-2 border-gold-500/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href={localePath('/')} className="flex items-center gap-3 mb-5 group">
                <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-gold-500/30 shrink-0">
                  <Image src="/images/logo.jpg" alt="Law Office of Omar Bachikh" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <span className="font-serif text-base font-bold text-white leading-none tracking-tight">Omar Bachikh</span>
              </Link>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {t('tagline')}
              </p>

              {/* Social links */}
              <div className="flex gap-3 mb-6">
                <a
                  href="https://www.facebook.com/omarimmigration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 hover:border-gold-500/30 text-gray-400 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/bachikhlaw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 hover:border-gold-500/30 text-gray-400 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@bachikhlaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 hover:border-gold-500/30 text-gray-400 transition-all"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.67a8.26 8.26 0 0 0 4.83 1.55V7.75a4.85 4.85 0 0 1-1.06-.06z"/>
                  </svg>
                </a>
              </div>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                  <Award className="w-3 h-3 text-gold-400" />
                  {t('aila')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                  <Users className="w-3 h-3 text-gold-400" />
                  {t('barAdmission')}
                </span>
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400 mb-5">
                {t('practiceAreas')}
              </h3>
              <ul className="space-y-2.5">
                {PRACTICE_AREA_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={localePath(`/practice-areas/${slug}`)}
                      className="text-sm text-gray-400 hover:text-gold-300 transition-colors"
                    >
                      {tp(SLUG_TO_TITLE_KEY[slug] as Parameters<typeof tp>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400 mb-5">
                {t('company')}
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/about', label: tn('about') },
                  { href: '/results', label: tn('results') },
                  { href: '/testimonials', label: tn('testimonials') },
                  { href: '/blog', label: tn('blog') },
                  { href: '/fees', label: tn('fees') },
                  { href: '/faq', label: tn('faq') },
                  { href: '/resources', label: tn('resources') },
                  { href: '/visa-quiz', label: 'Visa Eligibility Quiz' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={localePath(href)}
                      className="text-sm text-gray-400 hover:text-gold-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400 mb-5">
                {t('contact')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maps.google.com/?q=6000+Turkey+Lake+Rd+Suite+201+Orlando+FL+32819"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-300 transition-colors group"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-500 group-hover:text-gold-400" />
                    <span>6000 Turkey Lake Rd. Suite 201<br />Orlando, Florida 32819</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:4846408347"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold-300 transition-colors group"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-gold-500 group-hover:text-gold-400" />
                    (484) 640-8347
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:obachikh@bachikhlaw.com"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold-300 transition-colors group"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-gold-500 group-hover:text-gold-400" />
                    obachikh@bachikhlaw.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer + bottom bar */}
        <div className="border-t border-white/10 bg-[#04090F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              {t('disclaimer')}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                © {currentYear} Law Office of Omar Bachikh, LLC. {t('allRights')}
              </p>
              <div className="flex items-center gap-4">
                <Link href={localePath('/privacy')} className="text-xs text-gray-500 hover:text-gold-300 transition-colors">
                  {t('privacy')}
                </Link>
                <span className="text-gray-700">·</span>
                <Link href={localePath('/terms')} className="text-xs text-gray-500 hover:text-gold-300 transition-colors">
                  {t('terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

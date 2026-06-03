'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Menu, X, ChevronDown, Globe, Scale, Users, Heart,
  Shield, Briefcase, Gavel, ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const practiceAreaIcons: Record<string, React.ReactNode> = {
  'family-based': <Users className="w-4 h-4" />,
  'asylum': <Shield className="w-4 h-4" />,
  'waivers': <Scale className="w-4 h-4" />,
  'removal-defense': <Gavel className="w-4 h-4" />,
  'vawa-humanitarian': <Heart className="w-4 h-4" />,
  'employment-based': <Briefcase className="w-4 h-4" />,
};

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

const LOCALES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
];

export default function Header() {
  const t = useTranslations('nav');
  const tp = useTranslations('practiceAreas');
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'ar';

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobilePA, setMobilePA] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPracticeDropdown(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    window.location.href = segments.join('/');
  };

  const localePath = (path: string) => `/${locale}${path}`;
  const currentLang = LOCALES.find(l => l.code === locale);
  const solid = scrolled || mobileOpen;

  const isActive = (href: string) => {
    const full = localePath(href);
    return pathname === full || pathname.startsWith(full + '/');
  };

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: '/results', label: t('results') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ];

  const underline =
    'relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full rtl:after:left-auto rtl:after:right-0';

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        solid
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(6,14,27,0.08)] border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={localePath('/')}
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Law Office of Omar Bachikh - Home"
          >
            <div className={cn(
              'w-9 h-9 rounded-lg overflow-hidden shrink-0 transition-all duration-300',
              solid ? 'ring-1 ring-gray-200' : 'ring-1 ring-white/20'
            )}>
              <Image src="/images/logo.jpg" alt="Law Office of Omar Bachikh" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <span className={cn(
              'font-serif text-base font-bold leading-none tracking-tight transition-colors duration-300',
              solid ? 'text-navy-900' : 'text-white'
            )}>
              Omar Bachikh
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8" dir={isRtl ? 'rtl' : 'ltr'}>
            <Link
              href={localePath('/about')}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                underline,
                solid ? 'text-gray-700 hover:text-navy-900' : 'text-gray-200 hover:text-white',
                isActive('/about') && (solid ? 'text-navy-900' : 'text-white')
              )}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              {t('about')}
            </Link>

            {/* Practice Areas dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setPracticeDropdown(true)}
              onMouseLeave={() => setPracticeDropdown(false)}
            >
              <button
                className={cn(
                  'text-sm font-medium transition-colors duration-200 flex items-center gap-1',
                  solid ? 'text-gray-700 hover:text-navy-900' : 'text-gray-200 hover:text-white',
                  isActive('/practice-areas') && (solid ? 'text-navy-900' : 'text-white')
                )}
                onClick={() => setPracticeDropdown(!practiceDropdown)}
                aria-expanded={practiceDropdown}
                aria-haspopup="true"
              >
                {t('practiceAreas')}
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', practiceDropdown && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {practiceDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-3 w-72 bg-[#060E1B] rounded-2xl shadow-deep border border-white/10 overflow-hidden"
                  >
                    <div className="p-2">
                      <Link
                        href={localePath('/practice-areas')}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gold-400 hover:bg-white/5 rounded-xl mb-1 transition-colors"
                      >
                        <Scale className="w-4 h-4" />
                        {t('allPracticeAreas')}
                      </Link>
                      <div className="grid grid-cols-1 gap-0.5">
                        {PRACTICE_AREA_SLUGS.map((slug) => (
                          <Link
                            key={slug}
                            href={localePath(`/practice-areas/${slug}`)}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <span className="text-gold-500">{practiceAreaIcons[slug]}</span>
                            {tp(SLUG_TO_TITLE_KEY[slug] as Parameters<typeof tp>[0])}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={localePath(href)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  underline,
                  solid ? 'text-gray-700 hover:text-navy-900' : 'text-gray-200 hover:text-white',
                  isActive(href) && (solid ? 'text-navy-900' : 'text-white')
                )}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all',
                  solid
                    ? 'text-gray-600 hover:text-navy-900 hover:bg-gray-100'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                )}
                onClick={() => setLangDropdown(!langDropdown)}
                aria-label="Switch language"
                aria-expanded={langDropdown}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang?.short}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', langDropdown && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-3 w-44 bg-[#060E1B] rounded-2xl shadow-deep border border-white/10 overflow-hidden p-1.5"
                  >
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={cn(
                          'flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-colors',
                          locale === loc.code
                            ? 'bg-gold-500 text-navy-900 font-semibold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <span>{loc.label}</span>
                        <span className="text-xs opacity-70">{loc.short}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <Link
              href={localePath('/visa-quiz')}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-gold transition-all duration-200 hover:bg-gold-400 hover:-translate-y-0.5"
            >
              {t('freeConsultation')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className={cn(
                'lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
                solid ? 'text-navy-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('close') : t('menu')}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-16 bg-[#060E1B] z-40 overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col min-h-[calc(100vh-4rem)]">
              <nav className="flex-1 space-y-1" dir={isRtl ? 'rtl' : 'ltr'}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                  <Link href={localePath('/about')} className="block py-3 font-serif text-2xl font-bold text-white hover:text-gold-400 transition-colors">
                    {t('about')}
                  </Link>
                </motion.div>

                {/* Mobile practice areas */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <button
                    className="flex items-center justify-between w-full py-3 font-serif text-2xl font-bold text-white hover:text-gold-400 transition-colors"
                    onClick={() => setMobilePA(!mobilePA)}
                  >
                    {t('practiceAreas')}
                    <ChevronDown className={cn('w-6 h-6 transition-transform', mobilePA && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobilePA && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 py-2 space-y-1 border-l border-white/10 ml-1 rtl:pl-0 rtl:pr-2 rtl:border-l-0 rtl:border-r rtl:ml-0 rtl:mr-1">
                          <Link href={localePath('/practice-areas')} className="flex items-center gap-2 py-2 text-sm text-gold-400 font-semibold">
                            <Scale className="w-4 h-4" /> {t('allPracticeAreas')}
                          </Link>
                          {PRACTICE_AREA_SLUGS.map((slug) => (
                            <Link key={slug} href={localePath(`/practice-areas/${slug}`)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                              <span className="text-gold-500">{practiceAreaIcons[slug]}</span>
                              {tp(SLUG_TO_TITLE_KEY[slug] as Parameters<typeof tp>[0])}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.slice(1).map(({ href, label }, i) => (
                  <motion.div key={href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <Link href={localePath(href)} className="block py-3 font-serif text-2xl font-bold text-white hover:text-gold-400 transition-colors">
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language switcher */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400 mb-3">{t('language')}</p>
                <div className="flex gap-2 flex-wrap">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                        locale === loc.code
                          ? 'bg-gold-500 text-navy-900'
                          : 'bg-white/10 text-gray-200 hover:bg-white/20'
                      )}
                    >
                      {loc.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-6 space-y-3">
                <Link
                  href={localePath('/visa-quiz')}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-gold-500 px-5 py-3.5 text-base font-semibold text-navy-900 hover:bg-gold-400 transition-colors"
                >
                  {t('freeConsultation')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <a
                  href="tel:4846408347"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/20 px-5 py-3.5 text-base font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t('phone')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

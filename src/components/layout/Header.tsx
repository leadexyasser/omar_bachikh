'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Menu, X, ChevronDown, Globe, Scale, Users, Heart,
  Shield, Briefcase, Gavel,
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
  { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', short: 'AR' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
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

  const isActive = (href: string) => {
    const full = localePath(href);
    return pathname === full || pathname.startsWith(full + '/');
  };

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: '/results', label: t('results') },
    { href: '/testimonials', label: t('testimonials') },
    { href: '/fees', label: t('fees') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-900 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <span className="text-gold-400 font-medium">
            AILA Member · LL.M. Widener · 15+ Years Experience · NY Bar
          </span>
          <a
            href={`tel:4846408347`}
            className="flex items-center gap-1.5 text-white hover:text-gold-400 transition-colors font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            {t('phone')}
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white shadow-lg border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-sm shadow-sm'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            {/* Logo */}
            <Link
              href={localePath('/')}
              className="flex items-center gap-3 shrink-0 group"
              aria-label="Law Office of Omar Bachikh - Home"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-md">
                <Image src="/images/logo.jpg" alt="Law Office of Omar Bachikh" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-serif text-sm sm:text-base font-bold text-navy-900 leading-tight">
                  Omar Bachikh
                </div>
                <div className="hidden sm:block text-xs text-gray-500 font-medium tracking-wide">
                  Immigration Attorney
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1" dir={isRtl ? 'rtl' : 'ltr'}>
              <Link
                href={localePath('/about')}
                className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50', isActive('/about') && 'text-navy-900 bg-gray-50 font-semibold')}
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                {t('about')}
              </Link>

              {/* Practice Areas dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-1', isActive('/practice-areas') && 'text-navy-900 bg-gray-50 font-semibold')}
                  onMouseEnter={() => setPracticeDropdown(true)}
                  onMouseLeave={() => setPracticeDropdown(false)}
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
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      onMouseEnter={() => setPracticeDropdown(true)}
                      onMouseLeave={() => setPracticeDropdown(false)}
                    >
                      <div className="p-2">
                        <Link
                          href={localePath('/practice-areas')}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-navy-900 bg-navy-50 rounded-lg mb-1 hover:bg-navy-100 transition-colors"
                        >
                          <Scale className="w-4 h-4 text-gold-500" />
                          {t('allPracticeAreas')}
                        </Link>
                        <div className="grid grid-cols-1 gap-0.5">
                          {PRACTICE_AREA_SLUGS.map((slug) => (
                            <Link
                              key={slug}
                              href={localePath(`/practice-areas/${slug}`)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
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

              <Link href={localePath('/blog')} className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50', isActive('/blog') && 'text-navy-900 bg-gray-50 font-semibold')} aria-current={isActive('/blog') ? 'page' : undefined}>
                {t('blog')}
              </Link>
              <Link href={localePath('/results')} className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50', isActive('/results') && 'text-navy-900 bg-gray-50 font-semibold')} aria-current={isActive('/results') ? 'page' : undefined}>
                {t('results')}
              </Link>
              <Link href={localePath('/faq')} className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50', isActive('/faq') && 'text-navy-900 bg-gray-50 font-semibold')} aria-current={isActive('/faq') ? 'page' : undefined}>
                {t('faq')}
              </Link>
              <Link href={localePath('/contact')} className={cn('nav-link px-3 py-2 rounded-md hover:bg-gray-50', isActive('/contact') && 'text-navy-900 bg-gray-50 font-semibold')} aria-current={isActive('/contact') ? 'page' : undefined}>
                {t('contact')}
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <div className="relative hidden sm:block" ref={langRef}>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-all"
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      {LOCALES.map((loc) => (
                        <button
                          key={loc.code}
                          onClick={() => switchLocale(loc.code)}
                          className={cn(
                            'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                            locale === loc.code
                              ? 'bg-navy-900 text-white font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <span className="text-base">{loc.flag}</span>
                          <span>{loc.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone (mobile) */}
              <a
                href="tel:4846408347"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* CTA button */}
              <Link
                href={localePath('/visa-quiz')}
                className="hidden sm:inline-flex btn-primary text-sm"
              >
                {t('freeConsultation')}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? t('close') : t('menu')}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                <Link href={localePath('/about')} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-navy-50 hover:text-navy-900 transition-colors">
                  {t('about')}
                </Link>

                {/* Mobile practice areas */}
                <div>
                  <button
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                    onClick={() => setMobilePA(!mobilePA)}
                  >
                    {t('practiceAreas')}
                    <ChevronDown className={cn('w-4 h-4 transition-transform', mobilePA && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobilePA && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-0.5">
                          <Link href={localePath('/practice-areas')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-navy-900 font-semibold hover:bg-navy-50">
                            <Scale className="w-4 h-4 text-gold-500" /> {t('allPracticeAreas')}
                          </Link>
                          {PRACTICE_AREA_SLUGS.map((slug) => (
                            <Link key={slug} href={localePath(`/practice-areas/${slug}`)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-900 transition-colors">
                              <span className="text-gold-500">{practiceAreaIcons[slug]}</span>
                              {tp(SLUG_TO_TITLE_KEY[slug] as Parameters<typeof tp>[0])}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.slice(1).map(({ href, label }) => (
                  <Link key={href} href={localePath(href)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-navy-50 hover:text-navy-900 transition-colors">
                    {label}
                  </Link>
                ))}

                {/* Mobile language switcher */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('language')}</p>
                  <div className="flex gap-2 px-3 py-2">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                          locale === loc.code
                            ? 'bg-navy-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                      >
                        {loc.flag} {loc.short}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={localePath('/visa-quiz')} className="btn-primary w-full justify-center">
                    {t('freeConsultation')}
                  </Link>
                  <a href="tel:4846408347" className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 text-sm font-semibold text-navy-900 border-2 border-navy-900 rounded-lg hover:bg-navy-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    {t('phone')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

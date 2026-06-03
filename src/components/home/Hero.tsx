'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, ChevronDown, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  // Split the headline: all but the final word in white, final word in italic gold.
  const headline = t('headline');
  const words = headline.split(' ');
  const lastWord = words.length > 1 ? words[words.length - 1] : '';
  const leadWords = words.length > 1 ? words.slice(0, -1).join(' ') : headline;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060E1B]"
      aria-label="Hero section"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060E1B] via-[#0A1628] to-[#0E2952]" />

        {/* Gold orb */}
        <motion.div
          className="absolute top-[-10%] right-[5%] w-[32rem] h-[32rem] rounded-full bg-gold-500/10 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Navy orb */}
        <motion.div
          className="absolute bottom-[-15%] left-[-5%] w-[36rem] h-[36rem] rounded-full bg-navy-600/30 blur-[130px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Fine grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:py-28 grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* LEFT — text */}
        <div>
          {/* Overline */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-gold-400">
              Immigration Attorney · Orlando, FL
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif font-bold leading-[0.9] text-4xl sm:text-5xl lg:text-6xl xl:text-[5.5rem] tracking-tight"
          >
            <span className="block text-white">{leadWords}</span>
            {lastWord && (
              <span className="block italic gold-text">{lastWord}</span>
            )}
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-12 h-0.5 bg-gold-500 my-6 sm:my-7"
          />

          {/* Subheadline */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-md"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={localePath('/visa-quiz')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gold-500 text-navy-900 rounded-xl text-base font-bold hover:bg-gold-400 transition-all duration-200 shadow-glow-gold hover:shadow-gold-hover hover:-translate-y-1"
            >
              {t('cta1')}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
            <a
              href="tel:4846408347"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white rounded-xl text-base font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              {t('cta2')}
            </a>
          </motion.div>

          {/* Language pills */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-gold-500/70" aria-hidden="true" />
            {['EN', 'AR', 'FR', 'ES'].map((lang) => (
              <span
                key={lang}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 text-xs font-semibold tracking-wide"
              >
                {lang}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — portrait + floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-72 xl:w-80">
            {/* Portrait */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-gold-500/20 shadow-deep">
              <Image
                src="/images/attorney-philadelphia.jpg"
                alt="Omar Bachikh, Immigration Attorney"
                fill
                sizes="(min-width: 1280px) 20rem, 18rem"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060E1B]/40 via-transparent to-transparent" />
            </div>

            {/* Top-left floating stat */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-6 bg-[#0A1628]/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 shadow-deep"
            >
              <div className="font-serif text-3xl font-bold gold-text leading-none">{t('stat1Value')}</div>
              <div className="text-xs text-gray-400 mt-1.5">{t('stat1Label')}</div>
            </motion.div>

            {/* Bottom-right floating stat */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -right-6 bg-[#0A1628]/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 shadow-deep"
            >
              <div className="font-serif text-3xl font-bold gold-text leading-none">{t('stat2Value')}</div>
              <div className="text-xs text-gray-400 mt-1.5">{t('stat2Label')}</div>
            </motion.div>

            {/* Floating language badge */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-10 -translate-y-1/2 bg-gold-500 text-navy-900 rounded-xl px-3.5 py-2.5 shadow-glow-gold"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Globe className="w-3.5 h-3.5" />
                <span>EN · AR · FR · ES</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full fill-current text-white" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="hidden sm:block text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, ChevronDown, Award, Shield, Clock, Scale, Star, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient"
      aria-label="Hero section"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Large circle accent */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/5 border border-gold-500/10" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold-500/8 border border-gold-500/15" />

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Gold diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/[0.04] to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-navy-800/50 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-gold-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div>
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/15 border border-gold-500/30 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-sm font-medium">{t('badge')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            {t('headline').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="text-gold-400">
                  {' '}{word}
                </span>
              ) : (
                <span key={i}>{i === 0 ? word : ' ' + word}</span>
              )
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
          >
            {t('subheadline')}
          </motion.p>

          {/* Trust line */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm text-gold-400/80 font-medium mb-8"
          >
            {t('trustLine')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={localePath('/visa-quiz')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gold-500 text-navy-900 rounded-xl text-base font-bold hover:bg-gold-400 transition-all duration-200 shadow-gold hover:shadow-gold-hover hover:-translate-y-0.5 animate-pulse-gold"
            >
              {t('cta1')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:4846408347"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/25 text-white rounded-xl text-base font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              {t('cta2')}
            </a>
          </motion.div>
        </div>

        {/* Right — attorney photo + stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-sm mx-auto">
            {/* Attorney photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/images/attorney-hero.jpg"
                alt="Omar Bachikh, Immigration Attorney"
                width={480}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Gradient overlay at bottom for stats */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/90 to-transparent" />

              {/* Stats overlay at bottom of photo */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: t('stat1Value'), label: t('stat1Label'), Icon: Scale },
                    { value: t('stat2Value'), label: t('stat2Label'), Icon: Award },
                    { value: t('stat3Value'), label: t('stat3Label'), Icon: Star },
                    { value: t('stat4Value'), label: t('stat4Label'), Icon: Globe },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                      className="text-center"
                    >
                      <div className="font-serif text-2xl font-bold text-gold-400">{stat.value}</div>
                      <div className="text-xs text-gray-300 mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust badges below photo */}
            <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2">
              {[
                { icon: Shield, text: 'AILA Member Attorney' },
                { icon: Award, text: 'Client Champion Award 2021' },
                { icon: Clock, text: 'Consultation · Fee Applies' },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <div className="w-7 h-7 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Floating language badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-gold-500 text-navy-900 rounded-2xl px-4 py-3 shadow-gold font-bold text-sm"
            >
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>EN · AR · FR</span>
              </div>
              <div className="text-xs font-normal mt-0.5 opacity-80">Multilingual Service</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      </motion.div>

    </section>
  );
}

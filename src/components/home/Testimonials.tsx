'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const reviews = [
  {
    name: 'Fatima A.',
    initials: 'FA',
    origin: 'Morocco → Orlando, FL',
    rating: 5,
    color: 'from-blue-500 to-blue-700',
    text: 'Attorney Bachikh handled my green card case with incredible care and professionalism. He was always available to answer my questions and made a very stressful process feel manageable. I am now a permanent resident thanks to him!',
  },
  {
    name: 'Carlos M.',
    initials: 'CM',
    origin: 'Mexico → Central Florida',
    rating: 5,
    color: 'from-green-500 to-green-700',
    text: 'I was facing deportation and felt hopeless. Omar fought hard for my case and we won! He is not just a lawyer, he truly cares about his clients. I highly recommend him to anyone dealing with immigration issues.',
  },
  {
    name: 'Aisha B.',
    initials: 'AB',
    origin: 'Egypt → Florida',
    rating: 5,
    color: 'from-purple-500 to-purple-700',
    text: 'From the initial consultation to the approval notice, the process was smooth and transparent. Mr. Bachikh guided us through every step of my husband\'s naturalization. We are forever grateful!',
  },
  {
    name: 'Jean-Pierre L.',
    initials: 'JL',
    origin: 'Cameroon → Orlando, FL',
    rating: 5,
    color: 'from-orange-500 to-orange-700',
    text: 'I needed help with my asylum case. Omar was knowledgeable, compassionate, and strategic. He prepared me thoroughly for my interview. I was granted asylum and finally feel safe. Thank you from the bottom of my heart.',
  },
  {
    name: 'Yusuf H.',
    initials: 'YH',
    origin: 'Somalia → Florida',
    rating: 5,
    color: 'from-teal-500 to-teal-700',
    text: 'Excellent service! The office communicated in Arabic which made everything so much easier for me. My case was handled professionally and I received my green card without any issues.',
  },
  {
    name: 'Maria G.',
    initials: 'MG',
    origin: 'Colombia → Orlando, FL',
    rating: 5,
    color: 'from-rose-500 to-rose-700',
    text: 'Hablamos en español durante todo el proceso, lo que fue un alivio enorme. El abogado Bachikh es muy profesional y dedicado. Gracias a él, toda mi familia tiene ahora residencia permanente.',
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = reviews.length;

  const goTo = useCallback((index: number, dir?: number) => {
    setDirection(dir ?? (index > current ? 1 : -1));
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    const n = (current + 1) % total;
    setDirection(1);
    setCurrent(n);
  }, [current, total]);

  const prev = useCallback(() => {
    const n = (current - 1 + total) % total;
    setDirection(-1);
    setCurrent(n);
  }, [current, total]);

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const review = reviews[current];

  return (
    <section
      className="bg-white py-20 overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4285F4]/10 rounded-full text-[#4285F4] text-sm font-semibold mb-4 border border-[#4285F4]/20">
            <GoogleLogo />
            <span>Google Reviews</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
          </div>
          <h2 id="testimonials-heading" className="section-title mb-4">
            {t('title')}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main slider */}
        <div className="relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Large featured card */}
            <div className="lg:col-span-7 relative">
              <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 320 }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-gray-100"
                  >
                    {/* Top row: avatar + name + Google badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0`}>
                          {review.initials}
                        </div>
                        <div>
                          <p className="font-bold text-navy-900 text-base">{review.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{review.origin}</p>
                          <div className="flex gap-0.5 mt-1.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 shrink-0">
                        <GoogleLogo />
                        <span className="text-xs text-gray-500 font-medium">Google</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <span className="absolute -top-2 -left-1 text-5xl text-gray-100 font-serif leading-none select-none" aria-hidden="true">&ldquo;</span>
                      <blockquote className="font-serif text-lg sm:text-xl text-navy-900 leading-relaxed pl-6">
                        {review.text}
                      </blockquote>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls below the card */}
              <div className="flex items-center justify-between mt-6 px-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-200"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Progress dots */}
                  <div className="flex gap-1.5 items-center">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to review ${i + 1}`}
                        className="group py-4 px-0.5 flex items-center"
                      >
                        <motion.span
                          animate={{
                            width: i === current ? 28 : 8,
                            backgroundColor: i === current ? '#0A2240' : '#D1D5DB',
                          }}
                          transition={{ duration: 0.3 }}
                          className="block h-2 rounded-full"
                          style={{ width: i === current ? 28 : 8 }}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-200"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Counter */}
                <span className="text-sm text-gray-400 font-medium tabular-nums">
                  {current + 1} / {total}
                </span>
              </div>
            </div>

            {/* Right panel — stacked mini cards */}
            <div className="lg:col-span-5 hidden lg:flex flex-col gap-3">
              {reviews.map((r, i) => {
                const isActive = i === current;
                const isPrev = i === (current - 1 + total) % total;
                const isNext = i === (current + 1) % total;
                const isVisible = isActive || isPrev || isNext || i === (current + 2) % total;

                return (
                  <motion.button
                    key={i}
                    onClick={() => goTo(i)}
                    animate={{
                      opacity: isVisible ? 1 : 0.35,
                      scale: isActive ? 1 : 0.97,
                    }}
                    transition={{ duration: 0.25 }}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 w-full ${
                      isActive
                        ? 'border-navy-900 bg-navy-900 text-white shadow-lg'
                        : 'border-gray-100 bg-white hover:border-navy-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                        {r.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-navy-900'}`}>{r.name}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-2.5 h-2.5 fill-current ${isActive ? 'text-gold-400' : 'text-[#FBBC05]'}`} />
                          ))}
                        </div>
                      </div>
                      <GoogleLogo />
                    </div>
                    <p className={`text-xs leading-relaxed line-clamp-2 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </motion.button>
                );
              })}

              <Link
                href={localePath('/testimonials')}
                className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-200 text-sm font-semibold text-gray-400 hover:border-navy-900 hover:text-navy-900 transition-all duration-200 mt-1"
              >
                {t('viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Google rating summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <GoogleLogo />
            <span className="font-bold text-gray-700 text-sm">Google Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold text-navy-900">5.0</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Based on verified Google reviews
          </div>
          <a
            href="https://share.google/BtkcZpdOMnuGnJMyx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#4285F4] hover:bg-[#4285F4]/5 transition-colors"
          >
            <GoogleLogo />
            Read on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}

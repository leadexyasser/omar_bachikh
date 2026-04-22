'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowRight } from 'lucide-react';

const testimonialKeys = ['t1', 't2', 't3', 't4', 't5'] as const;

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;
  const [current, setCurrent] = useState(0);
  const total = testimonialKeys.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const colors = [
    'from-blue-600 to-navy-900',
    'from-green-600 to-teal-900',
    'from-purple-600 to-navy-900',
    'from-orange-500 to-red-900',
    'from-gold-500 to-navy-900',
  ];

  return (
    <section className="bg-cream-100 py-20" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-navy-900/10 rounded-full text-navy-900 text-sm font-medium mb-4">
            <Star className="w-4 h-4 text-gold-500" />
            Client Success Stories
          </div>
          <h2 id="testimonials-heading" className="section-title mb-4">
            {t('title')}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured testimonial (large) */}
          <div className="lg:col-span-3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl p-8 shadow-card-hover border border-gray-100 h-full"
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-gold-400" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="font-serif text-xl text-navy-900 leading-relaxed mb-8">
                  &ldquo;{t(`${testimonialKeys[current]}.text` as Parameters<typeof t>[0])}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[current]} flex items-center justify-center text-white font-bold text-lg`}>
                    {(t(`${testimonialKeys[current]}.name` as Parameters<typeof t>[0]) as string)[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">
                      {t(`${testimonialKeys[current]}.name` as Parameters<typeof t>[0])}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t(`${testimonialKeys[current]}.origin` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-navy-900 hover:bg-navy-900 hover:text-white text-gray-600 transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1 items-center">
                {testimonialKeys.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === current ? 'true' : undefined}
                    className="py-5 px-1 cursor-pointer flex items-center"
                  >
                    <span className={`block rounded-full transition-all duration-200 ${i === current ? 'w-8 h-2 bg-navy-900' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`} />
                  </button>
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-navy-900 hover:bg-navy-900 hover:text-white text-gray-600 transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Side testimonials */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {testimonialKeys.map((key, i) => (
              <motion.button
                key={key}
                onClick={() => setCurrent(i)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                  i === current
                    ? 'border-navy-900 bg-navy-900 text-white shadow-lg'
                    : 'border-gray-100 bg-white hover:border-navy-200 hover:shadow-card'
                }`}
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3 h-3 fill-current ${i === current ? 'text-gold-400' : 'text-gold-500'}`} />
                  ))}
                </div>
                <p className={`text-xs leading-relaxed line-clamp-2 mb-2 ${i === current ? 'text-gray-200' : 'text-gray-600'}`}>
                  &ldquo;{t(`${key}.text` as Parameters<typeof t>[0])}&rdquo;
                </p>
                <p className={`text-xs font-semibold ${i === current ? 'text-gold-400' : 'text-navy-900'}`}>
                  {t(`${key}.name` as Parameters<typeof t>[0])}
                </p>
              </motion.button>
            ))}

            <Link
              href={localePath('/testimonials')}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 hover:border-navy-900 hover:text-navy-900 transition-all duration-200 mt-1"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

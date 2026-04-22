'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Scale, Award, Star, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

function CountUp({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats: { value: number; suffix: string; labelKey: 'cases' | 'years' | 'satisfaction' | 'languages'; Icon: LucideIcon; color: string }[] = [
  { value: 500, suffix: '+', labelKey: 'cases', Icon: Scale, color: 'from-navy-900 to-navy-800' },
  { value: 14, suffix: '+', labelKey: 'years', Icon: Award, color: 'from-gold-600 to-gold-500' },
  { value: 98, suffix: '%', labelKey: 'satisfaction', Icon: Star, color: 'from-navy-900 to-navy-800' },
  { value: 3, suffix: '', labelKey: 'languages', Icon: Globe, color: 'from-gold-600 to-gold-500' },
];

export default function StatsCounter() {
  const t = useTranslations('stats');

  return (
    <section className="relative -mt-1 bg-white py-16 overflow-hidden" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-3">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center border border-gray-100">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <stat.Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`font-serif text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm sm:text-base text-gray-500 font-medium leading-tight">
                  {t(stat.labelKey)}
                </p>
              </div>
              {/* Decorative gradient border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

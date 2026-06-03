'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Scale, Award, Globe, MapPin } from 'lucide-react';
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats: { value: number; suffix: string; labelKey: 'cases' | 'years' | 'satisfaction' | 'languages'; Icon: LucideIcon }[] = [
  { value: 1000, suffix: '+', labelKey: 'cases', Icon: Scale },
  { value: 15, suffix: '+', labelKey: 'years', Icon: Award },
  { value: 50, suffix: '', labelKey: 'satisfaction', Icon: MapPin },
  { value: 4, suffix: '', labelKey: 'languages', Icon: Globe },
];

export default function StatsCounter() {
  const t = useTranslations('stats');

  return (
    <section className="bg-white py-24" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <div className="overline-label justify-center mb-5">
            <span className="w-8 h-px bg-gold-500" />
            By The Numbers
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed mt-4">{t('subtitle')}</p>
        </motion.div>

        {/* Grid separated by 1px lines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-10 flex flex-col items-center text-center"
            >
              <stat.Icon className="w-6 h-6 text-gold-500 mb-4" aria-hidden="true" />
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold gold-text leading-none">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-sm font-medium mt-3 max-w-[120px] leading-tight">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

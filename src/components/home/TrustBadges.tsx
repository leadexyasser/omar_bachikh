'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Scale, Shield, MessageCircle, Globe } from 'lucide-react';

const badges = [
  { key: 'aila', icon: Scale, bg: 'bg-navy-50', iconColor: 'text-navy-600' },
  { key: 'llm', icon: GraduationCap, bg: 'bg-gold-50', iconColor: 'text-gold-600' },
  { key: 'champion', icon: Award, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { key: 'florida', icon: Shield, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { key: 'arabic', icon: MessageCircle, bg: 'bg-green-50', iconColor: 'text-green-600' },
  { key: 'french', icon: Globe, bg: 'bg-purple-50', iconColor: 'text-purple-600' },
];

export default function TrustBadges() {
  const t = useTranslations('trustBadges');

  return (
    <section className="bg-navy-950 py-16" aria-label="Trust badges and credentials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-xl font-semibold text-gray-300">{t('title')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map(({ key, icon: Icon, bg, iconColor }, i) => {
            const titleKey = key as Parameters<typeof t>[0];
            const descKey = `${key}Desc` as Parameters<typeof t>[0];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <p className="text-white text-sm font-semibold mb-0.5">{t(titleKey)}</p>
                <p className="text-gray-400 text-xs leading-tight">{t(descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

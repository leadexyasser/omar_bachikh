'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Globe, MessageSquare, Target, Heart, Scale, GraduationCap, MapPin, Shield } from 'lucide-react';

const items = [
  { key: 'item1', icon: Clock },
  { key: 'item2', icon: User },
  { key: 'item3', icon: Globe },
  { key: 'item4', icon: MessageSquare },
  { key: 'item5', icon: Target },
  { key: 'item6', icon: Heart },
];

const credentials = [
  { Icon: Scale, text: 'AILA Member Attorney' },
  { Icon: GraduationCap, text: 'LL.M. — Widener University School of Law' },
  { Icon: Shield, text: 'Admitted to the New York Bar' },
  { Icon: Globe, text: 'English · Arabic · French · Spanish' },
  { Icon: MapPin, text: 'All 50 States & U.S. Consulates' },
];

export default function WhyChooseUs() {
  const t = useTranslations('whyUs');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-navy-950 py-24 overflow-hidden" aria-labelledby="why-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — content + features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overline-label mb-5">
                <span className="w-8 h-px bg-gold-500" />
                Why Choose Us
              </div>
              <h2 id="why-us-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[0.95]">
                {t('title')}
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 my-7" />
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-md mb-10">
                {t('subtitle')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {items.map(({ key, icon: Icon }, i) => {
                const titleKey = `${key}Title` as Parameters<typeof t>[0];
                const descKey = `${key}Desc` as Parameters<typeof t>[0];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1.5">{t(titleKey)}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — attorney card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative bg-navy-900 rounded-3xl p-8 sm:p-10 border border-white/5 shadow-deep overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

              <div className="relative">
                <div className="font-serif text-5xl font-bold gold-text leading-none">15+</div>
                <p className="text-gray-300 text-base mt-3 mb-8">Years of dedicated immigration practice</p>

                <div className="space-y-3">
                  {credentials.map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 bg-white/[0.04] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-200">
                      <Icon className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={localePath('/about')}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group"
                >
                  Meet Attorney Bachikh
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Floating testimonial snippet */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-[#060E1B] rounded-2xl shadow-deep p-4 max-w-[230px] border border-white/10"
            >
              <div className="flex gap-0.5 mb-2" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold-500 text-sm">★</span>
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                &ldquo;Best immigration attorney in Orlando. Got my green card approved!&rdquo;
              </p>
              <p className="text-xs text-gray-500 mt-1.5 font-medium">— Google Review</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

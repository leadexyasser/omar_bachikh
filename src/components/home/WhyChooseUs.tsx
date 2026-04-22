'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Globe, MessageSquare, Target, Heart, Scale, GraduationCap, Award, MapPin } from 'lucide-react';

const items = [
  { key: 'item1', icon: Clock },
  { key: 'item2', icon: User },
  { key: 'item3', icon: Globe },
  { key: 'item4', icon: MessageSquare },
  { key: 'item5', icon: Target },
  { key: 'item6', icon: Heart },
];

export default function WhyChooseUs() {
  const t = useTranslations('whyUs');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-white py-20" aria-labelledby="why-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-hero-gradient rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="white"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-gold-400 mb-1">14+</div>
                <div className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">Years of dedicated immigration practice</div>

                {/* Credential tags */}
                <div className="space-y-3">
                  {[
                    { Icon: Scale, text: 'AILA Member Attorney' },
                    { Icon: GraduationCap, text: 'LLM — University of Paris VIII' },
                    { Icon: Award, text: 'Client Champion Award 2021' },
                    { Icon: Globe, text: 'English · Arabic · French' },
                    { Icon: MapPin, text: 'Orlando, Florida' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm">
                      <Icon className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={localePath('/about')}
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-gold-500 text-navy-900 rounded-xl font-semibold text-sm hover:bg-gold-400 transition-colors"
                >
                  Meet Attorney Bachikh
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Floating testimonial snippet */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:block absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-4 max-w-[220px] border border-gray-100"
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold-500 text-sm">★</span>
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                &ldquo;Best immigration attorney in Orlando. Got my green card approved!&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">— Google Review</p>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-50 rounded-full text-gold-700 text-sm font-medium mb-4 border border-gold-200">
                Why Clients Choose Us
              </div>
              <h2 id="why-us-heading" className="section-title mb-4">
                {t('title')}
              </h2>
              <p className="section-subtitle mb-10">
                {t('subtitle')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {items.map(({ key, icon: Icon }, i) => {
                const titleKey = `${key}Title` as Parameters<typeof t>[0];
                const descKey = `${key}Desc` as Parameters<typeof t>[0];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="group flex gap-4 p-4 rounded-xl hover:bg-cream-100 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold-500 group-hover:text-navy-900 transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">{t(titleKey)}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{t(descKey)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

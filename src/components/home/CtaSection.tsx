'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ClipboardList, Scale, GraduationCap, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CtaSection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-cream-100 py-24 overflow-hidden" aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* LEFT — content */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overline-label mb-6">
              <span className="w-8 h-px bg-gold-500" />
              Schedule Your Consultation
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-[0.95]"
            >
              {t('title')}
            </motion.h2>

            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-12 h-0.5 bg-gold-500 my-7" />

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={localePath('/consultation')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 rounded-xl font-bold text-base hover:bg-gold-400 transition-all hover:-translate-y-1 shadow-glow-gold hover:shadow-gold-hover"
              >
                {t('button')}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <a
                href="tel:4846408347"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-navy-900/20 text-navy-900 rounded-xl font-semibold text-base hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all"
              >
                <Phone className="w-5 h-5" />
                {t('phone')}
              </a>
            </motion.div>

            <motion.div custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6">
              <Link
                href={localePath('/visa-quiz')}
                className="inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-600 transition-colors"
              >
                <ClipboardList className="w-4 h-4" />
                {t('quiz')}
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — photo + credential badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-navy-900/10 shadow-deep">
              <Image
                src="/images/attorney-smiling.jpg"
                alt="Omar Bachikh, Immigration Attorney"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>

            {/* Floating credential card */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 rtl:-left-auto rtl:-right-6 bg-[#060E1B] rounded-2xl p-5 shadow-deep border border-white/10 max-w-[240px]"
            >
              <div className="font-serif text-3xl font-bold gold-text leading-none mb-3">15+ Years</div>
              <div className="space-y-2">
                {[
                  { Icon: Scale, text: 'AILA Member' },
                  { Icon: GraduationCap, text: 'LL.M. Widener' },
                  { Icon: Globe, text: 'EN · AR · FR · ES' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-300">
                    <Icon className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

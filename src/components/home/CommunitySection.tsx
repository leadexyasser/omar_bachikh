'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Award } from 'lucide-react';

const advocacyPhotos = [
  { src: '/images/community-uscis-officers.jpg', caption: 'USCIS Orlando Officers', w: 580, h: 434 },
  { src: '/images/community-uscis-director.jpg', caption: 'USCIS Orlando Field Office Director', w: 580, h: 326 },
  { src: '/images/community-rep-evans.jpg', caption: 'Rep. Dwight Evans (D-PA)', w: 580, h: 638 },
  { src: '/images/community-mayor-kenney.jpg', caption: 'Mayor Jim Kenney', w: 580, h: 638 },
  { src: '/images/community-sen-blumenthal.jpg', caption: 'Sen. Richard Blumenthal (D-CT)', w: 580, h: 638 },
  { src: '/images/community-rep-houlahan.jpg', caption: 'Rep. Chrissy Houlahan (D-PA)', w: 580, h: 638 },
  { src: '/images/community-sen-cortez-masto.jpg', caption: 'Sen. Catherine Cortez Masto (D-NV)', w: 580, h: 637 },
  { src: '/images/community-aila-hill.jpg', caption: 'AILA Day on the Hill', w: 580, h: 386 },
];

const successPhotos = [
  { src: '/images/community-client-success.jpg', caption: 'Client Success Story', w: 580, h: 637 },
  { src: '/images/community-consultation.jpg', caption: 'Client Consultation', w: 580, h: 637 },
  { src: '/images/community-case-won.jpg', caption: 'Case Won', w: 580, h: 637 },
  { src: '/images/results-approvals.jpg', caption: 'Approvals — VAWA, AOS, Work Permits, Naturalizations', w: 580, h: 670 },
];

export default function CommunitySection() {
  const t = useTranslations('community');

  return (
    <section className="bg-navy-950 py-20 overflow-hidden" aria-labelledby="community-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            {t('badge')}
          </div>
          <h2 id="community-heading" className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Advocacy gallery — scrolling strip */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 uppercase tracking-wider">{t('advocacyLabel')}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {advocacyPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="relative aspect-square">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success stories */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 uppercase tracking-wider">{t('successLabel')}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {successPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="relative aspect-square">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

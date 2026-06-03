'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Users, Landmark } from 'lucide-react';

const advocacyPhotos = [
  { src: '/images/community-uscis-officers.jpg',   caption: 'USCIS Orlando Officers' },
  { src: '/images/community-uscis-director.jpg',   caption: 'USCIS Orlando Field Office Director' },
  { src: '/images/community-dhs.jpg',              caption: 'U.S. Department of Homeland Security' },
  { src: '/images/community-rep-evans.jpg',        caption: 'Rep. Dwight Evans (D-PA)' },
  { src: '/images/community-mayor-kenney.jpg',     caption: 'Mayor Jim Kenney' },
  { src: '/images/community-sen-blumenthal.jpg',   caption: 'Sen. Richard Blumenthal (D-CT)' },
  { src: '/images/community-rep-houlahan.jpg',     caption: 'Rep. Chrissy Houlahan (D-PA)' },
  { src: '/images/community-sen-cortez-masto.jpg', caption: 'Sen. Catherine Cortez Masto (D-NV)' },
  { src: '/images/community-aila-hill.jpg',        caption: 'AILA Day on the Hill' },
];

const communityPhotos = [
  { src: '/images/community-client-success.jpg',   caption: 'Client Success Story' },
  { src: '/images/community-consultation.jpg',     caption: 'Client Consultation' },
  { src: '/images/community-case-won.jpg',         caption: 'Case Won' },
  { src: '/images/results-approvals.jpg',          caption: 'VAWA, AOS, Work Permits, Naturalizations' },
  { src: '/images/community-client.jpg',           caption: 'Celebrating a Win' },
  { src: '/images/community-event.jpg',            caption: 'Community Outreach Event' },
  { src: '/images/community-team.jpg',             caption: 'The Bachikh Law Team' },
  { src: '/images/community-advocacy.jpg',         caption: 'Professional Engagement' },
];

function PhotoGrid({ photos, columns = 4 }: { photos: typeof advocacyPhotos; columns?: number }) {
  const colClass = columns === 3
    ? 'grid-cols-2 sm:grid-cols-3'
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

  return (
    <div className={`grid ${colClass} gap-3`}>
      {photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          className="relative group overflow-hidden rounded-xl"
        >
          <div className="relative aspect-square">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-2 sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300">
              <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

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

        {/* Government & Advocacy */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Landmark className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
              Government & Advocacy
            </span>
            <div className="flex-1 h-px bg-white/10 ml-2" />
          </div>
          <PhotoGrid photos={advocacyPhotos} columns={4} />
        </div>

        {/* Community & Events */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
              Community &amp; Events
            </span>
            <div className="flex-1 h-px bg-white/10 ml-2" />
          </div>
          <PhotoGrid photos={communityPhotos} columns={4} />
        </div>

      </div>
    </section>
  );
}

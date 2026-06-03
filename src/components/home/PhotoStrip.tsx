'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const photos = [
  { src: '/images/attorney-philadelphia.jpg',      alt: 'Attorney Bachikh — Philadelphia' },
  { src: '/images/attorney-office-day.jpg',        alt: 'Attorney Bachikh at work' },
  { src: '/images/attorney-hallway-lightblue.jpg', alt: 'Attorney Bachikh' },
  { src: '/images/attorney-desk-night.jpg',        alt: 'Late night preparation' },
  { src: '/images/attorney-smiling.jpg',           alt: 'Attorney Bachikh — approachable' },
  { src: '/images/attorney-reading.jpg',           alt: 'Researching case law' },
  { src: '/images/attorney-hallway-gray.jpg',      alt: 'Attorney Bachikh' },
  { src: '/images/attorney-office-lightblue.jpg',  alt: 'Attorney Bachikh in office' },
];

// Duplicate for seamless infinite scroll
const track = [...photos, ...photos];

export default function PhotoStrip() {
  return (
    <section className="bg-white py-14 overflow-hidden" aria-label="Attorney photo gallery">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em]">
            Attorney Omar M. Bachikh
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </motion.div>
      </div>

      {/* Infinite scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-3"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 'max-content' }}
        >
          {track.map((photo, i) => (
            <div
              key={i}
              className="relative h-56 sm:h-72 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top"
                sizes="200px"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-navy-900/5 hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

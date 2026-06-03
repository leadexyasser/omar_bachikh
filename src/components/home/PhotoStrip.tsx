'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const photos = [
  { src: '/images/attorney-philadelphia.jpg',      alt: 'Attorney Bachikh — Philadelphia' },
  { src: '/images/attorney-office-day.jpg',        alt: 'Attorney Bachikh at work' },
  { src: '/images/attorney-hallway-lightblue.jpg', alt: 'Attorney Bachikh' },
  { src: '/images/attorney-desk-night.jpg',        alt: 'Late night case preparation' },
  { src: '/images/attorney-smiling.jpg',           alt: 'Attorney Bachikh — approachable' },
  { src: '/images/attorney-reading.jpg',           alt: 'Researching case law' },
  { src: '/images/attorney-hallway-gray.jpg',      alt: 'Attorney Bachikh' },
  { src: '/images/attorney-office-lightblue.jpg',  alt: 'Attorney Bachikh in office' },
];

// Duplicate for seamless infinite loop
const track = [...photos, ...photos];

function VideoCard() {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shrink-0 shadow-md cursor-pointer group"
      style={{ aspectRatio: '9/16' }}
      onClick={() => {
        if (!ref.current) return;
        ref.current.paused ? ref.current.play() : ref.current.pause();
      }}
    >
      <video
        ref={ref}
        src="/videos/attorney-feature.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
      />
      <div className="absolute inset-0 bg-navy-900/25 group-hover:bg-navy-900/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-0 transition-opacity duration-200">
        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
        </div>
      </div>
    </div>
  );
}

export default function PhotoStrip() {
  return (
    <section className="bg-white py-14 overflow-hidden" aria-label="Attorney photo gallery">
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

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip — video first, then photos looping */}
        <motion.div
          className="flex gap-3 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {/* Video card appears once at the start of each loop */}
          <VideoCard />
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
              <div className="absolute inset-0 bg-navy-900/5 hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
          {/* Second video card mid-loop for seamless repeat */}
          <VideoCard />
          {track.map((photo, i) => (
            <div
              key={`b-${i}`}
              className="relative h-56 sm:h-72 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-navy-900/5 hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Play, ExternalLink, Video } from 'lucide-react';

const WIDGET_ID = process.env.NEXT_PUBLIC_BEHOLD_WIDGET_ID;
const HANDLE = 'bachikhlaw';
const INSTAGRAM_URL = `https://www.instagram.com/${HANDLE}/`;

function BeholdWidget({ widgetId }: { widgetId: string }) {
  const loadedRef = useRef(false);
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.behold.so/widget.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return <div id={`behold-widget-${widgetId}`} className="w-full" />;
}

const placeholderItems = [
  { gradient: 'from-navy-800 to-navy-900', icon: true, delay: 0 },
  { gradient: 'from-gold-700/40 to-navy-900', icon: false, delay: 0.05 },
  { gradient: 'from-navy-700 to-navy-800', icon: true, delay: 0.1 },
  { gradient: 'from-navy-900 to-gold-900/30', icon: true, delay: 0.15 },
  { gradient: 'from-gold-600/30 to-navy-900', icon: false, delay: 0.2 },
  { gradient: 'from-navy-800 to-navy-700', icon: true, delay: 0.25 },
];

function PlaceholderGrid() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8 opacity-40">
        {placeholderItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, duration: 0.4 }}
            className={`aspect-square rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
          >
            {item.icon && <Play className="w-5 h-5 text-white/30" />}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shrink-0">
            <Instagram className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">@{HANDLE}</p>
            <p className="text-gray-400 text-sm">Immigration tips, client stories & legal updates</p>
          </div>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shrink-0"
        >
          <Instagram className="w-4 h-4" />
          Follow on Instagram
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </motion.div>
    </div>
  );
}

export default function InstagramFeed() {
  return (
    <section className="bg-navy-950 py-20 overflow-hidden" aria-label="Instagram feed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 mb-3">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
                <Instagram className="w-2.5 h-2.5 text-white" />
              </div>
              Follow Our Journey
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Latest from Instagram
            </h2>
            <p className="text-gray-400 mt-2 text-base max-w-lg">
              Attorney Bachikh shares immigration tips, case insights, and community updates on Instagram.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors shrink-0"
          >
            <Instagram className="w-4 h-4" />
            @{HANDLE}
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {WIDGET_ID ? (
            <>
              <BeholdWidget widgetId={WIDGET_ID} />
              <div className="mt-6 text-center">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  See all videos on Instagram
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </>
          ) : (
            <PlaceholderGrid />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3 justify-center sm:justify-start"
        >
          {[
            { icon: Video, text: 'Immigration Law Tips' },
            { icon: Play, text: 'Client Success Stories' },
            { icon: Instagram, text: 'Community Updates' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs font-medium">
              <Icon className="w-3.5 h-3.5 text-gold-400" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

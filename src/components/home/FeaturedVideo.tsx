'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Scale } from 'lucide-react';

export default function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  return (
    <section className="bg-cream-100 py-20" aria-label="Featured video">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-50 border border-gold-200 rounded-full text-gold-700 text-sm font-medium mb-5">
              <Scale className="w-4 h-4" />
              Meet the Attorney
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-5 leading-tight">
              Hear Directly from<br />
              <span className="text-gold-600">Attorney Bachikh</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              With over 15 years of immigration law experience, Attorney Omar Bachikh walks you through what to expect when you work with his firm — in English, Arabic, French, and Spanish.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'What happens at the first consultation',
                'How he approaches complex immigration cases',
                'Why language and cultural understanding matter',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <p className="font-semibold text-navy-900 text-sm">Omar M. Bachikh, Esq., LL.M.</p>
                <p className="text-xs text-gray-500 mt-0.5">NY Bar Admitted · AILA Member · 15+ Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Right — video player */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden bg-navy-900 shadow-2xl cursor-pointer group"
              onClick={handlePlay}
              style={{ aspectRatio: '9/16', maxHeight: 600, margin: '0 auto' }}
            >
              <video
                ref={videoRef}
                src="/videos/attorney-feature.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />

              {/* Dark overlay — fades out when playing */}
              <div className={`absolute inset-0 bg-navy-950/30 transition-opacity duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

              {/* Play/pause centre button */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-xl"
                >
                  {playing
                    ? <div className="flex gap-2"><span className="w-2 h-7 bg-white rounded-full" /><span className="w-2 h-7 bg-white rounded-full" /></div>
                    : <Play className="w-8 h-8 text-white ml-1.5" fill="white" />
                  }
                </motion.div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-t from-navy-950/70 to-transparent">
                <div>
                  <p className="text-white font-semibold text-sm">Attorney Omar Bachikh</p>
                  <p className="text-gray-300 text-xs">Law Office of Omar Bachikh, LLC</p>
                </div>
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Decorative blob behind video */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

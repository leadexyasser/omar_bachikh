'use client';

const CREDENTIALS = [
  'AILA Member Attorney',
  'NY Bar Admitted',
  'LL.M. Widener University',
  '15+ Years Experience',
  'English · Arabic · French · Spanish',
  '1,000+ Cases Resolved',
  '50 States Served',
  'Serving All U.S. Consulates',
];

export default function TrustBadges() {
  // Duplicate the array for a seamless -50% loop.
  const items = [...CREDENTIALS, ...CREDENTIALS];

  return (
    <section className="relative bg-navy-900 py-5 overflow-hidden" aria-label="Credentials">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-900 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-900 to-transparent" aria-hidden="true" />

      <div className="flex w-max animate-marquee marquee-track" aria-hidden="true">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">{item}</span>
            <span className="text-gold-500 mx-6">◆</span>
          </div>
        ))}
      </div>

      {/* Static, screen-reader-only list for accessibility */}
      <ul className="sr-only">
        {CREDENTIALS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

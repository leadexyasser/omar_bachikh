'use client';

import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-8">We&apos;re sorry — please try again or return to the home page.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="px-6 py-3 border-2 border-navy-900 text-navy-900 rounded-xl font-semibold hover:bg-navy-50 transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const locales = ['en', 'ar', 'fr'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  metadataBase: new URL('https://bachikhlaw.com'),
  title: {
    default: 'Law Office of Omar Bachikh | Immigration Attorney Orlando FL',
    template: '%s | Law Office of Omar Bachikh',
  },
  description: 'Experienced immigration attorney in Orlando, Florida. AILA member with 14+ years of experience. Serving clients in English, Arabic, and French.',
  robots: { index: true, follow: true },
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const isRtl = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0A2240" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Law Office of Omar Bachikh, LLC',
              description: 'Immigration law firm in Orlando, Florida.',
              url: 'https://bachikhlaw.com',
              telephone: '(484) 640-8347',
              email: 'info@bachikhlaw.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '6000 Turkey Lake Rd. Suite 201',
                addressLocality: 'Orlando',
                addressRegion: 'FL',
                postalCode: '32819',
                addressCountry: 'US',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              knowsLanguage: ['English', 'Arabic', 'French'],
              memberOf: { '@type': 'Organization', name: 'American Immigration Lawyers Association (AILA)' },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

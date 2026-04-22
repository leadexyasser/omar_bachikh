import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Scale, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('404');
  const locale = useLocale();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-navy-900 flex items-center justify-center mx-auto mb-6">
          <Scale className="w-10 h-10 text-gold-400" />
        </div>
        <h1 className="font-serif text-6xl font-bold text-navy-900 mb-2">404</h1>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">{t('title')}</h2>
        <p className="text-gray-500 mb-8">{t('subtitle')}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors"
        >
          {t('backHome')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

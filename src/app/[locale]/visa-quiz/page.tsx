import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import VisaQuiz from '@/components/quiz/VisaQuiz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quiz' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function VisaQuizPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Visa Eligibility Quiz</h1>
          <p className="text-gray-300 text-lg">Discover your immigration options in minutes</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <VisaQuiz />
      </div>
    </div>
  );
}

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustBadges from '@/components/home/TrustBadges';
import StatsCounter from '@/components/home/StatsCounter';
import PracticeAreasFeatured from '@/components/home/PracticeAreasFeatured';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import CtaSection from '@/components/home/CtaSection';
import CommunitySection from '@/components/home/CommunitySection';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteName'),
    description: t('siteDescription'),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <StatsCounter />
      <PracticeAreasFeatured />
      <WhyChooseUs />
      <CommunitySection />
      <Testimonials />
      <BlogPreview />
      <CtaSection />
    </>
  );
}

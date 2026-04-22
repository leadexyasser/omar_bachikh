import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Download, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';

const glossaryTerms = [
  { term: 'Adjustment of Status', def: 'The process of applying for a green card while inside the United States.' },
  { term: 'Asylum', def: 'Protection granted to eligible individuals who have been persecuted or fear persecution in their home country.' },
  { term: 'BIA', def: 'Board of Immigration Appeals — the highest administrative tribunal for interpreting and applying immigration laws.' },
  { term: 'Consular Processing', def: 'Obtaining an immigrant visa at a U.S. Embassy or Consulate abroad.' },
  { term: 'DACA', def: 'Deferred Action for Childhood Arrivals — a program protecting certain childhood arrivals from deportation.' },
  { term: 'EAD', def: 'Employment Authorization Document — a work permit issued by USCIS.' },
  { term: 'Green Card', def: 'Permanent resident card allowing the holder to live and work permanently in the United States.' },
  { term: 'I-130', def: 'Petition for Alien Relative — the first step in family-based immigration petitions.' },
  { term: 'I-485', def: 'Application to Register Permanent Residence (Adjustment of Status).' },
  { term: 'NTA', def: 'Notice to Appear — a document initiating removal proceedings in immigration court.' },
  { term: 'USCIS', def: 'U.S. Citizenship and Immigration Services — the government agency overseeing immigration benefits.' },
  { term: 'Visa Bulletin', def: 'Monthly publication by the State Department showing which immigrant visa numbers are available.' },
];

export default function ResourcesPage() {
  const t = useTranslations('resources');
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  const guides = [
    { key: '1', titleKey: 'guide1Title' as const, descKey: 'guide1Desc' as const },
    { key: '2', titleKey: 'guide2Title' as const, descKey: 'guide2Desc' as const },
    { key: '3', titleKey: 'guide3Title' as const, descKey: 'guide3Desc' as const },
    { key: '4', titleKey: 'guide4Title' as const, descKey: 'guide4Desc' as const },
  ];

  const links = [
    { key: '1', titleKey: 'link1' as const, href: 'https://www.uscis.gov' },
    { key: '2', titleKey: 'link2' as const, href: 'https://travel.state.gov' },
    { key: '3', titleKey: 'link3' as const, href: 'https://www.justice.gov/eoir' },
    { key: '4', titleKey: 'link4' as const, href: 'https://www.ice.gov' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Guides */}
          <div>
            <h2 className="section-title mb-10">{t('guidesTitle')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {guides.map(({ key, titleKey, descKey }) => (
                <div key={key} className="bg-cream-100 rounded-2xl p-6 border border-gray-100 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2 flex-1">{t(titleKey)}</h3>
                  <p className="text-xs text-gray-500 mb-4">{t(descKey)}</p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors">
                    <Download className="w-4 h-4" />
                    {t('download')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Glossary */}
          <div>
            <h2 className="section-title mb-10">{t('glossaryTitle')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {glossaryTerms.map(({ term, def }) => (
                <div key={term} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <p className="font-bold text-navy-900 text-sm mb-1">{term}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Official links */}
          <div>
            <h2 className="section-title mb-8">{t('linksTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {links.map(({ key, titleKey, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-cream-100 hover:bg-navy-50 rounded-xl p-4 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
                    <ExternalLink className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="font-medium text-sm text-gray-700 group-hover:text-navy-900 transition-colors flex-1">{t(titleKey)}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-navy-900 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* FAQ link */}
          <div className="bg-hero-gradient rounded-3xl p-8 text-white text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Have More Questions?</h2>
            <p className="text-gray-300 mb-6">{t('faqLink')}</p>
            <Link href={localePath('/faq')} className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-xl font-bold hover:bg-gold-400 transition-colors">
              View FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

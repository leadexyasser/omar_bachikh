import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="bg-white">
      <section className="bg-hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">{t('pageTitle')}</h1>
          <p className="text-gray-300 text-sm">{t('lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600 max-w-none">
          <h2>1. Attorney Advertising</h2>
          <p>This website constitutes attorney advertising. The information provided on this website is for general informational purposes only and should not be construed as legal advice on any subject matter.</p>

          <h2>2. No Attorney-Client Relationship</h2>
          <p>Viewing this website, completing a contact form, or sending an email does not create an attorney-client relationship. An attorney-client relationship is only formed when a written fee agreement is signed by both parties.</p>

          <h2>3. No Guarantee of Results</h2>
          <p>Every immigration case is unique. Past results described on this website do not guarantee or predict a similar result in any future case. Results depend on the specific facts and circumstances of each case.</p>

          <h2>4. Accuracy of Information</h2>
          <p>Immigration law is complex and constantly evolving. While we strive to keep the information on this website current and accurate, we make no representations or warranties as to the accuracy, completeness, or suitability of any information.</p>

          <h2>5. Limitation of Liability</h2>
          <p>The Law Office of Omar Bachikh, LLC shall not be liable for any damages arising from your use of this website or reliance on information contained herein.</p>

          <h2>6. Third-Party Links</h2>
          <p>This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>

          <h2>7. Jurisdiction</h2>
          <p>These terms are governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Orange County, Florida.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.</p>

          <h2>9. Contact</h2>
          <p>For questions about these terms:<br />
          Law Office of Omar Bachikh, LLC<br />
          6000 Turkey Lake Rd. Suite 201, Orlando, FL 32819<br />
          info@bachikhlaw.com | (484) 640-8347</p>
        </div>
      </section>
    </div>
  );
}

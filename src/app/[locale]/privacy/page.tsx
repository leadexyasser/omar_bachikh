import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

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
          <h2>1. Information We Collect</h2>
          <p>When you use our website or contact our office, we may collect personal information including your name, email address, phone number, and details about your immigration situation. This information is collected only when voluntarily provided by you.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Information you provide is used solely to:</p>
          <ul>
            <li>Respond to your inquiries and provide legal services</li>
            <li>Schedule and conduct consultations</li>
            <li>Send relevant immigration updates (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2>3. Attorney-Client Privilege</h2>
          <p>All communications between you and our office are protected by attorney-client privilege to the fullest extent permitted by law. We maintain strict confidentiality of all client information.</p>

          <h2>4. Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties. Information may be shared only with your explicit consent, as required by law, or as necessary to provide legal services on your behalf.</p>

          <h2>5. Cookies</h2>
          <p>Our website uses cookies to improve your browsing experience and analyze website traffic. You may decline cookies through your browser settings, though some site features may be affected.</p>

          <h2>6. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact our office at info@bachikhlaw.com.</p>

          <h2>8. Contact Us</h2>
          <p>For questions about this privacy policy, please contact:<br />
          Law Office of Omar Bachikh, LLC<br />
          6000 Turkey Lake Rd. Suite 201, Orlando, FL 32819<br />
          info@bachikhlaw.com | (484) 640-8347</p>
        </div>
      </section>
    </div>
  );
}

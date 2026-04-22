'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle, Clock, Lock, Globe, Send, AlertTriangle } from 'lucide-react';

export default function ConsultationPage() {
  const t = useTranslations('consultation');
  const locale = useLocale();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '',
    status: '', service: '', message: '', language: locale,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-8">{t('formTitle')}</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">{t('successTitle')}</h3>
                    <p className="text-gray-500">{t('successMsg')}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('name')} *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('email')} *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('phone')}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('country')}</label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                          placeholder="Country of origin"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('service')} *</label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select a service...</option>
                        <option value="family">Family-Based Immigration</option>
                        <option value="marriage">Marriage Green Card</option>
                        <option value="citizenship">Citizenship / Naturalization</option>
                        <option value="asylum">Asylum / Refugee</option>
                        <option value="work">Work Visas</option>
                        <option value="student">Student Visas</option>
                        <option value="deportation">Deportation Defense</option>
                        <option value="daca">DACA</option>
                        <option value="appeals">Appeals / Waivers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('language')}</label>
                      <select
                        value={form.language}
                        onChange={(e) => setForm({ ...form, language: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm bg-white"
                      >
                        <option value="en">English</option>
                        <option value="ar">العربية (Arabic)</option>
                        <option value="fr">Français (French)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('message')}</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm resize-none"
                        placeholder="Briefly describe your situation..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-navy-900 text-white rounded-xl font-bold text-base hover:bg-navy-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          {t('submitting')}
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t('submit')}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* What to expect */}
              <div className="bg-cream-100 rounded-2xl p-6">
                <h3 className="font-semibold text-navy-900 mb-5">{t('infoTitle')}</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Clock, text: t('info1') },
                    { icon: Lock, text: t('info2') },
                    { icon: Globe, text: t('info3') },
                    { icon: CheckCircle, text: t('info4') },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Urgent help */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-600 font-semibold mb-3">
                  <AlertTriangle className="w-5 h-5" />
                  {t('urgentTitle')}
                </div>
                <p className="text-sm text-gray-600 mb-4">{t('urgentText')}</p>
                <a
                  href="tel:4846408347"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t('urgentCall')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

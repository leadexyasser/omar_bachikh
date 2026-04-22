'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, CheckCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
      <section className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg text-gray-300">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      title: t('address'),
                      content: t('addressValue'),
                      href: 'https://maps.google.com/?q=6000+Turkey+Lake+Rd+Suite+201+Orlando+FL+32819',
                    },
                    { icon: Phone, title: t('phone'), content: t('phoneValue'), href: 'tel:4846408347' },
                    { icon: Mail, title: t('email'), content: t('emailValue'), href: 'mailto:info@bachikhlaw.com' },
                  ].map(({ icon: Icon, title, content, href }) => (
                    <a
                      key={title}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                        <Icon className="w-5 h-5 text-gold-400 group-hover:text-navy-900 transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{title}</p>
                        <p className="text-gray-900 font-medium group-hover:text-navy-900 transition-colors">{content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-cream-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 font-semibold text-navy-900 mb-4">
                  <Clock className="w-5 h-5 text-gold-500" />
                  {t('hours')}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{t('monFri')}</p>
                  <p>{t('sat')}</p>
                  <p className="text-gray-400">Sunday: Closed</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="font-semibold text-navy-900 mb-3">{t('social')}</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://www.facebook.com/omarimmigration/', icon: Facebook, label: 'Facebook' },
                    { href: 'https://www.instagram.com/bachikhlaw/', icon: Instagram, label: 'Instagram' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-xl text-sm hover:bg-navy-800 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">{t('formTitle')}</h2>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('emailLabel')} *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('subject')}</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('message')} *</label>
                      <textarea
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100 outline-none transition-all text-sm resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-navy-900 text-white rounded-xl font-bold text-base hover:bg-navy-800 transition-colors disabled:opacity-70 shadow-md"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t('send')}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

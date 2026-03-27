'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main>
        <section className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">Have a question or feedback? We&apos;d love to hear from you.</p>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: '📧', label: 'Email', value: 'support@marketplace.com' },
                  { icon: '📞', label: 'Phone', value: '+1 (555) 000-0000' },
                  { icon: '📍', label: 'Address', value: '123 Market St, San Francisco, CA' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9am–6pm PST' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-all shadow-md">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-5xl mb-6">📬</div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Stay in the Loop</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Get the latest deals, new arrivals, and marketplace news delivered to your inbox.</p>
        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl font-medium">
            🎉 Thanks for subscribing! You&apos;ll hear from us soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" required
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md whitespace-nowrap">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

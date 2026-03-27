'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Swal from 'sweetalert2';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse products on the Explore page, add items to your cart, and proceed to checkout from your dashboard.',
  },
  {
    question: 'How can I track my order status?',
    answer: 'Visit your dashboard and click on Orders to check order status, shipping updates, and tracking details.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, PayPal, and other popular payment gateways depending on your location.',
  },
  {
    question: 'How do I request a return or refund?',
    answer: 'Go to your dashboard Orders section, select the order and request a return. Our support team will guide you further.',
  },
];

const categories = [
  { title: 'Electronics', description: 'Top gadgets, accessories and smart home gear.' },
  { title: 'Fashion', description: 'Clothing, shoes and accessories for every style.' },
  { title: 'Home & Living', description: 'Furniture, decor and kitchen essentials.' },
  { title: 'Fitness & Outdoors', description: 'Gear for workouts, adventure and wellness.' },
];

export default function HelpCenterPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = document.cookie.includes('isLoggedIn=true');
    if (!loggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Login required',
        text: 'Please login to access the Help Center.',
        timer: 1400,
        showConfirmButton: false,
      }).then(() => router.push('/login'));
    }
  }, [router]);

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    if (!name || !email || !message) {
      await Swal.fire({ icon: 'warning', title: 'Incomplete form', text: 'Please fill all fields.' });
      return;
    }

    await Swal.fire({ icon: 'success', title: 'Message sent', text: 'Our support team will be in touch soon.' });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />

      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Help Center</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Need help? Get quick answers to common questions, guidance on orders, and support for your account.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900">
                  <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Browse by category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div key={category.title} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Support</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Have a specific issue? Send us a message and we will respond within 24 hours.
            </p>
            <form onSubmit={handleContact} className="space-y-3">
              <input id="name" name="name" required placeholder="Your name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              <input id="email" name="email" type="email" required placeholder="Your email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              <textarea id="message" name="message" rows={5} required placeholder="Describe your issue" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">Send Message</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

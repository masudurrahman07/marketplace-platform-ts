import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  { icon: '🛡️', title: 'Verified Sellers', desc: 'Every seller goes through a verification process to ensure quality and trust.' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'We partner with reliable logistics to get your orders delivered quickly.' },
  { icon: '💳', title: 'Secure Payments', desc: 'All transactions are encrypted and protected by industry-standard security.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Shop from sellers around the world with localized support.' },
  { icon: '⭐', title: 'Quality Products', desc: 'Curated listings ensure only the best products make it to our platform.' },
  { icon: '🤝', title: 'Community First', desc: 'We build tools that empower both buyers and sellers to thrive.' },
];

const team = [
  { name: 'Alex Johnson', role: 'CEO & Co-founder', avatar: 'AJ' },
  { name: 'Sarah Chen', role: 'CTO', avatar: 'SC' },
  { name: 'Marcus Williams', role: 'Head of Design', avatar: 'MW' },
  { name: 'Priya Patel', role: 'Head of Operations', avatar: 'PP' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main>
      
        <section className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">About MarketPlace</h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              We&apos;re building the most trusted marketplace where buyers and sellers connect seamlessly.
              Founded in 2024, our mission is to make commerce simple, safe, and accessible for everyone.
            </p>
          </div>
        </section>

    
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['10K+', 'Products'], ['5K+', 'Sellers'], ['50K+', 'Buyers'], ['99%', 'Satisfaction']].map(([val, label]) => (
              <div key={label}>
                <div className="text-4xl font-bold text-blue-600">{val}</div>
                <div className="text-gray-500 dark:text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="py-20 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 tracking-tight">Why We&apos;re Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f) => (
                <div key={f.title} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-20 bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">Meet the Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {team.map((m) => (
                <div key={m.name} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg mb-3">
                    {m.avatar}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{m.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

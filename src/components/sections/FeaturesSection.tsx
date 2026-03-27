const features = [
  { icon: '🔒', title: 'Secure Payments', desc: 'Industry-leading encryption protects every transaction.' },
  { icon: '✅', title: 'Verified Sellers', desc: 'All sellers are thoroughly vetted before listing.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Quick shipping from sellers worldwide.' },
  { icon: '🌟', title: 'Quality Guarantee', desc: 'Every product meets our strict quality standards.' },
  { icon: '💬', title: '24/7 Support', desc: 'Our team is always here to help you.' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns within 30 days.' },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need for a seamless shopping experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-transparent dark:border-gray-700">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

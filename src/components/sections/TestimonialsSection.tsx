const testimonials = [
  { name: 'Sarah Johnson', role: 'Regular Buyer', text: 'MarketPlace has completely changed how I shop online. The quality of products and sellers is outstanding!', avatar: '👩' },
  { name: 'Michael Chen', role: 'Tech Enthusiast', text: 'Found the best deals on electronics here. Fast shipping and exactly as described. Highly recommend!', avatar: '👨' },
  { name: 'Emma Williams', role: 'Home Decorator', text: 'The home & furniture section is incredible. Got my entire living room furnished through MarketPlace.', avatar: '👩‍🦰' },
  { name: 'James Rodriguez', role: 'Fitness Trainer', text: 'Best place for fitness equipment. Great prices and the sellers are very responsive and helpful.', avatar: '🧑' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Real reviews from real people.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{t.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

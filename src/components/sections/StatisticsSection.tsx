const stats = [
  { value: '20,000+', label: 'Happy Customers', icon: '😊' },
  { value: '1,000+', label: 'Products Listed', icon: '📦' },
  { value: '500+', label: 'Verified Sellers', icon: '✅' },
  { value: '99.9%', label: 'Satisfaction Rate', icon: '⭐' },
];

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Our Numbers Speak</h2>
          <p className="text-xl opacity-90">Trusted by thousands of buyers and sellers worldwide.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-4xl font-bold mb-2">{s.value}</div>
              <div className="text-blue-100">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

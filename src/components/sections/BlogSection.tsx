const posts = [
  { title: 'Top 10 Electronics Deals This Month', category: 'Electronics', date: 'Mar 10, 2026', excerpt: 'Discover the best electronics deals available right now on MarketPlace.', emoji: '💻' },
  { title: 'How to Spot Quality Products Online', category: 'Tips', date: 'Mar 8, 2026', excerpt: 'Our expert guide to identifying high-quality products when shopping online.', emoji: '🔍' },
  { title: 'Sustainable Shopping: Eco-Friendly Picks', category: 'Lifestyle', date: 'Mar 5, 2026', excerpt: 'Shop responsibly with our curated selection of eco-friendly products.', emoji: '🌿' },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Tips, guides, and marketplace news.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-transparent dark:border-gray-700">
              <div className="h-40 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 flex items-center justify-center text-6xl">
                {post.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium">{post.category}</span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs">{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

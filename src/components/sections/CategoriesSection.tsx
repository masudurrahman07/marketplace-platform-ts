import Link from 'next/link';

const categories = [
  { name: 'Electronics', icon: '💻', count: 45, color: 'bg-blue-100 text-blue-700' },
  { name: 'Fashion', icon: '👗', count: 32, color: 'bg-pink-100 text-pink-700' },
  { name: 'Home', icon: '🏠', count: 28, color: 'bg-green-100 text-green-700' },
  { name: 'Sports', icon: '⚽', count: 19, color: 'bg-orange-100 text-orange-700' },
  { name: 'Fitness', icon: '💪', count: 15, color: 'bg-purple-100 text-purple-700' },
  { name: 'Accessories', icon: '🎒', count: 22, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Furniture', icon: '🪑', count: 12, color: 'bg-red-100 text-red-700' },
  { name: 'Food', icon: '☕', count: 8, color: 'bg-teal-100 text-teal-700' },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Find exactly what you&apos;re looking for.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/explore?category=${cat.name.toLowerCase()}`}
              className="group flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all bg-white dark:bg-gray-800">
              <div className={`text-4xl mb-3 w-16 h-16 rounded-full flex items-center justify-center ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{cat.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cat.count} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

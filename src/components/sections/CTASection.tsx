import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Start Shopping?</h2>
        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied customers. Browse our curated collection of quality products today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/explore" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:-translate-y-0.5">
            Browse All Products
          </Link>
          <Link href="/register" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:-translate-y-0.5">
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}

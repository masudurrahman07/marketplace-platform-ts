'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '../ProductCard';
import SkeletonCard from '../SkeletonCard';
import { Product } from '@/types';

export default function PopularProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/items?limit=6&sort=-rating`)
      .then((r) => r.json())
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Popular Products</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Top-rated items loved by our customers.</p>
          </div>
          <Link href="/explore" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
        <div className="text-center mt-10 md:hidden">
          <Link href="/explore" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"> View All Products</Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('isLoggedIn=true');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch {
        setWishlist([]);
      }
    }
    setLoading(false);
  }, [router]);

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter(p => p._id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">My Wishlist</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{wishlist.length} items saved</p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm">
              Clear All</button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Add products to your wishlist to save them for later</p>
            <a
              href="/explore"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
              Continue Shopping</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all"
                  title="Remove from wishlist">✕</button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

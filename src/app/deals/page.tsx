'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Swal from 'sweetalert2';

interface Deal {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  category: string;
}

const DEALS: Deal[] = [
  {
    id: 1,
    title: 'Wireless Noise-Cancelling Headphones',
    originalPrice: 299,
    discountedPrice: 149,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Premium Leather Watch',
    originalPrice: 189,
    discountedPrice: 99,
    discount: 48,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    category: 'Accessories',
  },
  {
    id: 3,
    title: 'Ergonomic Office Chair',
    originalPrice: 449,
    discountedPrice: 249,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop',
    category: 'Furniture',
  },
  {
    id: 4,
    title: 'Ultrawide Curved Monitor 34"',
    originalPrice: 699,
    discountedPrice: 399,
    discount: 43,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
    category: 'Electronics',
  },
  {
    id: 5,
    title: 'Running Shoes Pro Edition',
    originalPrice: 129,
    discountedPrice: 64,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    category: 'Sports',
  },
  {
    id: 6,
    title: 'Smart Fitness Tracker Pro',
    originalPrice: 199,
    discountedPrice: 79,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop',
    category: 'Fitness',
  },
];

export default function DealsPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = document.cookie.includes('isLoggedIn=true');
    if (!loggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Access Denied',
        text: 'Please log in to view deals.',
        timer: 1600,
        showConfirmButton: false,
      }).then(() => {
        router.push('/login');
      });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      
      
      <section className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="text-white text-sm font-semibold">🎉 LIMITED TIME OFFER</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Best Deals & Discounts
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Save big on your favorite products! Discover amazing deals on electronics, fashion, and much more. 
            Limited stocks available, so grab yours before they're gone!
          </p>
        </div>
      </section>

    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hot Deals This Week
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-800 h-full flex flex-col" >
             
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"/>
                
              
                <div className="absolute top-4 right-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center flex-col shadow-lg">
                  <span className="text-sm font-bold">SAVE</span>
                  <span className="text-xl font-bold">{deal.discount}%</span>
                </div>

            
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{deal.category}</span>
                </div>
              </div>

             
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {deal.title}
                </h3>

                
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    ${deal.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>

                <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                    💰 You save ${(deal.originalPrice - deal.discountedPrice).toFixed(0)}!
                  </p>
                </div>

              
                <Link
                  href={`/items`}
                  className="mt-auto w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"> Shop Now</Link>
              </div>
            </div>
          ))}
        </div>

     
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Shipping</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your deals delivered quickly to your doorstep with free shipping on orders over $50.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Shop with confidence. All transactions are secure and protected by industry standards.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-4xl mb-4">↩️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Not satisfied? Return items within 30 days for a full refund. No questions asked!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

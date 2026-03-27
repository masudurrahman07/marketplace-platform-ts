'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBox, FaCheckCircle, FaTruck, FaHourglassStart, FaCalendarAlt } from 'react-icons/fa';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getCookie('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await api.getBookings(token);
        setOrders(res.success ? res.data : res);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [router]);

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'delivered':
        return { icon: <FaCheckCircle className="text-green-600" />, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
      case 'shipped':
        return { icon: <FaTruck className="text-blue-600" />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'pending':
      case 'processing':
        return { icon: <FaHourglassStart className="text-yellow-600" />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' };
      default:
        return { icon: <FaBox className="text-gray-600" />, color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' };
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View and track your recent activity</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-2xl font-bold dark:text-white mb-4">No orders found</h2>
            <Link href="/explore" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const { icon, color } = getStatusInfo(order.status || 'pending');
              return (
                <div key={order._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                    
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img 
                        src={order.itemId?.image || 'https://via.placeholder.com/150'} 
                        alt="Product" 
                        className="object-cover w-full h-full"
                      />
                    </div>

                   
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {order.itemId?.title || 'Product Unavailable'}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt /> {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">
                          ID: {order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                    </div>

                
                    <div className="flex flex-col items-center md:items-end gap-3 min-w-37.5">
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${color}`}>
                        {icon} {order.status || 'pending'}
                      </div>
                      <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                        ${order.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
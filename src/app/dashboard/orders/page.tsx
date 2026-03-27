'use client';

import { useEffect, useState } from 'react';
import { FaBox, FaDownload, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { api } from '@/lib/api';
import { Booking } from '@/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) return;

        const res = await api.getBookings(token);
        if (res.success) {
          
          setOrders(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: string }> = {
      'confirmed': { color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', icon: '✓' },
      'pending': { color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', icon: '⏳' },
      'cancelled': { color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: '✕' },
    };
    return statusConfig[status] || statusConfig['pending'];
  };

  if (loading) return <div className="p-10 text-center animate-pulse dark:text-white">Loading your orders...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Orders Yet</h2>
          <a href="/explore" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold mt-4">Shop Now</a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const statusConfig = getStatusBadge(order.status);
            return (
              <div key={order._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img src={order.itemId?.image || 'https://via.placeholder.com/150'} alt="product" className="w-20 h-20 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{order.itemId?.title || 'Product Details Unavailable'}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt size={12} className="inline mr-1" />
                            Date: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-auto flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.color}`}>
                        {statusConfig.icon} {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${order.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
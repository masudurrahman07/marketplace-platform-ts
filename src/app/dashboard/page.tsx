'use client';

import { useEffect, useState } from 'react';
import { FaBox, FaStar, FaHeart, FaShoppingBag } from 'react-icons/fa';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalReviews: 0,
    wishlistItems: 0,
    totalSpent: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
   
    const wishlist = localStorage.getItem('wishlist');
    const wishlistCount = wishlist ? JSON.parse(wishlist).length : 0;
    
    setStats({
      totalOrders: Math.floor(Math.random() * 20) + 1,
      totalReviews: Math.floor(Math.random() * 10) + 1,
      wishlistItems: wishlistCount,
      totalSpent: Math.floor(Math.random() * 5000) + 500,
    });

    
    setRecentOrders([
      { id: '001', product: 'Wireless Headphones', date: '2026-03-15', status: 'Delivered', total: 199 },
      { id: '002', product: 'Gaming Keyboard', date: '2026-03-14', status: 'Shipped', total: 149 },
      { id: '003', product: 'Office Chair', date: '2026-03-13', status: 'Processing', total: 449 },
    ]);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center mb-4 ${color}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your account summary.</p>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaBox} label="Total Orders" value={stats.totalOrders} color="bg-blue-600" />
        <StatCard icon={FaStar} label="Reviews" value={stats.totalReviews} color="bg-yellow-600" />
        <StatCard icon={FaHeart} label="Wishlist Items" value={stats.wishlistItems} color="bg-red-600" />
        <StatCard icon={FaShoppingBag} label="Total Spent" value={`$${stats.totalSpent}`} color="bg-green-600" />
      </div>

    
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-linear-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Continue Shopping</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Browse our latest products and find what you need.</p>
          <a href="/explore" className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
            Explore Products →
          </a>
        </div>
        <div className="bg-linear-to-r from-red-500/10 to-red-600/10 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View Wishlist</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Check your {stats.wishlistItems} saved items.</p>
          <a href="/wishlist" className="text-red-600 dark:text-red-400 font-medium text-sm hover:underline">
            My Wishlist →
          </a>
        </div>
      </div>
    </div>
  );
}

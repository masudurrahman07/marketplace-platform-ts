'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaBox, FaShoppingBag, FaChartLine } from 'react-icons/fa';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalProducts: 450,
    totalOrders: 3200,
    totalRevenue: 125680,
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'user', message: 'New user registered: john.doe@example.com', time: '2 hours ago' },
    { id: 2, type: 'order', message: 'Order #1234 placed for $299.99', time: '4 hours ago' },
    { id: 3, type: 'product', message: 'New product added: Wireless Earbuds Pro', time: '6 hours ago' },
    { id: 4, type: 'user', message: 'User jane.smith@example.com updated profile', time: '1 day ago' },
  ]);

  const StatCard = ({ icon: Icon, label, value, color, growth }: any) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center mb-4 ${color}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {growth && <span className="text-green-600 text-sm font-semibold">+{growth}%</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your marketplace platform.</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaUsers} label="Total Users" value={stats.totalUsers.toLocaleString()} color="bg-blue-600" growth={12} />
        <StatCard icon={FaBox} label="Total Products" value={stats.totalProducts.toLocaleString()} color="bg-green-600" growth={8} />
        <StatCard icon={FaShoppingBag} label="Total Orders" value={stats.totalOrders.toLocaleString()} color="bg-purple-600" growth={15} />
        <StatCard icon={FaChartLine} label="Total Revenue" value={`$${(stats.totalRevenue / 1000).toFixed(1)}K`} color="bg-yellow-600" growth={20} />
      </div>

    
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                  activity.type === 'order' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/admin/products" className="bg-linear-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add New Product</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add and manage products in your marketplace.</p>
        </a>
        <a href="/admin/users" className="bg-linear-to-r from-green-500/10 to-green-600/10 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manage Users</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">View and manage user accounts and permissions.</p>
        </a>
      </div>
    </div>
  );
}

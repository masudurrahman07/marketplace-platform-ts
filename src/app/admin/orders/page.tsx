'use client';

import { useState } from 'react';
import { FaSearch, FaEye, FaDownload } from 'react-icons/fa';

export default function OrdersPage() {
  const [orders] = useState([
    { id: '001', customer: 'John Doe', product: 'Wireless Headphones', amount: 199, date: '2026-03-15', status: 'Delivered' },
    { id: '002', customer: 'Jane Smith', product: 'Gaming Keyboard', amount: 149, date: '2026-03-14', status: 'Shipped' },
    { id: '003', customer: 'Bob Johnson', product: 'Office Chair', amount: 449, date: '2026-03-13', status: 'Processing' },
    { id: '004', customer: 'Alice Brown', product: 'Monitor', amount: 699, date: '2026-03-12', status: 'Delivered' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o =>
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View and manage all customer orders.</p>
      </div>

  
      <div className="relative">
        <FaSearch className="absolute left-4 top-3 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${order.amount}</td>
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
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all">
                        <FaEye size={14} />
                      </button>
                      <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                        <FaDownload size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

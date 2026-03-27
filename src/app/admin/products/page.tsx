'use client';

import { useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye } from 'react-icons/fa';

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, title: 'Wireless Headphones', price: 199, category: 'electronics', stock: 45, rating: 4.6, status: 'Active' },
    { id: 2, title: 'Gaming Keyboard', price: 149, category: 'electronics', stock: 32, rating: 4.5, status: 'Active' },
    { id: 3, title: 'Office Chair', price: 449, category: 'furniture', stock: 12, rating: 4.5, status: 'Low Stock' },
    { id: 4, title: 'Running Shoes', price: 129, category: 'sports', stock: 0, rating: 4.6, status: 'Out of Stock' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Add, edit, and manage products in the marketplace.</p>
      </div>

    
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all">
          <FaPlus size={16} />
          Add Product
        </button>
      </div>

      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.stock} units</td>
                  <td className="px-6 py-4 text-sm text-yellow-500">★ {product.rating}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all">
                        <FaEye size={14} />
                      </button>
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all">
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                        <FaTrash size={14} />
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

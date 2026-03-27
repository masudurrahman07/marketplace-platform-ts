'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaChartBar, FaBox, FaShoppingBag, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLogged = document.cookie.includes('isLoggedIn=true');
    const roleMatch = document.cookie.match(/userRole=([^;]+)/);
    const role = roleMatch ? decodeURIComponent(roleMatch[1]) : '';

    if (!isLogged || role !== 'admin') {
      router.push('/');
      return;
    }

    setIsLoggedIn(true);
    setUserRole(role);
    setIsAdmin(true);
  }, [router]);

  const handleLogout = () => {
    ['isLoggedIn', 'userEmail', 'token', 'userRole'].forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    router.push('/');
  };

  const navItems = [
    { href: '/admin', icon: FaChartBar, label: 'Overview' },
    { href: '/admin/users', icon: FaUsers, label: 'Manage Users' },
    { href: '/admin/products', icon: FaBox, label: 'Manage Products' },
    { href: '/admin/orders', icon: FaShoppingBag, label: 'Manage Orders' },
    { href: '/admin/analytics', icon: FaChartBar, label: 'Analytics' },
    { href: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
       
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
           
            <div className="lg:hidden p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">Admin Menu</h2>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

           
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mx-auto mb-3">
                AD
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">Admin Panel</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">System Management</p>
            </div>

            {/* Navigation */}
            <nav className={`p-4 space-y-2 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    onClick={() => setSidebarOpen(false)}>
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <FaSignOutAlt size={18} />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

  
        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </div>
  );
}

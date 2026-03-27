'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaHome, FaUser, FaShoppingBag, FaStar, FaSignOutAlt } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLogged = document.cookie.includes('isLoggedIn=true');
    if (!isLogged) {
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);

    const emailMatch = document.cookie.match(/userEmail=([^;]+)/);
    const roleMatch = document.cookie.match(/userRole=([^;]+)/);
    setUserEmail(emailMatch ? decodeURIComponent(emailMatch[1]) : '');
    setUserRole(roleMatch ? decodeURIComponent(roleMatch[1]) : '');
  }, [router]);

  const handleLogout = () => {
    ['isLoggedIn', 'userEmail', 'token', 'userRole'].forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', icon: FaHome, label: 'Overview' },
    { href: '/dashboard/profile', icon: FaUser, label: 'My Profile' },
    { href: '/dashboard/orders', icon: FaShoppingBag, label: 'My Orders' },
    { href: '/dashboard/reviews', icon: FaStar, label: 'My Reviews' },
  ];

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
       
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          
            <div className="lg:hidden p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">Menu</h2>
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

            
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold mx-auto mb-3">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white text-center truncate">{userEmail}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center capitalize mt-1">{userRole || 'User'}</p>
            </div>

        
            <nav className={`p-4 space-y-2 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onClick={() => setSidebarOpen(false)}>
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" >
                <FaSignOutAlt size={18} />
                <span className="font-medium text-sm">Sign Out</span>
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

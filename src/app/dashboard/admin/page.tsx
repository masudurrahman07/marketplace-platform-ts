'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('isLoggedIn=true');
    const role = document.cookie.split('; ').find(r => r.startsWith('userRole='))?.split('=')[1];
    if (!isLoggedIn || role !== 'admin') { router.replace('/dashboard'); return; }
    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  const sections = [
    { label: 'Manage Products', icon: '📦', href: '/items', desc: 'View and manage all marketplace products' },
    { label: 'Manage Users', icon: '👥', href: '#', desc: 'View registered users and their roles' },
    { label: 'Manage Orders', icon: '🛒', href: '#', desc: 'View and update all platform orders' },
    { label: 'Manage Reviews', icon: '⭐', href: '#', desc: 'Moderate product reviews' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium">← Dashboard</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Panel</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Platform management</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <Link key={s.label} href={s.href}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{s.label}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

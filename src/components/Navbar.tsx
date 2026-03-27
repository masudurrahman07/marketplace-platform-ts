'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import Image from 'next/image';
import Swal from 'sweetalert2';

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${dark ? 'bg-blue-600' : 'bg-gray-300'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-1'}`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const check = () => {
      setIsLoggedIn(document.cookie.includes('isLoggedIn=true'));
      const emailMatch = document.cookie.match(/userEmail=([^;]+)/);
      const roleMatch = document.cookie.match(/userRole=([^;]+)/);
      setUserEmail(emailMatch ? decodeURIComponent(emailMatch[1]) : '');
      setUserRole(roleMatch ? decodeURIComponent(roleMatch[1]) : '');
      
      if (typeof window !== 'undefined') {
        const storedProfilePic = localStorage.getItem('userProfilePicture');
        setProfilePicture(storedProfilePic || '');
      }
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    ['isLoggedIn', 'userEmail', 'token', 'userRole'].forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`; 
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfilePicture');
      localStorage.removeItem('userDisplayName');
    }
    setIsLoggedIn(false);
    setProfilePicture('');
    setIsDropdownOpen(false);

    await Swal.fire({
      icon: 'success',
      title: 'Logged out',
      text: 'You have been logged out successfully.',
      timer: 1200,
      showConfirmButton: false,
    });

    router.push('/');
  };

  const pathname = usePathname();

  const baseNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const navLinks = isLoggedIn
    ? [
        ...baseNavLinks.slice(0, 2),
        { href: '/deals', label: 'Deals' },
        { href: '/help-center', label: 'Help Center' },
        ...baseNavLinks.slice(2),
      ]
    : baseNavLinks;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              MarketPlace
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`} >
                {link.label}
              </Link>
            ))}

            <ThemeToggle />

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden relative">
                    {profilePicture ? (
                      <Image
                        src={profilePicture}
                        alt="Profile"
                        fill
                        className="object-cover" />
                    ) : (
                      <FaUser size={16} />
                    )}
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userEmail}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">{userRole || 'User'}</p>
                    </div>

                    <div className="py-2">
                      <Link href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <FaUser size={16} />
                        Dashboard
                      </Link>
                      <Link href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <FaUser size={16} />
                        My Profile
                      </Link>
                      {userRole === 'admin' && (
                        <>
                          <hr className="my-2 border-gray-200 dark:border-gray-700" />
                          <Link href="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium">
                            <FaCog size={16} />
                            Admin Panel
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <FaSignOutAlt size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Dashboard
              </Link>
            )}
            <div className="pt-2">
              {isLoggedIn ? (
                <button onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2.5 rounded-lg text-sm font-semibold">
                  Sign Out
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-lg text-sm font-semibold text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
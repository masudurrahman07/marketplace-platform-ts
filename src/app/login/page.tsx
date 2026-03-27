'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FcGoogle } from 'react-icons/fc';
import { FaUserShield, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '@/firebase.config';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleDemoLogin = (role: 'user' | 'admin') => {
    const credentials = {
      user: { email: 'user@example.com', pass: '123456' },
      admin: { email: 'admin@example.com', pass: '123456' }
    };
    setFormData({ email: credentials[role].email, password: credentials[role].pass });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.login({ 
        email: formData.email.toLowerCase().trim(), 
        password: formData.password 
      });

      if (data.success) {
        saveSession(data.token, data.user?.role, data.user?.email, data.user?.photoURL);
        
       
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${data.user?.name || 'User'}!`,
          timer: 1500,
          showConfirmButton: false,
          background: '#111827',
          color: '#fff'
        });

        router.push(data.user?.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (err: any) {
      showError('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const payload = {
        name: result.user.displayName || 'Google User',
        email: result.user.email,
        photoURL: result.user.photoURL
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        saveSession(data.token, data.user.role, data.user.email, data.user.photoURL);
        
        await Swal.fire({
          icon: 'success',
          title: 'Google Login Successful',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false,
          background: '#111827',
          color: '#fff'
        });
        router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      showError('Google Login Failed', err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const saveSession = (token: string, role: string, email: string, photoURL?: string) => {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `isLoggedIn=true; expires=${expires}; path=/`;
    document.cookie = `token=${token}; expires=${expires}; path=/`;
    document.cookie = `userRole=${role || 'user'}; expires=${expires}; path=/`;
    document.cookie = `userEmail=${email}; expires=${expires}; path=/`;
    
    if (typeof window !== 'undefined') {
      if (photoURL) {
        localStorage.setItem('userProfilePicture', photoURL);
      } else {
        localStorage.removeItem('userProfilePicture');
      }
    }
  };

  const showError = (title: string, text: string) => {
    Swal.fire({
      icon: 'error',
      title,
      text: text || 'Something went wrong',
      background: '#111827',
      color: '#fff'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <div className="relative flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="w-full max-w-md z-10">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
            </div>

            <div className="mb-8 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleDemoLogin('user')} className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 py-2.5 rounded-xl text-sm font-semibold border border-gray-100 dark:border-gray-700">
                  <FaUser className="text-blue-500" /> User
                </button>
                <button onClick={() => handleDemoLogin('admin')} className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 py-2.5 rounded-xl text-sm font-semibold border border-gray-100 dark:border-gray-700">
                  <FaUserShield className="text-purple-500" /> Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Email Address"
                required/>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Password"
                  required/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg disabled:opacity-70 transform transition hover:scale-[1.01] active:scale-[0.99]">
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <FcGoogle size={22} />
              )}
              Google Account</button>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              New here? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
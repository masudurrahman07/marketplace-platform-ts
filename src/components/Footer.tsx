import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">MarketPlace</h3>
            <p className="text-gray-400 mb-5 max-w-sm text-sm leading-relaxed">
              Your trusted marketplace for quality products. We connect buyers and sellers in a secure, user-friendly environment.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400 shrink-0" />
                <span>support@marketplace.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-400 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400 shrink-0" />
                <span>123 Market St, San Francisco, CA</span>
              </div>
            </div>
          
            <div className="flex items-center gap-4 mt-5">
              <a href="https://www.facebook.com/mdmasudur.rahman.1800721" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors text-xl" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://github.com/masudurrahman07" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-xl" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/masudurrahman07/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors text-xl" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/explore', 'Explore'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Account</h4>
            <ul className="space-y-2">
              {[['/login', 'Login'], ['/register', 'Register'], ['/dashboard', 'Dashboard'], ['/dashboard/orders', 'Orders']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2026 MarketPlace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/mdmasudur.rahman.1800721" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors text-lg" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://github.com/masudurrahman07" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-lg" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/masudurrahman07/" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors text-lg" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

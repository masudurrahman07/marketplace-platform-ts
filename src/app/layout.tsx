import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Chatbot from '@/components/Chatbot';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'MarketPlace - Discover Amazing Products',
  description: 'Your trusted marketplace for quality products from verified sellers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ThemeProvider>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}

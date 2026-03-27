import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import PopularProductsSection from '@/components/sections/PopularProductsSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <PopularProductsSection />
        <StatisticsSection />
        <TestimonialsSection />
        <BlogSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

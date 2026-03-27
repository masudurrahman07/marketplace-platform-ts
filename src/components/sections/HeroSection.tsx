'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [particles, setParticles] = useState<
    { left: number; bottom: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      bottom: Math.random() * -100,
      duration: 6 + Math.random() * 8,
    }));
    setParticles(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-40px) translateY(20px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes waveMoveReverse {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(40px) translateY(-20px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes particles {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .hero-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f172a, #1e3a8a, #4f46e5);
          min-height: 80vh; 
          display: flex;
          align-items: center;
        }

        .wave {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
        }

        .wave1 {
          background: #60a5fa;
          top: -120px;
          left: -120px;
          animation: waveMove 14s ease-in-out infinite;
        }

        .wave2 {
          background: #818cf8;
          bottom: -120px;
          right: -120px;
          animation: waveMoveReverse 16s ease-in-out infinite;
        }

        .wave3 {
          background: #38bdf8;
          top: 40%;
          left: 60%;
          animation: waveMove 18s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          animation: particles linear infinite;
        }

        .fade-up {
          animation: fadeUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }

        .floating {
          animation: floatSoft 4s ease-in-out infinite;
        }

        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
        }

        .shimmer-text {
          background: linear-gradient(90deg, #fde68a, #fbbf24, #fde68a);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <section className="hero-section text-white">

       
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>

        
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}px`,
              animationDuration: `${p.duration}s`,
            }}/>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <span className="fade-up delay-1 inline-block glass text-sm font-medium px-5 py-2 rounded-full mb-6 shadow-md"> 🛍️ The Future Marketplace </span>

          <h1 className="fade-up delay-2 text-4xl md:text-6xl font-extrabold mb-4 leading-tight"> Discover Next-Level <br /> <span className="shimmer-text">Shopping</span> </h1>

          <p className="fade-up delay-3 text-lg md:text-xl mb-6 max-w-2xl mx-auto opacity-90">Experience smarter shopping with premium products, trusted sellers, and AI-powered recommendations.</p>

          <div className="fade-up delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="bg-white text-blue-600 px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition hover:-translate-y-1"> Explore </Link>

            <Link
              href="/register"
              className="border border-white text-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition hover:-translate-y-1">
              Get Started </Link> </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[['1000+', 'Products'], ['500+', 'Sellers'], ['10k+', 'Users']].map(([num, label]) => (
              <div key={label} className="floating text-center">
                <div className="text-xl font-bold">{num}</div>
                <div className="text-blue-200 text-xs">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
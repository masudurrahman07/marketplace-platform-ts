/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
     
      {
        protocol: 'https',
        hostname: 'ibb.co.com',
        port: '',
        pathname: '/**',
      },
     
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
 
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },

  trailingSlash: false,
  compress: true,
};

export default nextConfig;
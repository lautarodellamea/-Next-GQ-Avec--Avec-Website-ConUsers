/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  },

  eslint: {
    // Ignora la verificación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;

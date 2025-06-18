/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add this to handle cross-origin requests in development
  experimental: {
    allowedDevOrigins: ['127.0.0.1:3000', 'localhost:3000'],
  },
}

export default nextConfig

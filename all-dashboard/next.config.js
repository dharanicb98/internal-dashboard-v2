/** @type {import('next').NextConfig} */


const path = require("path")

const nextConfig = {
  distDir: "/dashboard",
  // rewrites() {
  //   return [
  //     { source: '/dashboard/_next/:path*', destination: '/_next/:path*' }
  //   ] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  sassOptions: {
    fibers: false,
  }
};

module.exports = nextConfig;

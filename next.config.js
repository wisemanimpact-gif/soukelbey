/** @type {import('next').NextConfig} */
const nextConfig = {
  // Full Node.js runtime — required for API routes (Stripe).
  // Site is now served by Phusion Passenger on WHC, not as static files.
  trailingSlash: true,
  images: {
    // Keep unoptimized for now to avoid needing the Image Optimization
    // pipeline (which requires a writable cache on the host).
    unoptimized: true,
  },
}

module.exports = nextConfig

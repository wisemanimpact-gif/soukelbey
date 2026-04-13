/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // Static HTML export → works on WCH shared hosting
  trailingSlash: true,    // /restaurant/ instead of /restaurant
  images: {
    unoptimized: true,    // Required for static export
  },
}

module.exports = nextConfig

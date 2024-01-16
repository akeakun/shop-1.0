/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        // pathname: '',
      },
    ],
    deviceSizes: [640, 750, 1080],
    imageSizes: [16, 32, 64],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 0,
  },
};

module.exports = nextConfig;

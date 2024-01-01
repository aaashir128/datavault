/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.softicons.com",
      },
      {
        protocol: "https",
        hostname: "www.shareicon.net",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;

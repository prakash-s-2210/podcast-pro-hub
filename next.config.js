/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { 
    serverComponentsExternalPackages: ["mongoose"] },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          hostname: "utfs.io",
        },
      ],
    },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mateiko.pl",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

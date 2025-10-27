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
  // Automatyczne usuwanie console.log w production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
};

export default nextConfig;

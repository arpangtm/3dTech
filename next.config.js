/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pinimg.com","res.cloudinary.com","lh3.googleusercontent.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

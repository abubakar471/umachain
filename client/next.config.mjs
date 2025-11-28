/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["img.clerk.com", "res-console.cloudinary.com", "res.cloudinary.com", "i.ytimg.com", "yt3.googleusercontent.com"]
  },
  reactCompiler: true,
};

export default nextConfig;

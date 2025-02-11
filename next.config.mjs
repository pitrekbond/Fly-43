/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "www.geonames.org",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    RAPIDAPI_KEY: "8ce3ae0e38msh30ddfb559b06728p10037cjsn9e8138496c42",
  },
};

export default nextConfig;

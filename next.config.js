/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  images:{
    loader:"akamai",
    path:""
  }
}

module.exports = {
  images: {
    domains: ["mdbcdn.b-cdn.net/img/new/slides/041.webp", "mdbcdn.b-cdn.net/img/new/slides/042.webp", "mdbcdn.b-cdn.net/img/new/slides/043.webp"]
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/'
  }
}

module.exports = {
  images: {
    domains: ["https://ojarhproperties.com/api", "http://ojarh-properties.com/api", 'https://sleepy-everglades-36547.herokuapp.com']
  },
}

module.exports = nextConfig

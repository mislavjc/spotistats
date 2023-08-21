const { withPlausibleProxy } = require('next-plausible');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = withPlausibleProxy()(nextConfig);

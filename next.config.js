const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'platform-lookaside.fbsbx.com'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});

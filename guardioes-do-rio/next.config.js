const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development', // Desativa o PWA no modo desenvolvimento
});

module.exports = withPWA({
  // Outras configurações do Next.js
});
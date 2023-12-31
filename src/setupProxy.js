const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'http://www.example.com',
      changeOrigin: true,
    })
  );
};

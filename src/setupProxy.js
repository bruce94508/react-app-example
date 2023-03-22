const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'url-you-want-to-proxy-to',
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' },
    })
  );
};

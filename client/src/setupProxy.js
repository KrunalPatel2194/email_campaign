const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api/*'],
    createProxyMiddleware({
      target: 'http://localhost:9024',
    })
  );
  app.use(
    ['/api', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:9024',
    })
  );
  
  
};
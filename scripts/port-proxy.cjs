const http = require('http');

const server = http.createServer((req, res) => {
  let urlPath = req.url;
  const [pathname, search] = urlPath.split('?');
  
  // If user visits a path without trailing slash and without file extension, redirect cleanly
  if (pathname && !pathname.endsWith('/') && !pathname.includes('.')) {
    const redirectUrl = pathname + '/' + (search ? '?' + search : '');
    res.writeHead(301, { Location: redirectUrl });
    res.end();
    return;
  }

  const options = {
    hostname: '127.0.0.1',
    port: 4321,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Astro dev server is starting on port 4321...');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Port proxy ready: http://localhost:3000 -> http://localhost:4321');
});

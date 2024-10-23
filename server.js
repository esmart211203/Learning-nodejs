const http = require('http');

// Thiết lập địa chỉ IP và cổng || localhost
const hostname = '127.0.0.1';
const port = 3000;

// Tạo server
const server = http.createServer((req, res) => {
  // Thiết lập header cho response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Kiểm tra route
  if (req.url === '/') {
    res.end('Hello, World!!');
  } else if (req.url === '/about') {
    res.end('This is the About page');
  } else {
    res.statusCode = 404;
    res.end('404 - Page Not Found');
  }
});

// Bắt đầu lắng nghe tại cổng đã chỉ định
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const http = require('http');
const handleRoute = require('./routes');
// Thiết lập địa chỉ IP và cổng || localhost
const hostname = '127.0.0.1';
const port = 3001;


// Tạo server req: Request, res: Response
const server = http.createServer((req, res) => {
  // Thiết lập header cho response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // Import routes
  handleRoute(req, res);
});

// Bắt đầu lắng nghe tại cổng đã chỉ định
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

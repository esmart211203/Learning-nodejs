const http = require('http');
const moduleOne = require('./config');
const handleRoute = require('./routes/index');


// Tạo server req: Request, res: Response
const server = http.createServer((req, res) => {
  // Thiết lập header cho response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // Import routes
  handleRoute(req, res);
});

// Bắt đầu lắng nghe tại cổng đã chỉ định
server.listen(moduleOne.port, moduleOne.hostname, () => {
  console.log(`Hiii XuanTrongDev, I'm running at http://${moduleOne.hostname}:${moduleOne.port}/`);
});

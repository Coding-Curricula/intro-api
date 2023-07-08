const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is an API request\n');
});

server.listen(8080, 'localhost', () => {
  console.log('Server running at http://localhost:8080/');
});
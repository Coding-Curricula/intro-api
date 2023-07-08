// vanill a nodejs server with no express
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is an API request\n');
    }
    else if (pathname === '/api') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'This is an API response' }));
    }
    else if (pathname === '/api/data') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'This is an API response with data', data: query }));
    }

});

// return the index.html file
server.on('request', (req, res) => {
    const { pathname } = url.parse(req.url, true);

    if (pathname === '/home') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
});

const PORT = 8080;

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
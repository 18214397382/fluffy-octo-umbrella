const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, message: 'Hello from Railway!' }));
});

const PORT = process.env.PORT || 4173;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
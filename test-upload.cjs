const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'package.json');
const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);

const fileContent = fs.readFileSync(filePath);
const fileName = 'test.mp4';

let body = '';
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="video"; filename="${fileName}"\r\n`;
body += `Content-Type: video/mp4\r\n\r\n`;

const bodyBuffer = Buffer.concat([
  Buffer.from(body, 'utf-8'),
  fileContent,
  Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8')
]);

const options = {
  hostname: '127.0.0.1',
  port: 4173,
  path: '/api/ai-edit/start',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': bodyBuffer.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(bodyBuffer);
req.end();
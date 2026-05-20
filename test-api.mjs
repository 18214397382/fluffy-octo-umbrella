import https from 'https';
import fs from 'fs';

function postForm(hostname, path, filePath) {
  return new Promise((resolve) => {
    const boundary = '----' + Date.now();
    const fileData = fs.readFileSync(filePath);
    const fileName = filePath.split('/').pop() || 'test';

    const header = Buffer.from(
      '------' + boundary + '\r\n' +
      'Content-Disposition: form-data; name="video"; filename="' + fileName + '"\r\n' +
      'Content-Type: video/mp4\r\n\r\n'
    );
    const footer = Buffer.from('\r\n--------' + boundary + '--\r\n');

    const options = {
      hostname,
      path,
      method: 'POST',
      timeout: 30000,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': header.length + fileData.length + footer.length
      }
    };

    const req = https.request(options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d.substring(0, 500) }));
    });
    req.on('error', e => resolve({ error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });

    req.write(header);
    req.write(fileData);
    req.end(footer);
  });
}

const result = await postForm(
  'backend-api-production-c413.up.railway.app',
  '/api/cos/upload',
  import.meta.dirname + '/test-api.mjs'
);

console.log('Result:', JSON.stringify(result, null, 2));
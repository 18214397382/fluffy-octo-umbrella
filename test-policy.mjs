import https from 'https';

const data = JSON.stringify({fileName:'test.mp4',fileSize:1000});

const req = https.request({
  hostname: 'backend-api-production-c413.up.railway.app',
  path: '/api/cos/policy',
  method: 'POST',
  headers: {'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}
}, (res) => {
  let d='';
  res.on('data',c=>d+=c);
  res.on('end',()=>{console.log('Status:',res.statusCode);console.log('Body:',d);process.exit()});
});
req.on('error',e=>{console.log('Error:',e.message);process.exit(1)});
req.write(data);
req.end();
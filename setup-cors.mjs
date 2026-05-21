import COS from 'cos-nodejs-sdk-v5';

const cos = new COS({
  SecretId: 'AKIDOccNtABk5B2dy5xay6zgbIjvreEZsBIC',
  SecretKey: 'jEVcY4NTJwMdiZKtDJAoDNJ0TiiTyEF1',
});

const bucket = 'ai-video-uploads-1330620623-1325485155';
const region = 'ap-guangzhou';

// 配置CORS规则
cos.putBucketCors({
  Bucket: bucket,
  Region: region,
  CORSRules: [
    {
      AllowedOrigin: ['*'],
      AllowedMethod: ['GET', 'PUT', 'HEAD', 'POST', 'DELETE'],
      AllowedHeader: ['*'],
      ExposeHeader: ['ETag', 'Content-Length', 'x-cos-request-id'],
      MaxAgeSeconds: '86400',
    }
  ]
}, (err, data) => {
  if (err) {
    console.log('CORS配置失败:', err);
  } else {
    console.log('CORS配置成功:', data);
  }
});
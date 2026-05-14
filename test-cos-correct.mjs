import COS from 'cos-nodejs-sdk-v5';

const TENCENT_SECRET_ID = 'AKIDOccNtABk5B2dy5xay6zgbIjvreEZsBIC';
const TENCENT_SECRET_KEY = 'jEVcY4NTJwMdiZKtDJAoDNJ0TiiTyEF1';
const BUCKET = 'ai-video-uploads-1330620623-1325485155';
const REGION = 'ap-guangzhou';

const cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY,
});

async function testBucket() {
  console.log('🔍 测试正确的存储桶...\n');
  console.log(`📦 桶名: ${BUCKET}`);
  console.log(`🌍 地区: ${REGION}\n`);

  try {
    await cos.headBucket({
      Bucket: BUCKET,
      Region: REGION,
    });

    console.log('✅ 存储桶存在且可访问！\n');

    const testFile = Buffer.from('test upload - ' + new Date().toISOString());
    const result = await cos.putObject({
      Bucket: BUCKET,
      Region: REGION,
      Key: `test_${Date.now()}.txt`,
      Body: testFile,
    });

    console.log('✅ 上传测试成功！');
    console.log(`🔗 文件URL: https://${BUCKET}.cos.${REGION}.myqcloud.com/test_${Date.now()}.txt`);
    console.log('\n🎉 腾讯云COS完全可用！');
    console.log('\n现在可以更新代码使用腾讯云了！');

    return true;
  } catch (error) {
    console.error('❌ 错误:', error.code, '-', error.message);
    return false;
  }
}

testBucket().then(success => {
  process.exit(success ? 0 : 1);
});
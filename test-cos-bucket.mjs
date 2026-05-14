import COS from 'cos-nodejs-sdk-v5';
import fs from 'fs';

const TENCENT_SECRET_ID = 'AKIDOccNtABk5B2dy5xay6zgbIjvreEZsBIC';
const TENCENT_SECRET_KEY = 'jEVcY4NTJwMdiZKtDJAoDNJ0TiiTyEF1';
const BUCKET = 'ai-video-uploads-1330620623';
const REGION = 'ap-guangzhou';

const cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY,
});

async function testBucket() {
  console.log('🔍 测试腾讯云COS存储桶...\n');

  try {
    console.log(`📦 桶名: ${BUCKET}`);
    console.log(`🌍 地区: ${REGION}`);
    console.log(`🔗 域名: https://${BUCKET}.cos.${REGION}.myqcloud.com\n`);

    const data = await cos.headBucket({
      Bucket: BUCKET,
      Region: REGION
    });

    console.log('✅ 存储桶存在且可访问！\n');
    console.log('🧪 开始测试上传...');

    const testFile = Buffer.from('test upload - ' + new Date().toISOString());
    await cos.putObject({
      Bucket: BUCKET,
      Region: REGION,
      Key: `test_${Date.now()}.txt`,
      Body: testFile,
    });

    console.log('✅ 上传测试成功！\n');
    console.log('🎉 腾讯云COS完全可用！');
    console.log('\n现在可以使用腾讯云上传功能了！');

  } catch (error) {
    if (error.code === 'NoSuchBucket') {
      console.error('❌ 存储桶不存在:', BUCKET);
      console.log('\n请确认:');
      console.log('1. 是否在腾讯云控制台创建了该存储桶？');
      console.log('2. 桶名是否正确？（区分大小写）');
      console.log('3. 地域是否是 ap-guangzhou？');
    } else {
      console.error('❌ 错误:', error.code, '-', error.message);
    }
  }
}

testBucket().catch(console.error);
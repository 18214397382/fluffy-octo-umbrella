import COS from 'cos-nodejs-sdk-v5';

const TENCENT_SECRET_ID = 'AKIDOccNtABk5B2dy5xay6zgbIjvreEZsBIC';
const TENCENT_SECRET_KEY = 'jEVcY4NTJwMdiZKtDJAoDNJ0TiiTyEF1';
const BUCKET = 'ai-video-uploads-1330620623';
const REGION = 'ap-guangzhou';

const cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY,
});

async function createBucket() {
  console.log('🚀 开始创建腾讯云COS存储桶...');
  console.log(`📦 桶名: ${BUCKET}`);
  console.log(`🌍 地区: ${REGION}\n`);

  try {
    const data = await cos.putBucket({
      Bucket: BUCKET,
      Region: REGION,
      ACL: 'public-read',
    });

    console.log('✅ 存储桶创建成功！');
    console.log(`📍 域名: https://${BUCKET}.cos.${REGION}.myqcloud.com`);
    console.log('\n🎉 现在可以使用腾讯云上传功能了！');
  } catch (error) {
    if (error.code === 'BucketAlreadyExists') {
      console.log('✅ 存储桶已存在，可以直接使用！');
      console.log(`📍 域名: https://${BUCKET}.cos.${REGION}.myqcloud.com`);
    } else if (error.code === 'BucketAlreadyOwnedByYou') {
      console.log('✅ 存储桶已属于你，可以直接使用！');
      console.log(`📍 域名: https://${BUCKET}.cos.${REGION}.myqcloud.com`);
    } else {
      console.error('❌ 创建失败:', error);
      throw error;
    }
  }
}

createBucket().catch(console.error);
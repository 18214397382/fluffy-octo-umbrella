const { execSync } = require('child_process');

console.log('=== 开始构建 ===');
console.log('当前目录:', process.cwd());

try {
  console.log('=== 安装依赖 ===');
  execSync('npm install', { stdio: 'inherit' });

  console.log('=== TypeScript编译 ===');
  execSync('./node_modules/.bin/tsc -b', { stdio: 'inherit' });

  console.log('=== Vite构建 ===');
  execSync('./node_modules/.bin/vite build', { stdio: 'inherit' });

  console.log('=== 构建完成 ===');
} catch (error) {
  console.error('构建失败:', error.message);
  process.exit(1);
}

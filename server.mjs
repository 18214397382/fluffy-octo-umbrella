import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, 'api', 'index.mjs');

console.log(`Bootstrap: Starting server from ${serverPath}`);

const child = spawn('node', [serverPath], {
  stdio: 'inherit',
  cwd: __dirname,
  env: { ...process.env }
});

child.on('error', (err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Bootstrap: Server exited with code ${code}`);
  process.exit(code || 0);
});
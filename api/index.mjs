import { spawn } from 'child_process';
import path from 'path';

const tsxPath = path.join(process.cwd(), 'node_modules', '.bin', 'tsx');
const appPath = path.join(process.cwd(), 'api', 'app.ts');

const child = spawn(tsxPath, [appPath], {
  stdio: 'inherit',
  env: { ...process.env },
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
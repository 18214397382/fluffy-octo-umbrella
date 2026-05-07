#!/bin/bash
echo "=== 开始构建 ==="
echo "当前目录: $(pwd)"
echo "npm版本: $(npm -v)"

echo "=== 安装依赖 ==="
npm ci

echo "=== TypeScript编译 ==="
npx tsc -b

echo "=== Vite构建 ==="
npx vite build

echo "=== 构建完成 ==="

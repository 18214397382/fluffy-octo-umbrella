# 🎬 抖音短剧剪辑应用 - 手机部署指南

## 🚀 最简单方案：部署到 Vercel（完全免费！）

### 📱 手机上操作步骤：

#### 第一步：注册账号（如果还没有）
1. 在手机浏览器访问 [github.com](https://github.com) 注册账号
2. 访问 [vercel.com](https://vercel.com) 用 GitHub 账号登录

#### 第二步：上传代码到 GitHub
1. 在 GitHub 上点击 "+" → "New repository"
2. 输入名字比如 `douyin-video-editor`，选择 Public
3. 点击 "Create repository"

#### 第三步：一键部署
1. 访问 [vercel.com/new](https://vercel.com/new)
2. 点击 "Import" 导入你刚才创建的仓库
3. 直接点击 "Deploy"（不需要改任何设置）
4. 等待 2-3 分钟，部署完成！🎉

#### 第四步：开始使用
部署成功后，你会获得一个类似 `https://douyin-video-editor.vercel.app` 的链接

**直接在手机浏览器打开这个链接就能使用了！** ✨

---

## 💡 如果有电脑操作更方便：

如果你有电脑，可以按照以下步骤：

1. 下载代码到电脑
2. 在 GitHub 创建新仓库
3. 用 git 命令推送代码
4. 在 Vercel 导入并部署

---

## 🎯 其他快速方案

### 方案 A：Netlify 拖拽部署（超级简单）
1. 运行 `npm run build` 生成 `dist` 文件夹
2. 访问 [app.netlify.com](https://app.netlify.com)
3. 直接把 `dist` 文件夹拖拽到网页上
4. 10 秒就部署完成！

### 方案 B：GitHub Pages
1. 在仓库 Settings 里开启 Pages
2. 选择 `gh-pages` 分支
3. 等待部署

---

## 📱 使用说明

部署成功后：
- 🎥 上传你的视频素材
- 🎨 选择热门模板
- ✂️ 一键剪辑调整
- 📤 导出下载到手机

---

## 🔧 本地开发（可选）

如果你想在本地测试：

```bash
npm install
npm run dev
```

前端运行在 http://localhost:5173
后端运行在 http://localhost:3001

---

## ⚠️ 注意事项

1. 确保手机和网络连接正常
2. 上传视频不要太大（建议 < 100MB）
3. Vercel 免费额度足够个人使用

有问题随时问我！


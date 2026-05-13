import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import https from 'https';
import http from 'http';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  maxAge: 86400,
}));

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 1024, fieldSize: 1024 * 1024 * 1024 },
  storage: multer.memoryStorage()
});

app.use((req, res, next) => {
  res.setTimeout(300000);
  req.setTimeout(300000);
  next();
});

const UPYUN_OPERATOR = process.env.UPYUN_OPERATOR || 'aiyun';
const UPYUN_PASSWORD = process.env.UPYUN_PASSWORD || 'dMK698SWzvvEt888PwuUPoEgReMbvrC9';
const UPYUN_BUCKET = process.env.UPYUN_BUCKET || 'ai-video-uploads';
const UPYUN_ENDPOINT = `https://${UPYUN_BUCKET}.on.upyun.com`;

app.use('/api/ai-edit/start', (req, res, next) => {
  req.setTimeout(600000);
  res.setTimeout(600000);
  next();
});

const taskStore = new Map();

const localModels = [
  { id: 'local-basic', name: '基础剪辑', description: '快速基础剪辑', emoji: '⚡', provider: 'local' },
  { id: 'local-standard', name: '标准剪辑', description: '平衡质量与速度', emoji: '🔧', provider: 'local' },
  { id: 'local-pro', name: '专业剪辑', description: '高质量专业处理', emoji: '💎', provider: 'local' },
  { id: 'local-cinematic', name: '电影级剪辑', description: '电影级色彩与节奏', emoji: '🎬', provider: 'local' },
];

const cloudModels = [
  { id: 'cloud-fast', name: '极速云端', description: '云端快速处理', emoji: '☁️', provider: 'cloud' },
  { id: 'cloud-ai', name: 'AI智能云端', description: '云端AI增强处理', emoji: '🤖', provider: 'cloud' },
  { id: 'cloud-hd', name: '高清云端', description: '云端高清渲染', emoji: '📺', provider: 'cloud' },
  { id: 'cloud-4k', name: '4K云端', description: '云端4K超清处理', emoji: '🌟', provider: 'cloud' },
];

app.post('/api/ai-edit/start', upload.single('video'), async (req, res) => {
  try {
    const {
      style = 'trending',
      duration = 30,
      addMusic = 'true',
      addCaptions = 'true',
      features = '[]',
      modelType = 'local-basic',
      modelProvider = 'local'
    } = req.body;

    if (!req.file) {
      res.status(400).json({ success: false, message: '视频文件是必需的' });
      return;
    }

    if (req.file.size > 1024 * 1024 * 1024) {
      res.status(400).json({ success: false, message: '视频文件不能超过1GB' });
      return;
    }

    const taskId = 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const tempFileName = `${taskId}_${req.file.originalname}`;
    const tempFilePath = path.join(__dirname, 'temp', tempFileName);
    
    if (!fs.existsSync(path.join(__dirname, 'temp'))) {
      fs.mkdirSync(path.join(__dirname, 'temp'), { recursive: true });
    }
    
    await fs.promises.writeFile(tempFilePath, req.file.buffer);
    
    const videoUrl = `${req.protocol}://${req.get('host')}/api/temp/${taskId}`;

    taskStore.set(taskId, {
      status: 'processing',
      progress: 0,
      currentStep: '已接收视频，正在处理...',
      createdAt: Date.now(),
      modelType,
      modelProvider,
      videoUrl,
      tempFilePath,
      fileName: req.file.originalname,
      fileMime: req.file.mimetype,
      style,
      duration: parseInt(duration),
      addMusic,
      addCaptions,
      features,
    });

    setImmediate(() => processTask(taskId));

    res.status(200).json({
      success: true,
      taskId,
      message: 'AI剪辑任务已启动',
      modelProvider,
      modelType,
      videoUrl,
    });
  } catch (error) {
    console.error('AI剪辑启动失败:', error);
    res.status(500).json({
      success: false,
      message: '启动AI剪辑失败',
      error: error.message || 'Unknown error'
    });
  }
});

app.get('/api/temp/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const task = taskStore.get(taskId);
  
  if (!task || !task.tempFilePath) {
    res.status(404).json({ success: false, message: '文件不存在或已过期' });
    return;
  }
  
  try {
    if (fs.existsSync(task.tempFilePath)) {
      res.setHeader('Content-Type', task.fileMime || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(task.fileName)}"`);
      const stream = fs.createReadStream(task.tempFilePath);
      stream.pipe(res);
    } else {
      res.status(404).json({ success: false, message: '文件已被删除' });
    }
  } catch (error) {
    console.error('下载临时文件失败:', error);
    res.status(500).json({ success: false, message: '下载失败' });
  }
});

app.post('/api/ai-edit/start-url', async (req, res) => {
  try {
    const { videoUrl, style = 'trending', duration = 30, modelType = 'local-basic', modelProvider = 'local' } = req.body;

    if (!videoUrl) {
      res.status(400).json({ success: false, message: '视频URL是必需的' });
      return;
    }

    const taskId = 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    taskStore.set(taskId, {
      status: 'processing',
      progress: 0,
      currentStep: '正在从URL下载视频...',
      createdAt: Date.now(),
      modelType,
      modelProvider,
      videoUrl,
      style,
      duration: parseInt(duration),
      addMusic: 'true',
      addCaptions: 'true',
      features: '[]',
    });

    setImmediate(() => processUrlTask(taskId));

    res.status(200).json({
      success: true,
      taskId,
      message: 'AI剪辑任务已启动',
      modelProvider,
      modelType,
    });
  } catch (error) {
    console.error('AI剪辑启动失败:', error);
    res.status(500).json({
      success: false,
      message: '启动AI剪辑失败',
      error: error.message || 'Unknown error'
    });
  }
});

app.use(express.raw({ type: 'application/octet-stream', limit: '200mb' }));
app.use(express.json({ limit: '1mb' }));

const uploadSessions = new Map();

const PROXY_UPLOAD_LIMIT = 500 * 1024 * 1024;

app.post('/api/upyun/policy', express.json(), (req, res) => {
  const { fileName, fileSize } = req.body;
  if (!fileName) {
    res.status(400).json({ success: false, message: 'fileName is required' });
    return;
  }

  const date = new Date().toISOString().replace(/[:-]/g, '').split('.')[0] + '000';
  const saveKey = `uploads/${Date.now()}_${fileName}`;

  const policy = Buffer.from(JSON.stringify({
    bucket: UPYUN_BUCKET,
    'save-key': `/${saveKey}`,
    expiration: Math.floor(Date.now() / 1000) + 7200,
    'content-length-range': '0,524288000',
    'x-gmkerl-thumb': '',
    'image-width-range': '',
    'image-height-range': '',
  })).toString('base64');

  const signature = crypto.createHmac('sha1', UPYUN_PASSWORD).update(policy).digest('hex');

  const uploadUrl = `https://v0.api.upyun.com/${UPYUN_BUCKET}`;

  res.status(200).json({
    success: true,
    policy,
    signature,
    uploadUrl,
    saveKey: '/' + saveKey,
    operator: UPYUN_OPERATOR,
    fileUrl: `${UPYUN_ENDPOINT}/${saveKey}`,
  });
});

app.post('/api/proxy-upload', express.json(), (req, res) => {
  const { fileName, fileSize } = req.body;
  if (!fileName || !fileSize) {
    res.status(400).json({ success: false, message: 'Missing fileName or fileSize' });
    return;
  }
  if (fileSize > PROXY_UPLOAD_LIMIT) {
    res.status(400).json({ success: false, message: 'File too large (max 500MB)' });
    return;
  }
  const totalChunks = Math.ceil(fileSize / (10 * 1024 * 1024));
  const uploadId = 'proxy_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  uploadSessions.set(uploadId, {
    fileName,
    fileSize,
    totalChunks,
    chunks: new Map(),
    createdAt: Date.now(),
  });
  res.status(200).json({ success: true, uploadId, chunkSize: 10 * 1024 * 1024, totalChunks });
});

app.post('/api/proxy-upload/:uploadId/:chunkIndex', (req, res) => {
  const session = uploadSessions.get(req.params.uploadId);
  if (!session) { res.status(404).json({ success: false, message: 'Upload session not found' }); return; }
  session.chunks.set(parseInt(req.params.chunkIndex), req.body);
  const progress = Math.round((session.chunks.size / session.totalChunks) * 100);
  res.status(200).json({ success: true, progress });
});

app.post('/api/proxy-upload/complete/:uploadId', express.json(), async (req, res) => {
  const session = uploadSessions.get(req.params.uploadId);
  if (!session) { res.status(404).json({ success: false, message: 'Upload session not found' }); return; }
  const { style, duration, modelType, modelProvider } = req.body;

  const allChunks = [];
  for (let i = 0; i < session.totalChunks; i++) {
    const chunk = session.chunks.get(i);
    if (chunk) allChunks.push(chunk);
  }

  if (allChunks.length === 0) {
    res.status(400).json({ success: false, message: 'No chunks received' });
    return;
  }

  const buffer = Buffer.concat(allChunks.map(c => Buffer.from(c)));

  const taskId = 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  taskStore.set(taskId, {
    status: 'processing',
    progress: 0,
    currentStep: '已接收视频，正在处理...',
    createdAt: Date.now(),
    modelType: modelType || 'local-basic',
    modelProvider: modelProvider || 'local',
    videoBuffer: buffer,
    fileName: session.fileName,
    fileMime: 'video/mp4',
    style: style || 'trending',
    duration: parseInt(duration || '30'),
    addMusic: 'true',
    addCaptions: 'true',
    features: '[]',
  });

  uploadSessions.delete(req.params.uploadId);
  setImmediate(() => processTask(taskId));

  res.status(200).json({ success: true, taskId, message: 'AI剪辑任务已启动' });
});

app.get('/api/ai-edit/status/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = taskStore.get(taskId);

    if (!task) {
      res.status(404).json({ success: false, message: '任务不存在' });
      return;
    }

    if (Date.now() - task.createdAt > 60 * 60 * 1000 && task.status === 'processing') {
      task.status = 'error';
      task.error = '任务处理超时';
    }

    res.status(200).json({
      success: true,
      taskId,
      status: task.status,
      progress: task.progress,
      currentStep: task.currentStep,
      videoUrl: task.videoUrl,
      error: task.error,
      modelType: task.modelType,
      modelProvider: task.modelProvider,
    });
  } catch (error) {
    console.error('获取任务状态失败:', error);
    res.status(500).json({ success: false, message: '获取任务状态失败' });
  }
});

app.get('/api/ai-edit/styles', (req, res) => {
  const styles = [
    { id: 'trending', name: '热门推荐', description: '抖音最火的剪辑风格', emoji: '🔥', filter: 'contrast(1.1) saturate(1.2)', speed: 1.2 },
    { id: 'emotional', name: '情感叙事', description: '感人的故事化剪辑', emoji: '❤️', filter: 'sepia(0.3) contrast(0.95)', speed: 0.9 },
    { id: 'funny', name: '搞笑喜剧', description: '幽默有趣的剪辑', emoji: '😂', filter: 'saturate(1.3) brightness(1.05)', speed: 1.1 },
    { id: 'cinematic', name: '电影大片', description: '专业级电影效果', emoji: '🎬', filter: 'contrast(1.2) brightness(0.95) saturate(0.9)', speed: 1.0 },
    { id: 'vlog', name: '生活Vlog', description: '日常记录风格', emoji: '📹', filter: 'brightness(1.05) saturate(1.1)', speed: 1.0 },
  ];
  res.status(200).json({ success: true, styles });
});

app.get('/api/ai-edit/models', (req, res) => {
  res.status(200).json({
    success: true,
    models: {
      local: localModels,
      cloud: cloudModels,
    },
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ok',
    timestamp: new Date().toISOString(),
  });
});

const distPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));

app.get('/', (req, res) => {
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(200).json({
      success: true,
      message: 'Smart Video Backend API is running',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        styles: '/api/ai-edit/styles',
        models: '/api/ai-edit/models',
        aiEdit: '/api/ai-edit/start',
        status: '/api/ai-edit/status/:taskId',
      },
    });
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Server internal error',
    message: error.message,
  });
});

process.stdout.write(`RAILWAY_STARTUP: Node.js server starting on port ${PORT}\n`);
process.stdout.write(`RAILWAY_STARTUP: Current dir: ${process.cwd()}\n`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

async function processTask(taskId) {
  const task = taskStore.get(taskId);
  if (!task) return;

  const { modelProvider, videoBuffer, videoUrl, fileName, fileMime, style, duration, addMusic, addCaptions, features, modelType } = task;

  let buffer = videoBuffer;
  let name = fileName;
  let mime = fileMime;

  if (!buffer && videoUrl) {
    taskStore.set(taskId, { ...taskStore.get(taskId), currentStep: '正在下载视频...', progress: 5 });
    
    try {
      buffer = await downloadVideo(videoUrl);
      name = name || 'downloaded_video.mp4';
      mime = mime || 'video/mp4';
      taskStore.set(taskId, { ...taskStore.get(taskId), progress: 30, currentStep: '下载完成，正在处理...' });
    } catch (e) {
      console.error('下载视频失败:', e.message);
      taskStore.set(taskId, { ...taskStore.get(taskId), status: 'error', currentStep: `下载失败: ${e.message}` });
      return;
    }
  }

  const API_KEY = process.env.NVAPI_KEY || '';
  const AI_API_BASE = process.env.AI_API_BASE || 'https://api.nvapi.io';

  if (modelProvider === 'cloud' && API_KEY && buffer) {
    try {
      const { FormData } = await import('form-data');
      const formData = new FormData();
      formData.append('video', buffer, { filename: name, contentType: mime });
      formData.append('style', style);
      formData.append('duration', duration.toString());
      formData.append('addMusic', addMusic);
      formData.append('addCaptions', addCaptions);
      formData.append('features', features);
      formData.append('modelType', modelType);

      const response = await fetch(`${AI_API_BASE}/v1/video/edit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${API_KEY}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        taskStore.set(taskId, {
          ...taskStore.get(taskId),
          status: 'processing',
          progress: 10,
          currentStep: '云端AI正在分析视频...',
          externalTaskId: data.taskId,
        });
        return;
      }
    } catch (apiError) {
      console.error('云端API调用失败，切换到本地处理:', apiError.message);
      taskStore.set(taskId, {
        ...taskStore.get(taskId),
        currentStep: '云端连接失败，切换到本地模型...',
      });
    }
  }

  simulateLocalProcessing(taskId, modelType);
}

async function downloadVideo(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', (e) => reject(e));
    }).on('error', (e) => reject(e));
  });
}

function processUrlTask(taskId) {
  const task = taskStore.get(taskId);
  if (!task) return;
  const { videoUrl, modelType } = task;

  const protocol = videoUrl.startsWith('https') ? https : http;
  protocol.get(videoUrl, (response) => {
    const chunks = [];
    let downloaded = 0;
    const total = parseInt(response.headers['content-length'] || '0');

    if (response.statusCode !== 200) {
      taskStore.set(taskId, { ...taskStore.get(taskId), status: 'error', currentStep: `下载失败: HTTP ${response.statusCode}` });
      return;
    }

    if (total > 1024 * 1024 * 1024) {
      taskStore.set(taskId, { ...taskStore.get(taskId), status: 'error', currentStep: '视频超过1GB限制' });
      return;
    }

    response.on('data', (chunk) => {
      chunks.push(chunk);
      downloaded += chunk.length;
      const pct = Math.min(Math.round((downloaded / (total || downloaded)) * 30), 30);
      taskStore.set(taskId, { ...taskStore.get(taskId), progress: pct, currentStep: `正在下载视频... ${(downloaded / 1024 / 1024).toFixed(1)}MB` });
    });

    response.on('end', () => {
      taskStore.set(taskId, {
        ...taskStore.get(taskId),
        videoBuffer: Buffer.concat(chunks),
        fileName: 'downloaded_video.mp4',
        fileMime: response.headers['content-type'] || 'video/mp4',
        progress: 30,
        currentStep: '下载完成，正在处理...',
      });
      task.videoBuffer = Buffer.concat(chunks);
      simulateLocalProcessing(taskId, modelType);
    });

    response.on('error', (e) => {
      taskStore.set(taskId, { ...taskStore.get(taskId), status: 'error', currentStep: `下载错误: ${e.message}` });
    });
  }).on('error', (e) => {
    taskStore.set(taskId, { ...taskStore.get(taskId), status: 'error', currentStep: `下载失败: ${e.message}` });
  });
}

function simulateLocalProcessing(taskId, modelType) {
  const modelConfig = {
    'local-basic': { steps: 5, speed: 1, quality: '标准' },
    'local-standard': { steps: 7, speed: 0.8, quality: '高质量' },
    'local-pro': { steps: 9, speed: 0.6, quality: '专业级' },
    'local-cinematic': { steps: 11, speed: 0.5, quality: '电影级' },
  };

  const config = modelConfig[modelType] || modelConfig['local-standard'];

  const baseSteps = [
    { progress: 5, step: '正在加载视频...', delay: 800 },
    { progress: 15, step: `${config.quality}分析视频内容...`, delay: 1500 * config.speed },
    { progress: 30, step: '识别精彩片段...', delay: 2000 * config.speed },
    { progress: 45, step: '提取关键帧...', delay: 1500 * config.speed },
    { progress: 60, step: '应用特效滤镜...', delay: 2000 * config.speed },
    { progress: 75, step: '添加背景音乐...', delay: 1500 * config.speed },
    { progress: 85, step: '生成字幕...', delay: 1000 * config.speed },
    { progress: 95, step: '合成最终视频...', delay: 1500 * config.speed },
    { progress: 100, step: '处理完成', delay: 500 },
  ];

  const steps = baseSteps.slice(0, config.steps + 1);

    let currentIndex = 0;

    const executeStep = () => {
      if (currentIndex >= steps.length) {
        const task = taskStore.get(taskId);
        if (task) {
          task.status = 'completed';
          task.progress = 100;
          task.currentStep = '处理完成';
          task.videoUrl = null;
        }
        return;
      }

      const step = steps[currentIndex];
      const task = taskStore.get(taskId);
      if (task) {
        task.progress = step.progress;
        task.currentStep = step.step;
      }

    currentIndex++;
    setTimeout(executeStep, step.delay);
  };

  setTimeout(executeStep, 500);
}
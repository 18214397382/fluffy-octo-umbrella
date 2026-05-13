import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

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
  limits: { fileSize: 1024 * 1024 * 1024 },
  storage: multer.memoryStorage()
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

    taskStore.set(taskId, {
      status: 'processing',
      progress: 0,
      currentStep: '正在初始化...',
      createdAt: Date.now(),
      modelType,
      modelProvider,
    });

    const API_KEY = process.env.NVAPI_KEY || '';
    const AI_API_BASE = process.env.AI_API_BASE || 'https://api.nvapi.io';

    if (modelProvider === 'cloud' && API_KEY) {
      try {
        const { FormData } = await import('form-data');
        const formData = new FormData();
        formData.append('video', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });
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
            currentStep: '云端AI正在分析视频...'
          });
          res.status(200).json({
            success: true,
            taskId,
            message: '云端AI剪辑任务已启动',
            modelProvider: 'cloud',
            modelType,
            externalTaskId: data.taskId
          });
          return;
        }
      } catch (apiError) {
        console.error('云端API调用失败，切换到本地处理:', apiError.message);
        taskStore.set(taskId, {
          ...taskStore.get(taskId),
          currentStep: '云端连接失败，切换到本地模型...'
        });
      }
    }

    simulateLocalProcessing(taskId, req.file, modelType);
    res.status(200).json({
      success: true,
      taskId,
      message: '本地AI剪辑任务已启动',
      modelProvider: 'local',
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

function simulateLocalProcessing(taskId, file, modelType) {
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
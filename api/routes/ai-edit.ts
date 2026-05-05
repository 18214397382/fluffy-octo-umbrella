import express, { type Request, type Response } from 'express'
import multer from 'multer'

const router = express.Router()
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } })

const API_KEY = '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'
const AI_API_BASE = 'https://api.nvapi.io'

type AIClipStyle = 'trending' | 'emotional' | 'funny' | 'cinematic' | 'vlog'

interface AIEditRequest {
  video: File
  style: AIClipStyle
  duration: number
  addMusic: boolean
  addCaptions: boolean
}

interface AIEditResponse {
  success: boolean
  taskId?: string
  message?: string
  progress?: number
  videoUrl?: string
}

router.post('/start', upload.single('video'), async (req: any, res: Response): Promise<void> => {
  try {
    const { style = 'trending', duration = 30, addMusic = true, addCaptions = true } = req.body

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: '视频文件是必需的',
      })
      return
    }

    const formData = new FormData()
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype })
    formData.append('video', blob, req.file.originalname)
    formData.append('style', style)
    formData.append('duration', duration.toString())
    formData.append('addMusic', addMusic.toString())
    formData.append('addCaptions', addCaptions.toString())

    const taskId = 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

    res.status(200).json({
      success: true,
      taskId,
      message: 'AI剪辑任务已启动',
    })
  } catch (error) {
    console.error('AI剪辑启动失败:', error)
    res.status(500).json({
      success: false,
      message: '启动AI剪辑失败',
    })
  }
})

router.get('/status/:taskId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params

    const progressData = simulateProgress(taskId)

    res.status(200).json({
      success: true,
      taskId,
      ...progressData,
    })
  } catch (error) {
    console.error('获取任务状态失败:', error)
    res.status(500).json({
      success: false,
      message: '获取任务状态失败',
    })
  }
})

router.get('/styles', (_req: Request, res: Response): void => {
  const styles = [
    { id: 'trending', name: '热门推荐', description: '抖音最火的剪辑风格', emoji: '🔥' },
    { id: 'emotional', name: '情感叙事', description: '感人的故事化剪辑', emoji: '❤️' },
    { id: 'funny', name: '搞笑喜剧', description: '幽默有趣的剪辑', emoji: '😂' },
    { id: 'cinematic', name: '电影大片', description: '专业级电影效果', emoji: '🎬' },
    { id: 'vlog', name: '生活Vlog', description: '日常记录风格', emoji: '📹' },
  ]

  res.status(200).json({
    success: true,
    styles,
  })
})

router.post('/simulate-edit', async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoUrl, style, duration, addMusic, addCaptions } = req.body

    const processingSteps = [
      { step: 1, name: '智能分析视频内容', progress: 20 },
      { step: 2, name: '提取精彩片段', progress: 40 },
      { step: 3, name: '应用' + getStyleName(style) + '风格', progress: 60 },
      { step: 4, name: '添加背景音乐', progress: 80 },
      { step: 5, name: '生成自动字幕', progress: 90 },
      { step: 6, name: '最终优化渲染', progress: 100 },
    ]

    for (const step of processingSteps) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    res.status(200).json({
      success: true,
      message: 'AI剪辑完成',
      videoUrl,
    })
  } catch (error) {
    console.error('模拟剪辑失败:', error)
    res.status(500).json({
      success: false,
      message: '剪辑失败',
    })
  }
})

function getStyleName(style: string): string {
  const names: Record<string, string> = {
    trending: '热门推荐',
    emotional: '情感叙事',
    funny: '搞笑喜剧',
    cinematic: '电影大片',
    vlog: '生活Vlog',
  }
  return names[style] || '特效'
}

function simulateProgress(taskId: string): {
  progress: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  currentStep?: string
  videoUrl?: string
} {
  const cached = progressCache.get(taskId)
  const now = Date.now()

  if (!cached) {
    const startTime = now
    const duration = 5000
    progressCache.set(taskId, { startTime, duration })
    return { progress: 0, status: 'processing', currentStep: '初始化AI模型...' }
  }

  const elapsed = now - cached.startTime
  let progress = Math.min(Math.floor((elapsed / cached.duration) * 100), 100)

  let currentStep = '处理中...'
  if (progress < 20) currentStep = '智能分析视频内容'
  else if (progress < 40) currentStep = '提取精彩片段'
  else if (progress < 60) currentStep = '应用特效滤镜'
  else if (progress < 80) currentStep = '添加背景音乐'
  else if (progress < 95) currentStep = '生成自动字幕'
  else currentStep = '最终优化渲染'

  let status: 'processing' | 'completed' = 'processing'
  let videoUrl: string | undefined

  if (progress === 100) {
    status = 'completed'
    videoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  }

  return { progress, status, currentStep, videoUrl }
}

const progressCache = new Map<string, { startTime: number; duration: number }>()

export default router

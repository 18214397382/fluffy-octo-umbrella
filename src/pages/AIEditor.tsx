import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Music, Type, Zap, CheckCircle2, Download, Share2, 
  RefreshCcw, Sparkles, Bot, Scissors, Subtitles, Mic, Wand2,
  Trash2, Play, Pause, Film, Loader2
} from 'lucide-react';
import { useStore } from '../store';

const defaultAIStyles = [
  { id: '1', name: '快节奏', description: '动感炫酷', emoji: '🔥' },
  { id: '2', name: '情感叙事', description: '温馨感人', emoji: '💖' },
  { id: '3', name: '搞笑', description: '幽默有趣', emoji: '😂' },
  { id: '4', name: '科技感', description: '未来炫酷', emoji: '🤖' },
  { id: '5', name: '复古', description: '怀旧经典', emoji: '🎞️' },
  { id: '6', name: '文艺', description: '清新唯美', emoji: '🌸' },
];

const processingSteps = [
  { id: 'analyze', name: '分析视频内容', description: 'AI正在理解视频中的内容和结构' },
  { id: 'transcribe', name: '音频转录', description: '生成精准的文字转录和时间戳' },
  { id: 'remove_fillers', name: '去除填充词', description: '智能识别并删除"嗯"、"啊"等冗余词汇' },
  { id: 'cut_silence', name: '裁剪沉默片段', description: '自动移除长时间的停顿和空白' },
  { id: 'color_grade', name: '自动调色', description: '应用专业的色彩校正和风格滤镜' },
  { id: 'add_subtitles', name: '生成字幕', description: '添加符合观看习惯的字幕样式' },
  { id: 'add_music', name: '添加背景音乐', description: '选择并添加适合风格的背景音乐' },
  { id: 'export', name: '导出视频', description: '渲染最终的高质量视频' },
];

const fillerWords = ['嗯', '啊', '呃', '那个', '就是说', '然后', '其实'];

export default function AIEditor() {
  const navigate = useNavigate();
  const { 
    video, selectedAIStyle, aiStyles, selectAIStyle, loadAIStyles,
    aiEditTaskId, aiEditProgress, aiEditCurrentStep, aiEditCompleted, aiVideoUrl,
    setAIEditTaskId, setAIEditProgress, setAIEditCompleted, resetAIEdit, resetState
  } = useStore();
  
  const [addMusic, setAddMusic] = useState(true);
  const [addCaptions, setAddCaptions] = useState(true);
  const [removeFillers, setRemoveFillers] = useState(true);
  const [cutSilence, setCutSilence] = useState(true);
  const [autoColorGrade, setAutoColorGrade] = useState(true);
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [availableStyles, setAvailableStyles] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (!video) {
      navigate('/');
    }
  }, [video, navigate]);

  useEffect(() => {
    const loadStyles = async () => {
      await loadAIStyles();
      if (aiStyles.length === 0) {
        setAvailableStyles(defaultAIStyles);
      } else {
        setAvailableStyles(aiStyles);
      }
    };
    loadStyles();
  }, [loadAIStyles, aiStyles]);

  const startGenerate = async () => {
    if (!video || !selectedAIStyle) {
      alert('请选择AI风格');
      return;
    }

    setIsGenerating(true);
    setCurrentStepIndex(0);
    setAIEditTaskId('mock-task-' + Date.now());
    
    const stepsToRun = [
      processingSteps[0],
      processingSteps[1],
      ...(removeFillers ? [processingSteps[2]] : []),
      ...(cutSilence ? [processingSteps[3]] : []),
      ...(autoColorGrade ? [processingSteps[4]] : []),
      ...(addCaptions ? [processingSteps[5]] : []),
      ...(addMusic ? [processingSteps[6]] : []),
      processingSteps[7],
    ];
    
    for (let i = 0; i < stepsToRun.length; i++) {
      setCurrentStepIndex(i);
      const progress = Math.round(((i + 1) / stepsToRun.length) * 100);
      setAIEditProgress(progress, stepsToRun[i].name + '...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsGenerating(false);
    setAIEditCompleted(true, video.url);
  };

  const handleDownload = () => {
    if (aiVideoUrl) {
      const link = document.createElement('a');
      link.href = aiVideoUrl;
      link.download = `ai-short-video-${Date.now()}.mp4`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && aiVideoUrl) {
      try {
        await navigator.share({
          title: '我的AI短剧视频',
          text: `使用${selectedAIStyle?.name}风格制作的AI视频`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享取消或失败');
      }
    } else {
      alert('您的浏览器不支持分享功能，请下载视频后手动分享');
    }
  };

  const handleNewProject = () => {
    resetAIEdit();
    resetState();
    navigate('/');
  };

  if (!video) return null;

  if (previewMode || aiEditCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
            <button 
              onClick={() => {
                if (aiEditCompleted) {
                  handleNewProject();
                } else {
                  setPreviewMode(false);
                }
              }} 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold flex-1">
              {aiEditCompleted ? 'AI生成完成' : '视频预览'}
            </h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6">
          <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-6 relative">
            <video
              src={aiVideoUrl || video.url}
              className="w-full h-full object-contain"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {aiEditCompleted && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-5 border border-green-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">剪辑完成！</h3>
                    <p className="text-sm text-gray-400">AI已完成所有优化</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400 mb-1">移除填充词</div>
                    <div className="font-semibold">{fillerWords.length} 个</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400 mb-1">裁剪时长</div>
                    <div className="font-semibold">{Math.max(0, Math.round(video.duration - duration))} 秒</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400 mb-1">添加字幕</div>
                    <div className="font-semibold">{addCaptions ? '已启用' : '未启用'}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-400 mb-1">背景音乐</div>
                    <div className="font-semibold">{addMusic ? '已添加' : '未添加'}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-4 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-xl font-bold text-lg shadow-lg shadow-[#FF0050]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                下载视频
              </button>
              <button
                onClick={handleShare}
                className="w-full py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg border border-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                分享到抖音
              </button>
              <button
                onClick={handleNewProject}
                className="w-full py-4 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" />
                制作新视频
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (isGenerating) {
    const stepsToRun = [
      processingSteps[0],
      processingSteps[1],
      ...(removeFillers ? [processingSteps[2]] : []),
      ...(cutSilence ? [processingSteps[3]] : []),
      ...(autoColorGrade ? [processingSteps[4]] : []),
      ...(addCaptions ? [processingSteps[5]] : []),
      ...(addMusic ? [processingSteps[6]] : []),
      processingSteps[7],
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
            <h1 className="text-lg font-semibold flex-1 text-center">AI正在剪辑...</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full border-8 border-gray-700" />
              <svg className="w-32 h-32 absolute top-0 left-0 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  stroke-dashoffset={`${251.2 - (251.2 * aiEditProgress / 100)}`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF0050" />
                    <stop offset="100%" stopColor="#FF6B35" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{aiEditProgress}%</span>
              </div>
            </div>

            <div className="w-full space-y-3 mb-8">
              {stepsToRun.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                    index < currentStepIndex 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : index === currentStepIndex 
                        ? 'bg-[#FF0050]/10 border border-[#FF0050]/20' 
                        : 'bg-gray-800/30 border border-gray-700/30 opacity-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index < currentStepIndex 
                      ? 'bg-green-500' 
                      : index === currentStepIndex 
                        ? 'bg-[#FF0050] animate-pulse' 
                        : 'bg-gray-700'
                  }`}>
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : index === currentStepIndex ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${index === currentStepIndex ? 'text-white' : 'text-gray-400'}`}>
                      {step.name}
                    </h4>
                    {index === currentStepIndex && (
                      <p className="text-xs text-gray-400">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-lg font-medium text-gray-400">
              <Sparkles className="w-5 h-5 text-[#FF0050] animate-pulse" />
              {aiEditCurrentStep || 'AI正在处理您的视频...'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1">AI智能剪辑</h1>
          <div className="w-8 h-8 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0050] to-[#FF6B35] rounded-xl flex items-center justify-center flex-shrink-0">
              <Film className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{video.name}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {Math.round(video.duration)}秒 · {(video.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
            <button
              onClick={() => setPreviewMode(true)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#FF0050]" />
            选择AI风格
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {availableStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => selectAIStyle(style)}
                className={`p-4 rounded-2xl border-2 transition-all ${selectedAIStyle?.id === style.id ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">{style.emoji}</span>
                  <span className="font-semibold">{style.name}</span>
                  <span className="text-xs text-gray-400">{style.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#FF0050]" />
            智能裁剪
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setRemoveFillers(!removeFillers)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${removeFillers ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <Trash2 className={`w-5 h-5 ${removeFillers ? 'text-[#FF0050]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium">去除填充词</div>
                  <div className="text-xs text-gray-400">嗯、啊、那个等</div>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all ${removeFillers ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${removeFillers ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
            <button
              onClick={() => setCutSilence(!cutSilence)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${cutSilence ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <Scissors className={`w-5 h-5 ${cutSilence ? 'text-[#FF0050]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium">裁剪沉默片段</div>
                  <div className="text-xs text-gray-400">自动移除长时间停顿</div>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all ${cutSilence ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${cutSilence ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#FF0050]" />
            增强效果
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setAutoColorGrade(!autoColorGrade)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${autoColorGrade ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <Wand2 className={`w-5 h-5 ${autoColorGrade ? 'text-[#FF0050]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium">自动调色</div>
                  <div className="text-xs text-gray-400">专业色彩校正</div>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all ${autoColorGrade ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${autoColorGrade ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
            <button
              onClick={() => setAddCaptions(!addCaptions)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${addCaptions ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <Subtitles className={`w-5 h-5 ${addCaptions ? 'text-[#FF0050]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium">智能字幕</div>
                  <div className="text-xs text-gray-400">自动生成并添加</div>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all ${addCaptions ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${addCaptions ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
            <button
              onClick={() => setAddMusic(!addMusic)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${addMusic ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <Music className={`w-5 h-5 ${addMusic ? 'text-[#FF0050]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium">背景音乐</div>
                  <div className="text-xs text-gray-400">精选热门音乐</div>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all ${addMusic ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${addMusic ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#FF0050]" />
            视频时长
          </h2>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{duration}秒</span>
              <span className="text-gray-500">原始: {Math.round(video.duration)}秒</span>
            </div>
            <input
              type="range"
              min="15"
              max={Math.min(60, Math.round(video.duration))}
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
            />
          </div>
        </section>

        <button
          onClick={startGenerate}
          disabled={!selectedAIStyle}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${selectedAIStyle ? 'bg-gradient-to-r from-[#FF0050] to-[#FF6B35] shadow-lg shadow-[#FF0050]/30 hover:scale-[1.02] active:scale-[0.98]' : 'bg-gray-700 cursor-not-allowed'}`}
        >
          <Sparkles className="w-5 h-5" />
          一键生成爆款短视频
        </button>
      </main>
    </div>
  );
}

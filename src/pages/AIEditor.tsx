import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Type, Zap, CheckCircle2, Download, Share2, RefreshCcw, Sparkles, Bot } from 'lucide-react';
import { useStore } from '../store';

export default function AIEditor() {
  const navigate = useNavigate();
  const { 
    video, selectedAIStyle, aiStyles, selectAIStyle,
    aiEditTaskId, aiEditProgress, aiEditCurrentStep, aiEditCompleted, aiVideoUrl,
    setAIEditTaskId, setAIEditProgress, setAIEditCompleted, resetAIEdit, resetState
  } = useStore();
  
  const [addMusic, setAddMusic] = useState(true);
  const [addCaptions, setAddCaptions] = useState(true);
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    if (!video) {
      navigate('/');
    }
  }, [video, navigate]);

  const startGenerate = async () => {
    if (!video || !selectedAIStyle) {
      alert('请选择AI风格');
      return;
    }

    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('video', video.file);
      formData.append('style', selectedAIStyle.id);
      formData.append('duration', duration.toString());
      formData.append('addMusic', addMusic.toString());
      formData.append('addCaptions', addCaptions.toString());

      const response = await fetch('/api/ai-edit/start', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.taskId) {
        setAIEditTaskId(data.taskId);
        pollProgress(data.taskId);
      } else {
        throw new Error('启动失败');
      }
    } catch (error) {
      console.error('生成失败', error);
      alert('生成失败，请重试');
      setIsGenerating(false);
    }
  };

  const pollProgress = (taskId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/ai-edit/status/${taskId}`);
        const data = await response.json();

        if (data.success) {
          setAIEditProgress(data.progress, data.currentStep || '处理中...');
          
          if (data.status === 'completed') {
            clearInterval(pollInterval);
            setIsGenerating(false);
            setAIEditCompleted(true, data.videoUrl || '');
          } else if (data.status === 'error') {
            clearInterval(pollInterval);
            setIsGenerating(false);
            alert('处理失败，请重试');
          }
        }
      } catch (error) {
        console.error('查询进度失败', error);
      }
    }, 500);
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

  if (isGenerating || aiEditTaskId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
            {!isGenerating && (
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-lg font-semibold flex-1">
              {isGenerating ? 'AI正在生成...' : 'AI编辑中'}
            </h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-8">
          {aiEditCompleted ? (
            <div className="flex flex-col items-center min-h-[60vh]">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-4">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">AI生成成功！</h2>
                <p className="text-gray-400 text-center">您的AI短剧视频已准备好</p>
              </div>

              <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-8">
                <video
                  src={aiVideoUrl || ''}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                />
              </div>

              <div className="w-full space-y-4">
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
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
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
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-lg font-medium">
                  <Sparkles className="w-5 h-5 text-[#FF0050] animate-pulse" />
                  {aiEditCurrentStep || 'AI正在处理您的视频...'}
                </div>
              </div>
            </div>
          )}
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

      <main className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">选择AI风格</h2>
          <div className="grid grid-cols-2 gap-4">
            {aiStyles.map((style) => (
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
          <h2 className="text-lg font-semibold mb-4">视频设置</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#FF0050]" />
                <span className="font-semibold">视频时长</span>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{duration}秒</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAddMusic(!addMusic)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${addMusic ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
              >
                <Music className="w-5 h-5" />
                <span>添加音乐</span>
              </button>
              <button
                onClick={() => setAddCaptions(!addCaptions)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${addCaptions ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
              >
                <Type className="w-5 h-5" />
                <span>智能字幕</span>
              </button>
            </div>
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

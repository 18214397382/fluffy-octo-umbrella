import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { 
  Wand2, Download, Share2, RefreshCw, ChevronLeft, Sparkles, Film, Clock, Zap, CheckCircle, Loader2,
  Cpu, Cloud
} from 'lucide-react';

const editingPhases = [
  { id: 'analyze', name: '智能分析', icon: Sparkles },
  { id: 'script', name: '文案生成', icon: Film },
  { id: 'storyboard', name: '脚本制作', icon: Clock },
  { id: 'synthesize', name: '视频合成', icon: Zap },
];

export default function AIEditor() {
  const navigate = useNavigate();
  const {
    video, selectedAIStyle, aiStyles, selectAIStyle, loadAIStyles,
    aiEditProgress, aiEditCurrentStep, aiEditCompleted, aiVideoUrl,
    startAIEdit, pollAIEditStatus,
    modelProvider, selectedModel, localModels, cloudModels,
    setModelProvider, selectModel, loadModels
  } = useStore();

  const [currentPhase, setCurrentPhase] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState(new Set(['clip', 'silence', 'subtitle']));
  const [processedFilter, setProcessedFilter] = useState('none');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) { navigate('/'); }
  }, [video, navigate]);

  useEffect(() => { 
    loadAIStyles(); 
    loadModels();
  }, [loadAIStyles, loadModels]);

  useEffect(() => {
    if (videoRef.current) { videoRef.current.playbackRate = playbackSpeed; }
  }, [playbackSpeed]);

  const toggleFeature = (feature: string) => {
    const newFeatures = new Set(activeFeatures);
    if (newFeatures.has(feature)) { newFeatures.delete(feature); }
    else { newFeatures.add(feature); }
    setActiveFeatures(newFeatures);
  };

  const handleStartAIEdit = async () => {
    if (!video || !selectedAIStyle || !selectedModel) { 
      alert('请先选择AI风格和模型'); 
      return; 
    }

    setIsProcessing(true);
    setCurrentPhase(0);

    const features = Array.from(activeFeatures);
    const taskId = await startAIEdit(video.file, selectedAIStyle.id, features);
    
    if (taskId) {
      setCurrentPhase(1);
      await pollAIEditStatus(taskId);
      setCurrentPhase(3);
      setProcessedFilter(selectedAIStyle.filter || 'none');
      setPlaybackSpeed(selectedAIStyle.speed || 1);
    }
    
    setIsProcessing(false);
  };

  const handleDownload = () => {
    const videoSrc = aiVideoUrl || video?.url;
    if (videoSrc) {
      const link = document.createElement('a');
      link.href = videoSrc;
      link.download = `ai-short-video-${Date.now()}.mp4`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && aiVideoUrl) {
      try {
        await navigator.share({
          title: '我的AI短剧视频',
          text: `使用${selectedModel?.name}制作的精彩视频`,
          url: window.location.href,
        });
      } catch (error) { console.log('分享取消或失败'); }
    } else { alert('您的浏览器不支持分享功能'); }
  };

  const handleNewProject = () => {
    navigate('/');
  };

  const currentModels = modelProvider === 'local' ? localModels : cloudModels;

  if (!video) return null;

  if (isProcessing && !aiEditCompleted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md w-full mx-4">
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{aiEditProgress}%</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">AI正在剪辑中...</h2>
            <p className="text-gray-400">{aiEditCurrentStep}</p>
            {selectedModel && (
              <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
                <span className="text-lg">{selectedModel.emoji}</span>
                <span className="text-sm text-gray-300">{selectedModel.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${modelProvider === 'cloud' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                  {modelProvider === 'cloud' ? '云端' : '本地'}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            {editingPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = index === currentPhase;
              const isCompleted = index < currentPhase;
              return (
                <div key={phase.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? 'bg-blue-500/20 border border-blue-500/50' : 
                  isCompleted ? 'bg-green-500/20 border border-green-500/50' : 
                  'bg-gray-800 border border-gray-700'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-green-400" /> : 
                   isActive ? <Loader2 className="w-5 h-5 text-blue-400 animate-spin" /> : 
                   <Icon className="w-5 h-5 text-gray-500" />}
                  <span className={isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}>
                    {phase.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (aiEditCompleted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ChevronLeft className="w-5 h-5" />返回首页
          </button>
          <h1 className="text-3xl font-bold mb-2">✨ AI剪辑完成！</h1>
          <p className="text-gray-400 mb-8">
            使用 {selectedModel?.emoji} {selectedModel?.name} · {selectedAIStyle?.name} 风格
          </p>

          <div className="bg-gray-800 rounded-2xl overflow-hidden mb-8">
            <video ref={videoRef} src={aiVideoUrl || video.url} className="w-full" style={{ filter: processedFilter !== 'none' ? processedFilter : undefined }} controls />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{aiEditProgress}%</div>
              <div className="text-sm text-gray-400">处理进度</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{selectedAIStyle?.name}</div>
              <div className="text-sm text-gray-400">剪辑风格</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{selectedModel?.name}</div>
              <div className="text-sm text-gray-400">AI模型</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium transition-all">
              <Download className="w-5 h-5" />下载视频
            </button>
            <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-all">
              <Share2 className="w-5 h-5" />分享
            </button>
            <button onClick={handleNewProject} className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-medium transition-all">
              <RefreshCw className="w-5 h-5" />新项目
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ChevronLeft className="w-5 h-5" />返回首页
        </button>

        <h1 className="text-3xl font-bold mb-2">🎬 AI智能剪辑</h1>
        <p className="text-gray-400 mb-8">选择剪辑风格和AI模型，让AI帮你自动生成精彩视频</p>

        <div className="bg-gray-800 rounded-2xl p-4 mb-8">
          <video src={video.url} className="w-full rounded-xl" controls />
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">{video.name}</p>
            <p className="text-gray-500 text-xs">{Math.round(video.duration)}秒 · {(video.size / (1024 * 1024)).toFixed(2)}MB</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setModelProvider('local')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                modelProvider === 'local' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-gray-800 text-gray-400'
              }`}
            >
              <Cpu className="w-4 h-4" />本地模型
            </button>
            <button 
              onClick={() => setModelProvider('cloud')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                modelProvider === 'cloud' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-gray-800 text-gray-400'
              }`}
            >
              <Cloud className="w-4 h-4" />云端模型
            </button>
          </div>

          <h3 className="font-medium mb-3">选择AI模型</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentModels.map((model) => (
              <button
                key={model.id}
                onClick={() => selectModel(model)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedModel?.id === model.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl block mb-2">{model.emoji}</span>
                <p className="font-medium text-sm">{model.name}</p>
                <p className="text-xs text-gray-400">{model.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium mb-3">选择剪辑风格</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {aiStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => selectAIStyle(style)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedAIStyle?.id === style.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl block mb-2">{style.emoji}</span>
                <p className="font-medium text-sm">{style.name}</p>
                <p className="text-xs text-gray-400">{style.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium mb-3">功能选项</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'clip', name: '智能裁剪', description: '去除冗余内容' },
              { id: 'silence', name: '静音检测', description: '自动去除静音' },
              { id: 'subtitle', name: '自动字幕', description: '生成字幕' },
            ].map((feature) => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  activeFeatures.has(feature.id)
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <p className="font-medium text-sm">{feature.name}</p>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartAIEdit}
          disabled={!selectedAIStyle || !selectedModel}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
            selectedAIStyle && selectedModel
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Wand2 className="w-5 h-5" />开始AI剪辑
        </button>
      </div>
    </div>
  );
}

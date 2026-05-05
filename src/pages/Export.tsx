import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, RefreshCcw, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';

export default function Export() {
  const navigate = useNavigate();
  const { 
    video, selectedTemplate, exportProgress, setExportProgress, 
    setProcessing, resetState 
  } = useStore();
  const [exportStatus, setExportStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!video || !selectedTemplate) {
      navigate('/');
      return;
    }
    simulateExport();
  }, []);

  const simulateExport = async () => {
    try {
      setExportStatus('processing');
      const totalSteps = 10;
      for (let i = 0; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setExportProgress((i / totalSteps) * 100);
      }
      setExportStatus('completed');
      setProcessing(false);
    } catch (err) {
      setExportStatus('error');
      setError('导出失败，请重试');
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video?.url || '';
    link.download = 'short-video-' + Date.now() + '.mp4';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share && selectedTemplate) {
      try {
        await navigator.share({
          title: '我的短剧视频',
          text: `使用${selectedTemplate.name}模板制作的视频`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('分享取消或失败');
      }
    } else {
      alert('您的浏览器不支持分享功能，请下载视频后手动分享');
    }
  };

  const handleNewProject = () => {
    resetState();
    navigate('/');
  };

  if (!video || !selectedTemplate) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          {exportStatus === 'processing' && (
            <button onClick={() => navigate('/editor')} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-lg font-semibold flex-1">
            {exportStatus === 'processing' ? '正在导出...' : '导出完成'}
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {exportStatus === 'processing' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full border-8 border-gray-700" />
              <svg
                className="w-32 h-32 absolute top-0 left-0 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF0050" />
                    <stop offset="100%" stopColor="#FF6B35" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  stroke-dashoffset={`${251.2 - (251.2 * exportProgress / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{Math.round(exportProgress)}%</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-lg font-medium">
                <Sparkles className="w-5 h-5 text-[#FF0050] animate-pulse" />
                正在处理您的视频...
              </div>
              <p className="text-gray-400">
                {exportProgress < 30 ? '加载视频资源' :
                 exportProgress >= 30 && exportProgress < 60 ? '应用模板效果' :
                 exportProgress >= 60 && exportProgress < 90 ? '渲染视频' : '最后优化中'
                }
              </p>
            </div>
          </div>
        )}

        {exportStatus === 'completed' && (
          <div className="flex flex-col items-center min-h-[60vh]">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-4">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">导出成功！</h2>
              <p className="text-gray-400 text-center">您的短剧视频已准备好</p>
            </div>

            <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-8">
              <video src={video?.url} className="w-full h-full object-contain" controls autoPlay loop />
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={handleDownload}
                className="w-full py-4 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-xl font-bold text-lg shadow-lg shadow-[#FF0050]/30 hover:shadow-[#FF0050]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
        )}

        {exportStatus === 'error' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">😅</span>
            </div>
            <h2 className="text-xl font-bold mb-2">导出失败</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={simulateExport}
              className="px-6 py-3 bg-[#FF0050] rounded-xl font-semibold hover:bg-[#FF1A60] transition-colors"
            >
              重试
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

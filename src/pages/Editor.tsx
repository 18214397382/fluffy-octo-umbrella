import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scissors, Palette, Music, Zap, Play, Pause } from 'lucide-react';
import { useStore } from '../store';

export default function Editor() {
  const navigate = useNavigate();
  const { 
    video, selectedTemplate, editParams, updateEditParams, setProcessing 
  } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!video || !selectedTemplate) {
      navigate('/');
    }
  }, [video, selectedTemplate, navigate]);

  useEffect(() => {
    if (video) {
      updateEditParams({ endTime: Math.min(60, video.duration) });
    }
  }, [video, updateEditParams]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleExport = () => {
    setProcessing(true);
    navigate('/export');
  };

  if (!video || !selectedTemplate) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1">编辑视频</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <section>
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16]">
            <video
              ref={videoRef}
              src={video?.url}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </div>
            </button>
          </div>

          <div className="mt-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={selectedTemplate?.thumbnail}
                alt={selectedTemplate?.name}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{selectedTemplate?.name}</p>
                <p className="text-sm text-gray-400">{selectedTemplate?.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-[#FF0050]" />
              <h3 className="font-semibold">裁剪时长</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>开始时间</span>
                  <span>{editParams.startTime.toFixed(1)}秒</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={video?.duration - 1 || 0}
                  step="0.1"
                  value={editParams.startTime}
                  onChange={(e) => updateEditParams({ startTime: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>结束时间</span>
                  <span>{editParams.endTime.toFixed(1)}秒</span>
                </div>
                <input
                  type="range"
                  min={editParams.startTime + 1}
                  max={video?.duration || 0}
                  step="0.1"
                  value={editParams.endTime}
                  onChange={(e) => updateEditParams({ endTime: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#FF0050]" />
              <h3 className="font-semibold">播放速度</h3>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => updateEditParams({ speed })}
                  className={`py-2 rounded-lg font-medium text-sm transition-all ${editParams.speed === speed ? 'bg-[#FF0050] text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-[#FF0050]" />
              <h3 className="font-semibold">画面比例</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { ratio: '9:16', label: '竖屏' },
                { ratio: '16:9', label: '横屏' },
                { ratio: '1:1', label: '方形' }
              ].map(({ ratio, label }) => (
                <button
                  key={ratio}
                  onClick={() => updateEditParams({ aspectRatio: ratio as any })}
                  className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all ${editParams.aspectRatio === ratio ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <div
                    className={`border-2 border-current rounded ${ratio === '9:16' ? 'w-6 h-10' : ''} ${ratio === '16:9' ? 'w-10 h-6' : ''} ${ratio === '1:1' ? 'w-8 h-8' : ''}`}
                  />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-[#FF0050]" />
              <h3 className="font-semibold">转场效果</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {selectedTemplate?.transitions.map((transition) => (
                <button
                  key={transition}
                  onClick={() => updateEditParams({ transition })}
                  className={`py-3 rounded-lg font-medium text-sm capitalize transition-all ${editParams.transition === transition ? 'bg-[#FF0050] text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {transition}
                </button>
              ))}
            </div>
          </div>
        </section>

        <button
          onClick={handleExport}
          className="w-full py-4 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-xl font-bold text-lg shadow-lg shadow-[#FF0050]/30 hover:shadow-[#FF0050]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          一键生成短剧
        </button>
      </main>
    </div>
  );
}

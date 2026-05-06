import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scissors, Palette, Music, Zap, Play, Pause, Type, Sparkles, Wand2, Eye, Filter, Upload, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';

const musicTracks = [
  { id: '1', name: '动感电子', duration: '30秒', vibe: '🔥' },
  { id: '2', name: '温馨抒情', duration: '45秒', vibe: '💖' },
  { id: '3', name: '复古摇滚', duration: '25秒', vibe: '🎸' },
  { id: '4', name: '轻松愉悦', duration: '35秒', vibe: '😊' },
  { id: '5', name: '大气史诗', duration: '40秒', vibe: '🎬' },
  { id: '6', name: '嘻哈节奏', duration: '28秒', vibe: '🎤' },
];

const filters = [
  { id: 'none', name: '原图', effect: 'none' },
  { id: 'vibrant', name: '鲜艳', effect: 'brightness(1.1) saturate(1.3)' },
  { id: 'warm', name: '温暖', effect: 'sepia(0.3) brightness(1.05)' },
  { id: 'cool', name: '冷色调', effect: 'hue-rotate(20deg) saturate(0.9)' },
  { id: 'retro', name: '复古', effect: 'sepia(0.5) contrast(1.1) brightness(0.95)' },
  { id: 'cinematic', name: '电影感', effect: 'contrast(1.2) brightness(0.9) saturate(0.9)' },
];

export default function Editor() {
  const navigate = useNavigate();
  const { 
    video, selectedTemplate, editParams, updateEditParams, setProcessing 
  } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [autoCut, setAutoCut] = useState(true);
  const [addSubtitles, setAddSubtitles] = useState(true);
  const [activeTab, setActiveTab] = useState<'trim' | 'filter' | 'music' | 'text'>('trim');

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleExport = () => {
    setProcessing(true);
    navigate('/export');
  };

  if (!video || !selectedTemplate) return null;

  const selectedFilterData = filters.find(f => f.id === selectedFilter);
  const videoStyle = selectedFilterData && selectedFilterData.effect !== 'none' 
    ? { filter: selectedFilterData.effect, transition: 'filter 0.3s ease' }
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1">编辑视频</h1>
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#FF0050]" />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Video Preview */}
        <section>
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] shadow-2xl">
            <video
              ref={videoRef}
              src={video?.url}
              className="w-full h-full object-contain"
              style={videoStyle}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
            >
              <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20">
                {isPlaying ? (
                  <Pause className="w-10 h-10 fill-current" />
                ) : (
                  <Play className="w-10 h-10 fill-current ml-1" />
                )}
              </div>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(video.duration)}</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF0050] to-[#FF6B35] transition-all duration-100"
                style={{ width: `${(currentTime / video.duration) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-800/30 p-1 rounded-xl">
          {[
            { id: 'trim', icon: Scissors, label: '裁剪' },
            { id: 'filter', icon: Palette, label: '滤镜' },
            { id: 'music', icon: Music, label: '音乐' },
            { id: 'text', icon: Type, label: '文字' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-[#FF0050] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 min-h-[300px]">
          {activeTab === 'trim' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#FF0050]" />
                  裁剪视频
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-xl">
                    <span>智能去除空白</span>
                    <button
                      onClick={() => setAutoCut(!autoCut)}
                      className={`w-14 h-7 rounded-full transition-all relative ${autoCut ? 'bg-[#FF0050]' : 'bg-gray-700'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${autoCut ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
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
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
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
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF0050]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FF0050]" />
                  播放速度
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => updateEditParams({ speed })}
                      className={`py-3 rounded-lg font-semibold text-sm transition-all ${editParams.speed === speed ? 'bg-gradient-to-r from-[#FF0050] to-[#FF6B35] text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'filter' && (
            <div className="space-y-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#FF0050]" />
                选择滤镜
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`aspect-square rounded-xl border-2 transition-all overflow-hidden ${selectedFilter === filter.id ? 'border-[#FF0050]' : 'border-gray-700 hover:border-gray-500'}`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                      <div 
                        className="w-full h-16 rounded-lg mb-2 bg-gradient-to-br from-purple-500 to-pink-500"
                        style={filter.effect !== 'none' ? { filter: filter.effect } : {}}
                      />
                      <span className="text-xs font-medium">{filter.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-[#FF0050]" />
                背景音乐
              </h3>
              <div className="space-y-3">
                {musicTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedMusic(selectedMusic === track.id ? null : track.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedMusic === track.id ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/30 hover:border-gray-500'}`}
                  >
                    <div className="text-2xl">{track.vibe}</div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{track.name}</div>
                      <div className="text-xs text-gray-400">{track.duration}</div>
                    </div>
                    {selectedMusic === track.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#FF0050]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5 text-[#FF0050]" />
                  字幕设置
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-xl">
                    <span>自动生成字幕</span>
                    <button
                      onClick={() => setAddSubtitles(!addSubtitles)}
                      className={`w-14 h-7 rounded-full transition-all relative ${addSubtitles ? 'bg-[#FF0050]' : 'bg-gray-700'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${addSubtitles ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-400 mb-3">字幕样式</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['经典', '霓虹', '简约'].map((style, idx) => (
                        <button
                          key={idx}
                          className={`py-3 rounded-lg text-sm font-medium transition-all ${idx === 0 ? 'bg-[#FF0050] text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#FF0050]" />
                  画面比例
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { ratio: '9:16', label: '竖屏' },
                    { ratio: '16:9', label: '横屏' },
                    { ratio: '1:1', label: '方形' }
                  ].map(({ ratio, label }) => (
                    <button
                      key={ratio}
                      onClick={() => updateEditParams({ aspectRatio: ratio as any })}
                      className={`flex flex-col items-center gap-2 py-5 rounded-xl border-2 transition-all ${editParams.aspectRatio === ratio ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 hover:border-gray-600'}`}
                    >
                      <div
                        className={`border-2 border-current rounded ${ratio === '9:16' ? 'w-8 h-14' : ''} ${ratio === '16:9' ? 'w-14 h-8' : ''} ${ratio === '1:1' ? 'w-10 h-10' : ''}`}
                      />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleExport}
          className="w-full py-5 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-xl font-bold text-lg shadow-lg shadow-[#FF0050]/30 hover:shadow-[#FF0050]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Sparkles className="w-6 h-6" />
          一键生成短剧
        </button>
      </main>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

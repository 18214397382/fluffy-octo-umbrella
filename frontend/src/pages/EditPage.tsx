import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, SkipBack, SkipForward, Languages } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function EditPage() {
  const navigate = useNavigate();
  const { project } = useProject();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [subtitles, _setSubtitles] = useState<{start: number; end: number; text: string}[]>([]);
  const [translatedSubtitles, setTranslatedSubtitles] = useState<{start: number; end: number; text: string}[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (project?.videoUrl && videoRef.current) {
      videoRef.current.src = project.videoUrl;
    }
  }, [project?.videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-red-500 rounded-lg">
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-gray-400">
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>
        <h1 className="text-lg font-bold">视频预览</h1>
        <button onClick={() => navigate('/ai-analysis')} className="flex items-center gap-1 text-red-500">
          AI分析
          <ChevronRight className="w-5 h-5" />
        </button>
      </header>

      <div className="bg-black rounded-xl overflow-hidden aspect-video mb-2 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        )}
        {(showTranslation ? translatedSubtitles : subtitles).map((sub, i) => {
          if (currentTime >= sub.start && currentTime <= sub.end) {
            return (
              <div key={i} className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm max-w-[90%] text-center">
                  {sub.text}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            if (!showTranslation) {
              setIsTranslating(true);
              setTimeout(() => {
                setTranslatedSubtitles(subtitles.map(s => ({
                  ...s,
                  text: '英语: ' + s.text + '\n中文: [翻译中...]'
                })));
                setIsTranslating(false);
              }, 1000);
            }
            setShowTranslation(!showTranslation);
          }}
          disabled={isTranslating}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
            showTranslation
              ? 'bg-red-500 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          <Languages className="w-4 h-4" />
          {isTranslating ? '翻译中...' : showTranslation ? '原文' : '翻译'}
        </button>
        <span className="text-xs text-gray-500">
          {subtitles.length > 0 ? `${subtitles.length}条字幕` : ''}
        </span>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="w-full accent-red-500"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={() => handleSeek(Math.max(0, currentTime - 10))} className="p-3 bg-gray-700 rounded-full">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={togglePlay} className="p-4 bg-red-500 rounded-full">
            <Play className="w-6 h-6" />
          </button>
          <button onClick={() => handleSeek(Math.min(duration, currentTime + 10))} className="p-3 bg-gray-700 rounded-full">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <button onClick={() => navigate('/ai-analysis')} className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-bold">
          开始AI智能剪辑
        </button>
        <button onClick={() => navigate('/export')} className="w-full py-4 bg-gray-700 rounded-xl font-bold">
          导出视频
        </button>
      </div>
    </div>
  );
}

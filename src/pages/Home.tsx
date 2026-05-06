import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, Play, Zap, Film, Clapperboard, Star, TrendingUp, Smile, Music, X, Wand2, Scissors, Subtitles, Palette, Mic, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export default function Home() {
  const navigate = useNavigate();
  const { setVideo, setSelectedTemplate, templates, loadTemplates, video } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      const tempVideo = document.createElement('video');
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {
        setVideo({
          file,
          url,
          name: file.name,
          duration: tempVideo.duration,
          size: file.size
        });
      };
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    navigate('/editor');
  };

  const handleAIEdit = () => {
    navigate('/ai-editor');
  };

  const handleStartEdit = () => {
    if (templates.length > 0) {
      handleTemplateSelect(templates[0]);
    }
  };

  const features = [
    {
      icon: Wand2,
      title: 'AI智能剪辑',
      description: '自动识别精彩片段，去除冗余内容'
    },
    {
      icon: Scissors,
      title: '智能裁剪',
      description: '去除填充词和沉默片段'
    },
    {
      icon: Subtitles,
      title: '自动字幕',
      description: '智能生成并添加字幕'
    },
    {
      icon: Palette,
      title: '一键调色',
      description: '多种滤镜风格选择'
    },
    {
      icon: Mic,
      title: '音频优化',
      description: '自动消除爆音，添加淡入淡出'
    },
    {
      icon: Music,
      title: '背景音乐',
      description: '精选热门背景音乐库'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF0050] to-[#FF6B35] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF0050]/30">
              <Clapperboard className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                智能短剧剪辑
              </h1>
              <p className="text-gray-400 text-sm">AI驱动的视频编辑工具</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-6">
        <section>
          {!video ? (
            <div
              onClick={handleClickUpload}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative p-10 border-2 border-dashed rounded-3xl transition-all cursor-pointer ${isDragging ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              <div className="flex flex-col items-center gap-5">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${isDragging ? 'bg-[#FF0050] scale-110' : 'bg-gray-700'}`}>
                  <Upload className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg mb-1">
                    {isDragging ? '松开上传视频' : '点击上传视频'}
                  </p>
                  <p className="text-sm text-gray-400">支持 MP4、MOV、AVI 格式</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF0050] to-[#FF6B35] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF0050]/20">
                  <Film className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate text-lg">{video.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {Math.round(video.duration)}秒 · {(video.size / (1024 * 1024)).toFixed(2)}MB
                  </p>
                </div>
                <button
                  onClick={handleRemoveVideo}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleAIEdit}
                  className="w-full py-4 bg-gradient-to-r from-[#FF0050] to-[#FF6B35] rounded-2xl font-bold text-white shadow-lg shadow-[#FF0050]/30 hover:shadow-[#FF0050]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  AI智能剪辑
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleStartEdit}
                  className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  手动剪辑
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700 hover:border-[#FF0050]/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-3">
                <feature.icon className="w-6 h-6 text-[#FF0050]" />
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF0050]" />
              热门模板
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => video && handleTemplateSelect(template)}
                className={`bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 transition-all cursor-pointer group ${video ? 'hover:border-[#FF0050]/50' : 'opacity-50 cursor-not-allowed'}`}
              >
                <div className="relative aspect-[9/16] bg-black">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxRjI5MzciLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0iIzkDRTNDQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWKoOa1i+iAgTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-1 text-xs text-gray-300 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{template.usageCount}万次使用</span>
                    </div>
                    <p className="font-semibold text-sm">{template.name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-[#FF0050] rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-2 truncate">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#FF0050]/10 to-[#FF6B35]/10 rounded-3xl p-6 border border-[#FF0050]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF0050] to-[#FF6B35] rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">智能剪辑流程</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF0050] rounded-full" />
                  <span>自动识别并去除填充词</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF0050] rounded-full" />
                  <span>智能裁剪沉默片段</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF0050] rounded-full" />
                  <span>自动添加字幕和音乐</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF0050] rounded-full" />
                  <span>一键生成爆款视频</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

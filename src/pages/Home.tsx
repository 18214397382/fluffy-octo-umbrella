import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, Play, Zap, Film, Clapperboard, Star, TrendingUp, Smile, Music } from 'lucide-react';
import { useStore } from '../store';

export default function Home() {
  const navigate = useNavigate();
  const { setVideo, setSelectedTemplate, templates } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    navigate('/editor');
  };

  const handleAIEdit = () => {
    navigate('/ai-editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF0050] to-[#FF6B35] rounded-xl flex items-center justify-center">
              <Clapperboard className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              抖音短剧剪辑
            </h1>
          </div>
          <p className="text-gray-400">一键生成爆款短视频</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-8">
        <section>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${isDragging ? 'border-[#FF0050] bg-[#FF0050]/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isDragging ? 'bg-[#FF0050]' : 'bg-gray-700'}`}>
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1">
                  {isDragging ? '松开上传视频' : '点击或拖拽上传视频'}
                </p>
                <p className="text-sm text-gray-400">支持 MP4、MOV、AVI 格式</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF0050]" />
              热门模板
            </h2>
            <button onClick={handleAIEdit} className="text-sm text-[#FF0050] font-medium flex items-center gap-1">
              <Zap className="w-4 h-4" />
              AI智能剪辑
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-[#FF0050]/50 transition-all cursor-pointer group"
              >
                <div className="relative aspect-[9/16] bg-black">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {['film', 'music', 'smile'].map((tag, i) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

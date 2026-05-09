import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { 
  Upload, Wand2, Scissors, Subtitles, Palette, Mic, Music,
  ChevronRight, Sparkles, Film, Star, Clock, Users
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { video, setVideo, templates, loadTemplates, setSelectedTemplate } = useStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showVideoInfo, setShowVideoInfo] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => { loadTemplates(); }, [loadTemplates]);

  useEffect(() => {
    if (video) { setShowVideoInfo(true); setUploadError(''); }
  }, [video]);

  const handleFileSelect = (file: File) => {
    try {
      setUploadError('');
      
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|avi|3gp|webm|mkv|flv|wmv|mpg|mpeg)$/i)) {
        setUploadError('请选择有效的视频文件');
        return;
      }

      if (file.size > 1 * 1024 * 1024 * 1024) {
        setUploadError('视频文件不能超过1GB');
        return;
      }

      const url = URL.createObjectURL(file);
      
      setVideo({ 
        file, 
        url, 
        name: file.name, 
        duration: Math.round(file.size / (1024 * 1024) * 10), 
        size: file.size 
      });
    } catch (error) {
      setUploadError('上传失败，请重试');
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files.length > 0) { handleFileSelect(e.dataTransfer.files[0]); }
  };
  const handleClickUpload = () => { if (fileInputRef.current) { fileInputRef.current.click(); } };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { handleFileSelect(e.target.files[0]); }
  };
  const handleRemoveVideo = () => { setVideo(null); setShowVideoInfo(false); if (fileInputRef.current) { fileInputRef.current.value = ''; } };
  const handleTemplateSelect = (template: any) => {
    if (!video) { setUploadError('请先上传视频'); return; }
    setSelectedTemplate(template); navigate('/editor');
  };
  const handleAIEdit = () => {
    if (!video) { setUploadError('请先上传视频'); return; }
    navigate('/ai-editor');
  };

  const features = [
    { icon: Wand2, title: 'AI智能剪辑', description: '自动识别精彩片段', color: 'from-blue-500 to-cyan-500' },
    { icon: Scissors, title: '智能裁剪', description: '去除填充词和沉默', color: 'from-green-500 to-emerald-500' },
    { icon: Subtitles, title: '自动字幕', description: '智能生成字幕', color: 'from-yellow-500 to-orange-500' },
    { icon: Palette, title: '一键调色', description: '多种滤镜风格', color: 'from-pink-500 to-rose-500' },
    { icon: Mic, title: '音频优化', description: '消除爆音淡入淡出', color: 'from-purple-500 to-violet-500' },
    { icon: Music, title: '背景音乐', description: '精选热门音乐', color: 'from-red-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          智能短剧剪辑
        </h1>
        <p className="text-xl text-gray-400 mb-12">AI驱动的视频编辑工具，让创作更简单</p>

        <div className="max-w-2xl mx-auto mb-16">
          {!showVideoInfo ? (
            <div onClick={handleClickUpload} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all ${
                isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
              }`}>
              <input ref={fileInputRef} type="file" accept="video/*,.mp4,.mov,.avi,.3gp,.webm,.mkv" onChange={handleFileInputChange} className="hidden" />
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">{isDragging ? '松开上传视频' : '点击上传视频'}</h3>
              <p className="text-gray-400">支持 MP4、MOV、AVI 等视频格式（最大1GB）</p>
              {uploadError && <p className="text-red-400 mt-4">{uploadError}</p>}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Film className="w-10 h-10 text-blue-400" />
                  <div className="text-left">
                    <h3 className="font-medium">{video?.name}</h3>
                    <p className="text-sm text-gray-400">
                      {video && `${Math.round(video.duration)}秒 · ${(video.size / (1024 * 1024)).toFixed(2)}MB`}
                    </p>
                  </div>
                </div>
                <button onClick={handleRemoveVideo} className="text-gray-400 hover:text-red-400 transition-colors">移除</button>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAIEdit}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all">
                  <Sparkles className="w-5 h-5" />AI智能剪辑
                </button>
                <button onClick={() => templates.length > 0 && handleTemplateSelect(templates[0])}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-all">
                  <Scissors className="w-5 h-5" />手动编辑
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">热门模板</h2>
          {!video && <p className="text-gray-500 mb-6">上传视频后可用</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} onClick={() => handleTemplateSelect(template)}
                className={`bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 transition-all ${
                  video ? 'cursor-pointer hover:border-gray-600' : 'opacity-50 cursor-not-allowed'
                }`}>
                <div className="relative">
                  <img src={template.thumbnail} alt={template.name} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1">
                    <Clock className="w-3 h-3 inline text-white" />
                    <span className="text-xs text-white ml-1">{template.duration}秒</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-400">{template.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Users className="w-3 h-3" />
                      <span>{template.usageCount}次使用</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${video ? 'text-blue-400' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
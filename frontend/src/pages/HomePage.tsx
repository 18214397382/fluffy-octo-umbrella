import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Film, ChevronRight, Loader2 } from 'lucide-react';
import { ProjectProvider, useProject } from '../context/ProjectContext';
import { CLIP_STYLES } from '../constants';
import type { ClipStyle } from '../types';

function HomeContent() {
  const navigate = useNavigate();
  const { project, createProject, setStyle } = useProject();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<ClipStyle | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setIsLoading(true);
    createProject(file);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleStyleSelect = (style: ClipStyle) => {
    setSelectedStyle(style);
    setStyle(style);
  };

  const handleStart = () => {
    if (project && selectedStyle) {
      navigate('/edit');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex items-center gap-2 mb-8">
        <Film className="w-6 h-6 text-red-500" />
        <h1 className="text-xl font-bold">抖音短剧剪辑</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-red-500" />
          上传视频
        </h2>

        {!project ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-red-500 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                <p>正在加载...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-medium">点击上传视频</p>
                <p className="text-sm text-gray-400">支持 MP4、MOV 格式</p>
              </>
            )}
          </button>
        ) : (
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                <Film className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">已加载</p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-gray-700 rounded-lg text-sm"
              >
                更换
              </button>
            </div>
          </div>
        )}
      </section>

      {project && (
        <>
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">选择剪辑风格</h2>
            <div className="grid grid-cols-2 gap-3">
              {CLIP_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedStyle?.id === style.id
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-gray-700 bg-gray-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{style.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{style.name}</p>
                      <p className="text-xs text-gray-400">{style.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {selectedStyle && (
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              开始剪辑
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <ProjectProvider>
      <HomeContent />
    </ProjectProvider>
  );
}

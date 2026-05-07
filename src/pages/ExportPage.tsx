import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Share2, RefreshCw, CheckCircle } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ExportPage() {
  const navigate = useNavigate();
  const { project } = useProject();
  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    setIsExported(true);
  };

  const handleDownload = () => {
    if (project?.videoUrl) {
      const link = document.createElement('a');
      link.href = project.videoUrl;
      link.download = `剪辑_${project.name}`;
      link.click();
    }
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
        <button onClick={() => navigate('/ai-analysis')} className="flex items-center gap-1 text-gray-400">
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>
        <h1 className="text-lg font-bold">导出视频</h1>
        <div className="w-10" />
      </header>

      <div className="bg-black rounded-xl overflow-hidden aspect-video mb-6">
        <video
          src={project.videoUrl}
          className="w-full h-full object-contain"
          controls
        />
      </div>

      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h2 className="font-bold mb-3">视频信息</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">文件名</span>
            <span>{project.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">时长</span>
            <span>{Math.floor(project.duration / 60)}:{(project.duration % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">剪辑风格</span>
            <span>{project.style?.name || '未选择'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">片段数量</span>
            <span>{project.segments.length} 个</span>
          </div>
        </div>
      </div>

      {!isExported ? (
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              正在导出...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              导出视频
            </>
          )}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <p className="font-medium text-green-400">导出成功！</p>
              <p className="text-sm text-gray-400">您的视频已经准备就绪</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleDownload} className="py-4 bg-red-500 rounded-xl font-bold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              下载视频
            </button>
            <button className="py-4 bg-gray-700 rounded-xl font-bold flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              分享
            </button>
          </div>

          <button onClick={() => navigate('/')} className="w-full py-3 border border-gray-600 rounded-xl font-medium">
            制作新视频
          </button>
        </div>
      )}
    </div>
  );
}

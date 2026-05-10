import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, FileText, Scissors } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { analyzeVideo } from '../utils/api';

export default function AIAnalysisPage() {
  const navigate = useNavigate();
  const { project, setScript, addSegments } = useProject();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [script, setScriptState] = useState('');
  const [segments, setSegments] = useState<{ id: string; startTime: number; endTime: number; type: string; description: string }[]>([]);

  useEffect(() => {
    if (project && project.style) {
      startAnalysis();
    }
  }, []);

  const startAnalysis = async () => {
    if (!project?.style) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeVideo(project.style.id, project.name);
      if (result.success) {
        setScriptState(result.script);
        setSegments(result.segments);
        setScript(result.script);
        addSegments(result.segments);
      }
    } catch (error) {
      console.error('AI分析失败:', error);
    } finally {
      setIsAnalyzing(false);
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
        <button onClick={() => navigate('/edit')} className="flex items-center gap-1 text-gray-400">
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>
        <h1 className="text-lg font-bold">AI智能分析</h1>
        <button onClick={() => navigate('/export')} className="flex items-center gap-1 text-red-500">
          导出
          <ChevronRight className="w-5 h-5" />
        </button>
      </header>

      {isAnalyzing && (
        <div className="bg-gray-800 rounded-xl p-8 text-center mb-6">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">AI正在分析视频...</p>
          <p className="text-sm text-gray-400 mt-2">请稍候...</p>
        </div>
      )}

      {!isAnalyzing && (
        <>
          <section className="bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              生成的解说文案
            </h2>
            <textarea
              value={script}
              onChange={(e) => {
                setScriptState(e.target.value);
                setScript(e.target.value);
              }}
              className="w-full h-48 p-4 bg-gray-900 rounded-xl border border-gray-700 resize-none text-sm"
            />
          </section>

          <section className="bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-red-500" />
              识别的精彩片段
            </h2>
            <div className="space-y-3">
              {segments.map((segment, index) => (
                <div key={segment.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{segment.description}</p>
                    <p className="text-xs text-gray-400">
                      {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    segment.type === 'highlight' ? 'bg-yellow-500/20 text-yellow-400' :
                      segment.type === 'transition' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-700 text-gray-400'
                  }`}>
                    {segment.type === 'highlight' ? '高光' : segment.type === 'transition' ? '过渡' : '普通'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={startAnalysis} className="py-4 bg-gray-700 rounded-xl font-bold">
              重新分析
            </button>
            <button onClick={() => navigate('/export')} className="py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-bold">
              导出视频
            </button>
          </div>
        </>
      )}
    </div>
  );
}

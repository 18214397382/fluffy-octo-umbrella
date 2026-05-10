import { create } from 'zustand';

export interface AIClipStyle {
  id: string;
  name: string;
  description: string;
  emoji: string;
  filter?: string;
  speed?: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  emoji: string;
  provider: 'local' | 'cloud';
}

export interface VideoTemplate {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
  description: string;
  transitions: string[];
  usageCount: number;
  rating: number;
}

export interface EditParams {
  startTime: number;
  endTime: number;
  speed: number;
  transition: string;
  volume: number;
  filters: string[];
  aspectRatio: '9:16' | '16:9' | '1:1';
}

export interface VideoInfo {
  file: File;
  duration: number;
  url: string;
  name: string;
  size: number;
}

interface AppState {
  video: VideoInfo | null;
  selectedTemplate: VideoTemplate | null;
  editParams: EditParams;
  templates: VideoTemplate[];
  isProcessing: boolean;
  exportProgress: number;

  useAIEdit: boolean;
  selectedAIStyle: AIClipStyle | null;
  aiStyles: AIClipStyle[];
  
  modelProvider: 'local' | 'cloud';
  selectedModel: AIModel | null;
  localModels: AIModel[];
  cloudModels: AIModel[];
  
  aiEditTaskId: string | null;
  aiEditProgress: number;
  aiEditCurrentStep: string;
  aiEditCompleted: boolean;
  aiVideoUrl: string | null;

  setVideo: (video: VideoInfo | null) => void;
  selectTemplate: (template: VideoTemplate) => void;
  setSelectedTemplate: (template: VideoTemplate) => void;
  updateEditParams: (params: Partial<EditParams>) => void;
  loadTemplates: () => void;
  setProcessing: (processing: boolean) => void;
  setExportProgress: (progress: number) => void;
  resetState: () => void;

  setUseAIEdit: (use: boolean) => void;
  selectAIStyle: (style: AIClipStyle) => void;
  loadAIStyles: () => Promise<void>;
  
  setModelProvider: (provider: 'local' | 'cloud') => void;
  selectModel: (model: AIModel) => void;
  loadModels: () => Promise<void>;
  
  startAIEdit: (videoFile: File, style: string, features: string[]) => Promise<string | null>;
  pollAIEditStatus: (taskId: string) => Promise<void>;
  setAIEditTaskId: (id: string | null) => void;
  setAIEditProgress: (progress: number, step: string) => void;
  setAIEditCompleted: (completed: boolean, videoUrl: string | null) => void;
  resetAIEdit: () => void;
}

const defaultTemplates: VideoTemplate[] = [
  { id: '1', name: '快节奏剪辑', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop', duration: 15, description: '适合动感音乐，快速切换镜头', transitions: ['fade', 'zoom', 'slide'], usageCount: 12, rating: 4.8 },
  { id: '2', name: '情感叙事', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop', duration: 30, description: '慢节奏，适合讲述故事', transitions: ['fade', 'dissolve'], usageCount: 8, rating: 4.9 },
  { id: '3', name: '搞笑短剧', thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop', duration: 20, description: '活泼有趣，适合搞笑内容', transitions: ['bounce', 'whip', 'zoom'], usageCount: 15, rating: 4.7 },
  { id: '4', name: '炫酷特效', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop', duration: 18, description: '充满视觉冲击力', transitions: ['glitch', 'wave', 'flip'], usageCount: 10, rating: 4.6 },
  { id: '5', name: '产品展示', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', duration: 25, description: '专业的产品推广风格', transitions: ['fade', 'slide', 'scale'], usageCount: 6, rating: 4.5 },
  { id: '6', name: '旅行回忆', thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop', duration: 35, description: '记录美好旅行时光', transitions: ['fade', 'dissolve', 'slide'], usageCount: 9, rating: 4.8 }
];

const defaultEditParams: EditParams = { startTime: 0, endTime: 60, speed: 1, transition: 'fade', volume: 80, filters: [], aspectRatio: '9:16' };

export const useStore = create<AppState>((set, get) => ({
  video: null, selectedTemplate: null, editParams: defaultEditParams, templates: [], isProcessing: false, exportProgress: 0,
  useAIEdit: false, selectedAIStyle: null, aiStyles: [], 
  modelProvider: 'local', selectedModel: null, localModels: [], cloudModels: [],
  aiEditTaskId: null, aiEditProgress: 0, aiEditCurrentStep: '', aiEditCompleted: false, aiVideoUrl: null,

  setVideo: (video) => set({ video }), selectTemplate: (template) => set({ selectedTemplate: template }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  updateEditParams: (params) => set((state) => ({ editParams: { ...state.editParams, ...params } })),
  loadTemplates: () => set({ templates: defaultTemplates }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setExportProgress: (progress) => set({ exportProgress: progress }),
  resetState: () => set({ video: null, selectedTemplate: null, editParams: defaultEditParams, isProcessing: false, exportProgress: 0 }),

  setUseAIEdit: (use) => set({ useAIEdit: use }),
  selectAIStyle: (style) => set({ selectedAIStyle: style }),
  loadAIStyles: async () => {
    try {
      const response = await fetch('/api/ai-edit/styles');
      const data = await response.json();
      if (data.success) {
        set({ aiStyles: data.styles });
      }
    } catch (error) {
      console.error('加载AI风格失败:', error);
      set({ aiStyles: [
        { id: 'trending', name: '热门推荐', description: '抖音最火的剪辑风格', emoji: '🔥', filter: 'contrast(1.1) saturate(1.2)', speed: 1.2 },
        { id: 'emotional', name: '情感叙事', description: '感人的故事化剪辑', emoji: '❤️', filter: 'sepia(0.3) contrast(0.95)', speed: 0.9 },
        { id: 'funny', name: '搞笑喜剧', description: '幽默有趣的剪辑', emoji: '😂', filter: 'saturate(1.3) brightness(1.05)', speed: 1.1 },
        { id: 'cinematic', name: '电影大片', description: '专业级电影效果', emoji: '🎬', filter: 'contrast(1.2) brightness(0.95) saturate(0.9)', speed: 1.0 },
        { id: 'vlog', name: '生活Vlog', description: '日常记录风格', emoji: '📹', filter: 'brightness(1.05) saturate(1.1)', speed: 1.0 },
      ]});
    }
  },

  setModelProvider: (provider) => set({ modelProvider: provider, selectedModel: null }),
  selectModel: (model) => set({ selectedModel: model }),
  loadModels: async () => {
    try {
      const response = await fetch('/api/ai-edit/models');
      const data = await response.json();
      if (data.success) {
        set({ 
          localModels: data.models.local,
          cloudModels: data.models.cloud,
        });
      }
    } catch (error) {
      console.error('加载模型失败:', error);
      set({ 
        localModels: [
          { id: 'local-basic', name: '基础剪辑', description: '快速基础剪辑', emoji: '⚡', provider: 'local' },
          { id: 'local-standard', name: '标准剪辑', description: '平衡质量与速度', emoji: '🔧', provider: 'local' },
          { id: 'local-pro', name: '专业剪辑', description: '高质量专业处理', emoji: '💎', provider: 'local' },
          { id: 'local-cinematic', name: '电影级剪辑', description: '电影级色彩与节奏', emoji: '🎬', provider: 'local' },
        ],
        cloudModels: [
          { id: 'cloud-fast', name: '极速云端', description: '云端快速处理', emoji: '☁️', provider: 'cloud' },
          { id: 'cloud-ai', name: 'AI智能云端', description: '云端AI增强处理', emoji: '🤖', provider: 'cloud' },
          { id: 'cloud-hd', name: '高清云端', description: '云端高清渲染', emoji: '📺', provider: 'cloud' },
          { id: 'cloud-4k', name: '4K云端', description: '云端4K超清处理', emoji: '🌟', provider: 'cloud' },
        ],
      });
    }
  },

  startAIEdit: async (videoFile, style, features) => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('style', style);
      formData.append('features', JSON.stringify(features));
      formData.append('modelType', get().selectedModel?.id || 'local-standard');
      formData.append('modelProvider', get().modelProvider);

      const response = await fetch('/api/ai-edit/start', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        set({ aiEditTaskId: data.taskId });
        return data.taskId;
      }
      return null;
    } catch (error) {
      console.error('启动AI剪辑失败:', error);
      return null;
    }
  },

  pollAIEditStatus: async (taskId) => {
    const poll = async () => {
      try {
        const response = await fetch(`/api/ai-edit/status/${taskId}`);
        const data = await response.json();
        if (data.success) {
          set({ 
            aiEditProgress: data.progress,
            aiEditCurrentStep: data.currentStep,
          });

          if (data.status === 'completed') {
            set({ 
              aiEditCompleted: true,
              aiVideoUrl: data.videoUrl || null,
            });
            return;
          } else if (data.status === 'error') {
            set({ aiEditCompleted: true });
            return;
          }

          setTimeout(poll, 1000);
        }
      } catch (error) {
        console.error('轮询状态失败:', error);
        setTimeout(poll, 2000);
      }
    };
    await poll();
  },

  setAIEditTaskId: (id) => set({ aiEditTaskId: id }),
  setAIEditProgress: (progress, step) => set({ aiEditProgress: progress, aiEditCurrentStep: step }),
  setAIEditCompleted: (completed, videoUrl) => set({ aiEditCompleted: completed, aiVideoUrl: videoUrl }),
  resetAIEdit: () => set({ aiEditTaskId: null, aiEditProgress: 0, aiEditCurrentStep: '', aiEditCompleted: false, aiVideoUrl: null }),
}));

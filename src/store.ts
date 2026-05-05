import { create } from 'zustand';

export interface AIClipStyle {
  id: string;
  name: string;
  description: string;
  emoji: string;
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
  setAIEditTaskId: (id: string | null) => void;
  setAIEditProgress: (progress: number, step: string) => void;
  setAIEditCompleted: (completed: boolean, videoUrl: string) => void;
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

export const useStore = create<AppState>((set) => ({
  video: null, selectedTemplate: null, editParams: defaultEditParams, templates: [], isProcessing: false, exportProgress: 0,
  useAIEdit: false, selectedAIStyle: null, aiStyles: [], aiEditTaskId: null, aiEditProgress: 0, aiEditCurrentStep: '', aiEditCompleted: false, aiVideoUrl: null,
  
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
    }
  },
  setAIEditTaskId: (id) => set({ aiEditTaskId: id }),
  setAIEditProgress: (progress, step) => set({ aiEditProgress: progress, aiEditCurrentStep: step }),
  setAIEditCompleted: (completed, videoUrl) => set({ aiEditCompleted: completed, aiVideoUrl: videoUrl }),
  resetAIEdit: () => set({ useAIEdit: false, selectedAIStyle: null, aiEditTaskId: null, aiEditProgress: 0, aiEditCurrentStep: '', aiEditCompleted: false, aiVideoUrl: null }),
}));

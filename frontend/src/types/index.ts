export interface VideoSegment {
  id: string;
  startTime: number;
  endTime: number;
  type: 'highlight' | 'transition' | 'normal';
  description: string;
}

export interface ClipStyle {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface VideoProject {
  id: string;
  name: string;
  originalVideo: File | null;
  videoUrl: string;
  duration: number;
  segments: VideoSegment[];
  style: ClipStyle | null;
  aiModel: string;
  script: string;
  createdAt: Date;
}

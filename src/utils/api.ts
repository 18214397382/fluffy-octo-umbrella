import type { VideoSegment } from '../types';

export interface AIAnalysisResult {
  success: boolean;
  script: string;
  segments: VideoSegment[];
  highlights: number[];
}

export async function analyzeVideo(style: string, videoName: string): Promise<AIAnalysisResult> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ style, videoName }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI分析失败:', error);
    throw error;
  }
}

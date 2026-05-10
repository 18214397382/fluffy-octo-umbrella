import React, { createContext, useContext, useState, useCallback } from 'react';
import type { VideoProject, ClipStyle, VideoSegment } from '../types';

interface ProjectContextType {
  project: VideoProject | null;
  createProject: (file: File) => void;
  setStyle: (style: ClipStyle) => void;
  setScript: (script: string) => void;
  addSegments: (segments: VideoSegment[]) => void;
  clearProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<VideoProject | null>(null);

  const createProject = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      setProject({
        id: Date.now().toString(),
        name: file.name,
        originalVideo: file,
        videoUrl: url,
        duration: video.duration,
        segments: [],
        style: null,
        aiModel: 'nvidia-llama-3.1-8b-instruct',
        script: '',
        createdAt: new Date(),
      });
    };
    video.src = url;
  }, []);

  const setStyle = useCallback((style: ClipStyle) => {
    setProject(prev => prev ? { ...prev, style } : null);
  }, []);

  const setScript = useCallback((script: string) => {
    setProject(prev => prev ? { ...prev, script } : null);
  }, []);

  const addSegments = useCallback((segments: VideoSegment[]) => {
    setProject(prev => prev ? { ...prev, segments } : null);
  }, []);

  const clearProject = useCallback(() => {
    setProject(null);
  }, []);

  return (
    <ProjectContext.Provider value={{
      project,
      createProject,
      setStyle,
      setScript,
      addSegments,
      clearProject,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

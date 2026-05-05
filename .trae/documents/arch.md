
## 1. Architecture Design

```mermaid
graph TB
    subgraph Frontend
        A[React + TypeScript]
        B[Tailwind CSS]
        C[React Router]
        D[Zustand]
    end
    
    subgraph Backend
        E[Express.js + TypeScript]
        F[视频处理服务]
    end
    
    subgraph Browser APIs
        G[File API]
        H[Canvas API]
        I[MediaRecorder API]
    end
    
    A --&gt; G
    A --&gt; H
    A --&gt; I
    A --&gt; E
    E --&gt; F
```

## 2. Technology Description
- **前端**: React@18 + TypeScript + Tailwind CSS@3 + Vite
- **初始化工具**: vite-init
- **后端**: Express.js@4 + TypeScript
- **视频处理**: 浏览器端Canvas API + MediaRecorder API实现基础剪辑，后端提供高级处理
- **状态管理**: Zustand
- **路由**: React Router

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 - 视频上传和模板推荐 |
| /editor | 剪辑页面 - 模板选择和参数调整 |
| /export | 导出页面 - 视频导出和分享 |

## 4. API Definitions

### 4.1 Type Definitions
```typescript
// 视频模板类型
interface VideoTemplate {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
  transitions: string[];
  music: string;
}

// 剪辑参数类型
interface EditParams {
  startTime: number;
  endTime: number;
  speed: number;
  transition: string;
  music: string;
  volume: number;
  filters: string[];
}

// 视频信息类型
interface VideoInfo {
  file: File;
  duration: number;
  url: string;
}
```

### 4.2 API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/templates | 获取热门模板列表 |
| POST | /api/process | 处理视频剪辑 |
| POST | /api/export | 导出视频 |

## 5. Server Architecture Diagram

```mermaid
graph LR
    A[Controller] --&gt; B[Service]
    B --&gt; C[VideoProcessor]
    C --&gt; D[FFmpeg Wrapper]
```

## 6. Data Model

### 6.1 Data Model Definition
本项目不需要数据库，主要在浏览器端处理视频文件，使用本地状态管理。

### 6.2 状态管理
使用 Zustand 管理应用状态：
```typescript
interface AppState {
  video: VideoInfo | null;
  selectedTemplate: VideoTemplate | null;
  editParams: EditParams;
  templates: VideoTemplate[];
  setVideo: (video: VideoInfo | null) =&gt; void;
  selectTemplate: (template: VideoTemplate) =&gt; void;
  updateEditParams: (params: Partial&lt;EditParams&gt;) =&gt; void;
  loadTemplates: () =&gt; Promise&lt;void&gt;;
}
```

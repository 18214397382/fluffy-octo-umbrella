import { Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import ExportPage from './pages/ExportPage';

function App() {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/ai-analysis" element={<AIAnalysisPage />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </ProjectProvider>
  );
}

export default App;

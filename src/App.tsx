import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Export from './pages/Export';
import AIEditor from './pages/AIEditor';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/export" element={<Export />} />
        <Route path="/ai-editor" element={<AIEditor />} />
      </Routes>
    </Router>
  );
}

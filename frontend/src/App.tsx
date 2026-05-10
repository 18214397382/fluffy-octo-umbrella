import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AIEditor from './pages/AIEditor'
import EditPage from './pages/EditPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditPage />} />
        <Route path="/ai-editor" element={<AIEditor />} />
      </Routes>
    </HashRouter>
  )
}

export default App

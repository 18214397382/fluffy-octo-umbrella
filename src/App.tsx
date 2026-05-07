import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AIEditor from './pages/AIEditor'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-editor" element={<AIEditor />} />
      </Routes>
    </HashRouter>
  )
}

export default App

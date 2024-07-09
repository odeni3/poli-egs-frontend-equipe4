import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Projects from './pages/Projects'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Project from './pages/Project.tsx'
import ProjectsAdmin from './pages/Admin/Projects.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:slug' element={<Project />} />
          <Route path='/admin-projects' element={<ProjectsAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

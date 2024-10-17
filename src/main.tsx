import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Projects from './pages/Projects'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Project from './pages/Project.tsx'
import ProjectsAdmin from './pages/Admin/Projects.tsx'
import ArticlesAdmin from './pages/Admin/Artigos.tsx'
import Articles from './pages/Artigos.tsx'
import Login from './pages/Admin/Login.tsx' // Comentar Login
import { AuthProvider } from './contexts/AuthContext.tsx' // Comentar AuthProvider
import ProtectedRoute from './components/ProtectedRoute.tsx' // Comentar ProtectedRoute
import Logout from './components/Logout.tsx' // Comentar Logout
import Sobre from './pages/Sobre.tsx'
import FAQ from './pages/FAQ.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider>  */}
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/projects/:slug?' element={<Projects />} />
          <Route path='/projects/selected/:slug' element={<Project />} />
          <Route path='/articles' element={<Articles />} />
          {/* <Route path='/login' element={<Login />} />  */}
          <Route path='/sobre' element={<Sobre />} />
          <Route path='/faq' element={<FAQ />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path='/admin-projects' element={<ProjectsAdmin />} />
            <Route path='/admin-articles' element={<ArticlesAdmin />} />
            {/* <Route path='/logout' element={<Logout />} /> */}
          {/* </Route> */}
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
)

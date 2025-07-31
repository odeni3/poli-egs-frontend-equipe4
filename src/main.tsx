import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Projects from './pages/Projects'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Project from './pages/Project.tsx'
import ProjectsAdmin from './pages/Admin/Projects.tsx'
import ArticlesAdmin from './pages/Admin/Artigos.tsx'
import ProdutosAdmin from './pages/Admin/Produtos.tsx'
import Articles from './pages/Artigos.tsx'
import Produtos from './pages/Produtos.tsx';
import Login from './pages/Admin/Login.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Logout from './components/Logout.tsx'
import Sobre from './pages/Sobre.tsx'
import FAQ from './pages/FAQ.tsx'
import LoginTest from './pages/LoginTest.tsx'
import Register from './pages/Register';
import Userprojects from './pages/User/User-projects.tsx';
import Userarticles from './pages/User/User-articles.tsx';
import Userprodutos from './pages/User/User-produtos.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider>  */}
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/projetos' element={<Projects />} />
          <Route path='/projetos/:slug' element={<Project />} />
          <Route path='/artigos' element={<Articles />} />
          <Route path='/produtos' element={<Produtos/>} />
          <Route path='/logintest' element={<LoginTest />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path='/login' element={<Login />} />  */}
          <Route path='/sobre' element={<Sobre />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/user-projects' element={<Userprojects />} />
          <Route path='/user-articles' element={<Userarticles />} />
          <Route path='/user-produtos' element={<Userprodutos />} />

          {/* <Route element={<ProtectedRoute />}> */}
            <Route path='/admin-projects' element={<ProjectsAdmin />} />
            <Route path='/admin-articles' element={<ArticlesAdmin />} />
            <Route path='/admin-produtos' element={<ProdutosAdmin/>} />
            {/* <Route path='/logout' element={<Logout />} /> */}
          {/* </Route> */}
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
)

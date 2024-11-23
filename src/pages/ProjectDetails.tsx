import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Project {
  id: string;
  titulo: string;
  descricao: string;
  equipe: string[];
  cliente: string;
  pitch: string;
  tema: string;
  semestre: string;
  video_tecnico: string;
  tecnologias_utilizadas: string[];
  palavras_chave: string[];
  link_repositorio: string;
  revisado?: string;
  curtidas?: number;
}

const api = axios.create({
  baseURL: 'https://poli-egs-fastapi-1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projetos/${id}`);
        if (response.data && response.data.projeto) {
          setProject(response.data.projeto);
        } else {
          setError('Dados do projeto não encontrados');
        }
      } catch (err) {
        setError('Erro ao carregar o projeto');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Projeto não encontrado</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{project.titulo}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
              <p className="text-gray-700 mb-6">{project.descricao}</p>

              <h2 className="text-2xl font-semibold mb-2">Equipe</h2>
              <ul className="list-disc list-inside mb-6">
                {project.equipe.map((membro, index) => (
                  <li key={index} className="text-gray-700">{membro}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mb-2">Tecnologias Utilizadas</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tecnologias_utilizadas.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Informações do Projeto</h2>
              <div className="space-y-4">
                <p><strong>Cliente:</strong> {project.cliente}</p>
                <p><strong>Tema:</strong> {project.tema}</p>
                <p><strong>Semestre:</strong> {project.semestre}</p>
                
                {project.link_repositorio && (
                  <p>
                    <strong>Repositório:</strong>{' '}
                    <a 
                      href={project.link_repositorio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Link do Repositório
                    </a>
                  </p>
                )}
              </div>

              {(project.video_tecnico || project.pitch) && (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2">Vídeos</h2>
                  {project.video_tecnico && (
                    <div className="mb-4">
                      <h3 className="font-semibold">Vídeo Técnico:</h3>
                      <a 
                        href={project.video_tecnico}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Assistir Vídeo Técnico
                      </a>
                    </div>
                  )}
                  {project.pitch && (
                    <div>
                      <h3 className="font-semibold">Pitch:</h3>
                      <a 
                        href={project.pitch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Assistir Pitch
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectDetails;
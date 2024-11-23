import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../images/mainpage.jpg'; 

// Definir a interface para os dados brutos retornados pelo back-end
interface RawProject {
  id: string;
  titulo: string;
  descricao: string;
  equipe: string; // String separada por ponto e vírgula
  cliente: string;
  pitch: string;
  tema: string;
  semestre: string;
  video_tecnico: string;
  tecnologias_utilizadas: string; // String separada por ponto e vírgula
  palavras_chave: string; // String separada por ponto e vírgula
  link_repositorio: string;
}

// Definir a interface do projeto após o parsing
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
}

// Criar instância do axios com configurações base
const api = axios.create({
  baseURL: 'https://poli-egs-fastapi-1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

function Projects() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [input, setInput] = useState(slug || '');
  const [inputMembers, setInputMembers] = useState('');
  const [themes, setThemes] = useState('');
  const [semester, setSemester] = useState('');
  const [cards, setCards] = useState<Project[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await api.get('/projetos');

        const projectsData: RawProject[] = projectsRes.data.projetos ? projectsRes.data.projetos : [];

        // Converter os campos separados por ponto e vírgula em arrays
        const parsedProjects: Project[] = projectsData.map((project: RawProject) => ({
          ...project,
          equipe: project.equipe.split(';').map((member) => member.trim()),
          palavras_chave: project.palavras_chave.split(';').map((keyword) => keyword.trim()),
          tecnologias_utilizadas: project.tecnologias_utilizadas.split(';').map((tech) => tech.trim()),
        }));

        setCards(parsedProjects);

        // Extrair temas e semestres únicos dos projetos
        const themesSet = new Set(parsedProjects.map((project) => project.tema));
        setSelectedThemes(Array.from(themesSet));

        const semestersSet = new Set(parsedProjects.map((project) => project.semestre));
        setSelectedSemesters(Array.from(semestersSet));

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  // ... (restante do código permanece o mesmo, incluindo a lógica de filtragem ajustada)

  return (
    <>
      {/* Resto do componente, sem alterações significativas */}
    </>
  );
}

export default Projects;

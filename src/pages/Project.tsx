import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../images/mainpage.jpg'; 

// Definir a interface do projeto
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(slug || '');
  const [inputMembers, setInputMembers] = useState('');
  const [themes, setThemes] = useState('');
  const [semester, setSemester] = useState('');
  const [cards, setCards] = useState<Project[]>([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes] = await Promise.all([
          api.get('/projetos'),
          // rotas não mais utilizadas
          //api.get('/temasProjeto'),
          //api.get('/semestreProjetos')
        ]);

        const projectsData = projectsRes.data.projeto ? [projectsRes.data.projeto] : [];
        setCards(projectsData);
        // dados não existentes
        //setSelectedThemes(themesRes.data.temas);
        //setSelectedSemesters(semestersRes.data.semestres);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputMembersChange = (event) => {
    setInputMembers(event.target.value);
  };

  const handleGetImage = async (id: string) => {
    try {
      const response = await api.get(`/view_logo_projeto/${id}`, {
        responseType: 'blob'
      });
      
      if (response.status === 200 && response.data) {
        const imageUrl = URL.createObjectURL(response.data);
        setImages(prev => ({
          ...prev,
          [id]: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const filteredCards = Array.isArray(cards)
    ? cards.filter((project) => {
        const searchInput = input.toLowerCase();
        const searchMembers = inputMembers.toLowerCase();
        const searchThemes = themes.toLowerCase();
        const searchSemester = semester.toLowerCase();

        // Verificar se o membro está na equipe
        const hasMatchingMember = project.equipe.some(member => 
          member.toLowerCase().includes(searchMembers)
        );

        // Verificar palavras-chave
        const hasMatchingKeyword = project.palavras_chave.some(keyword => 
          keyword.toLowerCase().includes(searchInput)
        );

        handleGetImage(project.id);

        return (
          (project.titulo.toLowerCase().includes(searchInput) ||
            hasMatchingKeyword ||
            project.tema.toLowerCase().includes(searchInput)) &&
          hasMatchingMember &&
          project.tema.toLowerCase().includes(searchThemes) &&
          project.semestre.toLowerCase().includes(searchSemester)
        );
      })
    : [];

  return (
    <>
      <Header />

      {/* Seção Hero */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">Projetos</h1>
          <p className="text-2xl mb-8 text-center">Explore nossos projetos e iniciativas</p>
          <div className="flex w-full max-w-lg">
            <input
              type="search"
              name="searchbar"
              id="searchbar"
              className="w-full h-16 px-6 rounded-l-full bg-white bg-opacity-20 text-white placeholder-white outline-none focus:bg-white focus:text-black transition-colors duration-300"
              placeholder="Pesquise por nome, tema, palavra-chave"
              value={input}
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-600 h-16 px-6 rounded-r-full hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filtros e Lista de Projetos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Filtro de Pesquisa */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Filtrar Projetos</h2>
            <form>
              {/* Área do Projeto */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Área do projeto:</label>
                <Listbox value={themes} onChange={setThemes}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-12 pl-3 pr-10 text-left bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="block truncate">{themes || 'Selecione uma área'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
                      {selectedThemes.map((theme, index) => (
                        <Listbox.Option
                          key={index}
                          value={theme}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active ? 'text-white bg-blue-600' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {theme}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Semestre */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Ano/Semestre:</label>
                <Listbox value={semester} onChange={setSemester}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-12 pl-3 pr-10 text-left bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="block truncate">{semester || 'Selecione um semestre'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
                      {selectedSemesters.map((sem, index) => (
                        <Listbox.Option
                          key={index}
                          value={sem}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active ? 'text-white bg-blue-600' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {sem}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Pesquisar por nome, palavra-chave */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Pesquisar (nome, palavra-chave):
                </label>
                <input
                  type="text"
                  className="w-full h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Tracy-TD, Inteligência Artificial..."
                  value={input}
                  onChange={handleInputChange}
                />
              </div>

              {/* Integrantes */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Integrantes:</label>
                <input
                  type="text"
                  className="w-full h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Ana Karla, Arthur Xavier..."
                  value={inputMembers}
                  onChange={handleInputMembersChange}
                />
              </div>

              {/* Botão de Enviar */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Aplicar Filtros
              </button>
            </form>
          </div>

          {/* Lista de Projetos */}
          <div className="w-full lg:w-3/4">
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCards.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                  >
                    <img
                      src={images[project.id] || ''}
                      alt={project.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">{project.titulo}</h3>
                      <p className="text-gray-700 flex-grow">{project.descricao}</p>
                      <button
                        onClick={() => navigate(`/projects/selected/${project.id}`)}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Ver mais
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">Nenhum projeto encontrado.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Projects;

import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../images/mainpage.jpg';

function Projects() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(slug || '');
  const [inputMembers, setInputMembers] = useState('');
  const [themes, setThemes] = useState('');
  const [semester, setSemester] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then((response) => {
      setCards(response.data);
    });
    axios.get('https://ecomp-egs.onrender.com/temasProjeto').then((response) => {
      setSelectedThemes(response.data.temas);
    });
    axios.get('https://ecomp-egs.onrender.com/semestreProjetos').then((response) => {
      setSelectedSemesters(response.data.semestres);
    });
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputMembersChange = (event) => {
    setInputMembers(event.target.value);
  };

  const handleGetImage = async (id) => {
    try {
      const response = await axios.get(`https://ecomp-egs.onrender.com/view_logo_projeto/${id}`);
      setImages((prevImages) => ({
        ...prevImages,
        [id]: response.data.url,
      }));
    } catch (error) {
      console.log('Error fetching images: ', error);
    }
  };

  const filteredCards = Array.isArray(cards)
    ? cards.filter((project) => {
        const searchInput = input.toLowerCase();
        const searchMembers = inputMembers.toLowerCase();
        const searchThemes = themes.toLowerCase();
        const searchSemester = semester.toLowerCase();
        handleGetImage(project.id);
        return (
          (project.titulo?.toLowerCase().includes(searchInput) ||
            project.palavras_chave?.toLowerCase().includes(searchInput) ||
            project.tema?.toLowerCase().includes(searchInput)) &&
          project.equipe?.toLowerCase().includes(searchMembers) &&
          project.tema?.toLowerCase().includes(searchThemes) &&
          project.semestre?.toLowerCase().includes(searchSemester)
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
          <div className="flex w-full max-w-lg mb-6">
            <input
              type="search"
              name="searchbar"
              id="searchbar"
              className="w-full h-16 px-6 rounded-l-full bg-white bg-opacity-20 text-white placeholder-white outline-none focus:bg-white focus:text-black transition-colors duration-300"
              placeholder="Pesquise por nome, tema, palavra-chave"
              value={input}
              onChange={handleInputChange}
            />
            <button className="bg-blue-600 h-16 px-6 rounded-r-full hover:bg-blue-700 transition-colors">
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
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 py-2 px-4 rounded-full text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Início
          </button>
        </div>
      </section>

      {/* Filtros e Lista de Projetos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Filtro de Pesquisa */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
            {/* Conteúdo do Filtro */}
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
                    {/* Conteúdo do Card */}
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

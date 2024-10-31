import { useEffect, useState } from 'react';
import { ArrowLeftIcon, CalendarIcon, Cog8ToothIcon, FolderIcon, UserGroupIcon, UserIcon, HeartIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import mockData from '../dados/mockData';
import iconImage from '../images/avatar.png';

function Project() {
  const { slug } = useParams();
  const [Data, setData] = useState({});
  const [images, setImg] = useState();
  const [comentarios, setComentarios] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Verificação de login

  useEffect(() => {
    // Simulação de verificação de login. Altere para verificar o estado real de login
    const checkLoginStatus = () => {
      // Aqui você deve implementar sua lógica de autenticação
      const loggedInUser = false; // Troque isso pelo valor real
      setIsLoggedIn(loggedInUser);
    };

    checkLoginStatus();

    axios.get(`https://ecomp-egs.onrender.com/projetos/${slug}`).then((response) => {
      setData(response.data[0]);
    });
    axios.get(`https://ecomp-egs.onrender.com/view_logo_projeto/${slug}`).then((response) => {
      setImg(response.data["url"]);
    });
    // Carrega os comentários específicos para o projeto atual usando o `id`
    const comentariosDoProjeto = mockData.projetos[slug] || [];
    setComentarios(comentariosDoProjeto);
  }, [slug]);

  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  const toggleLike = (index) => {
    if (!isLoggedIn) {
      // Se o usuário não estiver logado, não faz nada
      return;
    }
    
    setComentarios((prevComentarios) => {
      const newComentarios = [...prevComentarios];
      newComentarios[index].curtidas += newComentarios[index].curtidas > 0 ? -1 : 1;
      return newComentarios;
    });
  };

  return (
    <>
      <div className="relative h-[20vh] bg-primary-color">
        <button onClick={handleBackClick} className="absolute inset-y-0 my-auto left-4 z-50 text-light-color">
          <ArrowLeftIcon className="h-10 w-10" />
        </button>
        <div className="h-full w-full bg-primary-color flex justify-center items-center z-10 gap-5 flex-row">
          <h1 className="text-3xl font-bold tracking-tight text-light-color">{Data.titulo}</h1>
        </div>
      </div>

      <main className="flex flex-col gap-16 px-[13vw] mb-20 pb-20">
        
        {/* Vídeo do pitch */}
        <section className="flex flex-col items-center w-full mt-12">
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + Data.pitch}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>

        {/* Imagem e descrição do projeto */}
        <section className="flex flex-row gap-5 items-center w-full">
          <div className="h-[30vh] w-[15vw] rounded-full flex items-center justify-center">
            <img className="shadow-lg rounded-full" src={images} alt="" />
          </div>
          <p className="text-gray-600">{Data.descricao}</p>
        </section>

        {/* Informações do projeto */}
        <div className="w-full grid grid-cols-2 gap-[2vw] ">
          <section className="w-full flex flex-col border-solid rounded-t-lg border-2 border-light-color gap-3 pb-8">
            <div className="w-full flex flex-row items-center space-x-1 bg-[#D8DBE2] rounded-t-lg px-4 py-1">
              <UserGroupIcon className="h-5 w-5 me-2" />
              <h2 className="text-lg font-semibold text-dark-color">Equipe</h2>
            </div>
            <ul className="grid grid-cols-2 px-4">
              {Data.equipe?.split(";").map((pessoa, index) => (
                <li key={index}>{pessoa}</li>
              ))}
            </ul>
          </section>

          <section className="w-full flex flex-col border-solid rounded-t-lg border-2 border-light-color gap-3 pb-8">
            <div className="w-full flex flex-row items-center space-x-1 bg-[#D8DBE2] rounded-t-lg px-4 py-1">
              <Cog8ToothIcon className="h-5 w-5 me-2" />
              <h2 className="text-lg font-semibold text-dark-color">Tecnologias Utilizadas</h2>
            </div>
            <ul className="mb-5 grid grid-cols-2 px-4">
              {Data.tecnologias_utilizadas?.split(";").map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </section>

          <div className="w-full flex flex-col rounded-t-lg border-solid border-2 border-light-color gap-3 pb-8">
            <div className="w-full flex flex-row items-center space-x-1 bg-[#D8DBE2] rounded-t-lg px-4 py-1">
              <UserIcon className="h-5 w-5 me-2" />
              <h2 className="text-lg font-semibold text-dark-color">Pessoa/Organização Parceira</h2>
            </div>
            <p className="text-gray-600 px-4">{Data.cliente}</p>
          </div>

          <div className="w-full flex flex-col rounded-t-lg border-solid border-2 border-light-color gap-3 pb-8">
            <div className="w-full flex flex-row items-center space-x-1 bg-[#D8DBE2] rounded-t-lg px-4 py-1">
              <CalendarIcon className="h-5 w-5 me-2" />
              <h2 className="text-lg font-semibold text-dark-color">Semestre</h2>
            </div>
            <p className="text-gray-600 px-4">{Data.semestre}</p>
          </div>

          <div className="w-full flex flex-col rounded-t-lg border-solid border-2 border-light-color gap-3 pb-8">
            <div className="w-full flex flex-row items-center space-x-1 bg-[#D8DBE2] rounded-t-lg px-4 py-1">
              <FolderIcon className="h-5 w-5 me-2" />
              <h2 className="text-lg font-semibold text-dark-color">Links Úteis</h2>
            </div>
            <p className="text-blue-400 px-4 underline">
              <a href={Data.link_repositorio} target="_blank" rel="noopener noreferrer">Link para Repositório no GitHub</a>
            </p>
            <p className="text-blue-400 px-4 underline">
              <a href={Data.video_tecnico} target="_blank" rel="noopener noreferrer">Link para Vídeo Técnico</a>
            </p>
          </div>
        </div>

        {/* Seção de Comentários */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Comentários</h2>
          <div className="flex flex-col gap-4">
            {comentarios.map((comentario, index) => (
              <div key={index} className="flex items-center border-b border-gray-200 py-2">
                <img src={comentario.icone || iconImage} alt="Icone do usuario" className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-grow">
                  <p className="font-medium">{comentario.usuario}</p>
                  <p>{comentario.comentario}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => toggleLike(index)} className="flex items-center">
                    <HeartIcon className={`w-5 h-5 ${isLoggedIn ? 'text-red-500' : 'text-gray-500'}`} />
                  </button>
                  <p className="ml-2 mr-2">{comentario.curtidas}</p> Likes
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Project;

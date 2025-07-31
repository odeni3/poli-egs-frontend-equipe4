import Header from "./components/Header";
import IA from './images/ia.png';
import CD from './images/cd.png';
import FIN from './images/financas.png';
import DT from './images/dt.png';
import LGPD from './images/lgpd.png';
import EDUCACAO from './images/educacao.png';
import SAUDE from './images/saude.png';
import GESTAO from './images/gestao.png';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import backgroundImage from './images/mainpage.jpg';
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const form = useRef();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNavigation(input);
    }
  };

  const handleNavigation = async (input) => {
    try {
      // Requisição para obter os projetos
      const response = await fetch(`${import.meta.env.VITE_url_backend}/projetos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar projetos.");
      }
  
      const data = await response.json();

  
      // Busca o projeto pelo nome
      const foundProject = data.projetos.find(
        (project) => project.titulo?.toLowerCase() === input.toLowerCase()
      );
  
      if (foundProject) {
        // Redireciona para a página do projeto
        navigate(`/projetos/${foundProject.id}`);
      } else {
        // Redireciona para a página de Projects com o termo de busca
        navigate(`/projetos?search=${encodeURIComponent(input)}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar projetos. Tente novamente mais tarde.");
    }
  };
  
  const handleButtonClick = (theme) => {
    setInput(theme);
    navigate(`/projetos`,{state: {themes: theme}});
  };

  /*const handleFormSubmit = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_7m2mxjm', 'template_p254d1l', form.current, 'A-3hcvqKw-tFCA2W3')
  };*/

  const handleQuestionSubmit = (event) => {
    event.preventDefault();

    const QuestionForm = form.current
    const NewQuestion = {
      id: 'default_id',
      titulo: QuestionForm?.question_title.value,
      mensagem: QuestionForm?.question_message.value,
      autor: QuestionForm?.user_name.value,
      email: QuestionForm?.user_email.value,
      visualizacoes: [],
      postado: false,
      resposta: 'Não respondido',
      data_de_envio: new Date(),
      data_de_postagem: new Date(0)
    }

    axios.post(`${import.meta.env.VITE_url_backend}/duvidas_add`, NewQuestion)
    .then(response => console.log(`Upload realizado com sucesso! ${response.data.duvida}`))
    .catch(error => console.log(error))

  }

  return (
    <>
      <Header />

      {/* Seção Hero */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">Observatório de Projetos - POLI/UPE</h1>
          <p className="text-2xl mb-8 text-center">Descubra projetos inovadores e inspiradores</p>
          <div className="flex w-full max-w-lg">
            <input
              type="search"
              name="searchbar"
              id="searchbar"
              className="w-full h-16 px-6 rounded-l-full bg-white bg-opacity-20 text-white placeholder-white outline-none focus:bg-white focus:text-black transition-colors duration-300"
              placeholder="Pesquise por nome, tema, palavra-chave"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => handleNavigation(input)}
              className="bg-blue-600 h-16 px-6 rounded-r-full hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Temas */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Temas em Destaque</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { image: IA, title: 'Inteligência Artificial', key_words: "Inteligência Artificial, IA, machine learning, aprendizado de máquina, redes neurais, algoritmo inteligente" },
            { image: CD, title: 'Ciência de Dados', key_words: "Ciência de dados, Data Science, Análise de dados, Mineração de dados" },
            { image: FIN, title: 'Finanças', key_words: "Finanças, Financeiro, Economia, Investimentos, Fintech" },
            { image: DT, title: 'Dívida Técnica', key_words: "Dívida Técnica, Código legado, Refatoração, Débito técnico, Manutenção de código" },
            { image: GESTAO, title: 'Gestão', key_words: "Gestão, Gerenciamento, Planejamento, Administração, Liderança, Indicadores Chave de Desempenho" },
            { image: LGPD, title: 'LGPD', key_words: "LGPD, Lei Geral de Proteção de Dados, Dados Pessoais, Proteção de Dados, Vazamento de dados, Segurança da Informação, Anonimização" },
            { image: SAUDE, title: 'Saúde', key_words: "Saúde, Sistema de Saúde, Paciente, Exame, Diagnóstico, Atendimento médico, Hospital, Hospitalar" },
            { image: EDUCACAO, title: 'Educação', key_words: "Educação, Ensino, Professor, Aprendizagem, EAD, Pedagógico, Educacional, Alfabetização" }
          ].map((theme, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(theme.key_words)}
              className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform"
            >
              <img
                src={theme.image}
                alt={theme.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
              <h3 className="absolute bottom-4 left-4 text-2xl text-white font-semibold">{theme.title}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* Seção de Contato */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold">Entre em Contato</h2>
            <p className="text-gray-600 mt-4">Tem alguma dúvida ou sugestão? Envie uma mensagem para nós!</p>
          </div>
          <form ref={form} onSubmit={handleQuestionSubmit} className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="user_name" className="block text-gray-700 font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="user_email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu e-mail"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="user_occupation" className="block text-gray-700 font-semibold mb-2">Tema</label>
              <input
                type="text"
                id="question_title"
                name="question_title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tema"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="user_message" className="block text-gray-700 font-semibold mb-2">Mensagem</label>
              <textarea
                id="question_message"
                name="question_message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escreva sua mensagem aqui"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* Seção de Rodapé */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo-upe-site.png"
              alt="UPE"
              className="h-16"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Bras%C3%A3o_UFPB.png"
              alt="UFPB"
              className="h-16"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://www.sad.pe.gov.br/images/logo.png"
              alt="SAD PE"
              className="h-16"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© {new Date().getFullYear()} Observatório de Projetos - POLI/UPE. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

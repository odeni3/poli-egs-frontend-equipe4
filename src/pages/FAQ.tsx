import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../images/mainpage.jpg'; // Certifique-se de que o caminho esteja correto

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'Como posso me inscrever em um projeto?',
      answer: 'Você pode se inscrever diretamente na página de projetos ou entrando em contato com o professor responsável.',
    },
    {
      question: 'Quem pode submeter projetos ao observatório?',
      answer: 'Alunos e professores da UPE podem submeter projetos em andamento ou concluídos.',
    },
    {
      question: 'Há algum prazo para submissão de projetos?',
      answer: 'Os projetos podem ser submetidos durante todo o semestre, sem data limite específica.',
    },
    {
      question: 'Como os projetos são avaliados?',
      answer: 'Os projetos são avaliados por uma comissão composta por professores e coordenadores, com base na inovação e relevância.',
    },
    {
      question: 'Posso participar de mais de um projeto ao mesmo tempo?',
      answer: 'Sim, desde que você consiga conciliar as atividades e tenha autorização dos orientadores envolvidos.',
    },
    {
      question: 'O observatório oferece algum tipo de certificado?',
      answer: 'Sim, participantes ativos e orientadores podem receber certificados de participação ao final do projeto.',
    },
    {
      question: 'Há algum custo para participar dos projetos?',
      answer: 'Não, todos os projetos são gratuitos e promovidos pela UPE para incentivar a pesquisa e o desenvolvimento.',
    },
    {
      question: 'Posso submeter um projeto individual?',
      answer: 'Sim, tanto projetos individuais quanto em grupo são aceitos, desde que estejam alinhados com as diretrizes da UPE.',
    },
    {
      question: 'Como posso acompanhar o andamento dos projetos?',
      answer: 'Você pode acompanhar o progresso dos projetos diretamente na plataforma, através de relatórios e atualizações periódicas.',
    },
    {
      question: 'Quais áreas de conhecimento são aceitas no observatório?',
      answer: 'O observatório aceita projetos de todas as áreas do conhecimento, com foco em inovação e impacto social.',
    }
];


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
          <h1 className="text-5xl font-bold mb-6 text-center">Perguntas Frequentes (FAQ)</h1>
          <p className="text-2xl mb-8 text-center">Tire suas dúvidas conosco</p>
        </div>
      </section>

      {/* Seção de Perguntas Frequentes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <button
                  className="w-full text-left flex items-center justify-between text-xl font-semibold text-gray-800 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-200 ${
                      openIndex === index ? '-rotate-180' : 'rotate-0'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FAQ;
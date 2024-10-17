import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Como posso me inscrever em um projeto?',
    answer: 'Você pode se inscrever diretamente na página de projetos ou entrando em contato com o professor responsável.',
  },
  {
    question: 'Quem pode submeter projetos ao observatório?',
    answer: 'Alunos e professores da UPE podem submeter projetos em andamento ou concluídos.',
  },
  {
    question: 'Os projetos recebem alguma premiação ou reconhecimento?',
    answer: 'Sim, alguns projetos podem ser indicados para prêmios acadêmicos ou destaque na instituição.',
  },
  {
    question: 'Como sei se meu projeto foi aprovado?',
    answer: 'Você receberá um e-mail de confirmação, além de poder acompanhar o status na página de projetos.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col px-[13vw] pt-10 gap-6">
        <h1 className="text-2xl font-bold text-start text-dark-color">Perguntas Frequentes (FAQ)</h1>
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-light-color rounded-md p-4">
              <button
                className="w-full text-left text-primary-color font-semibold"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-dark-color">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FAQ;

import Header from "./components/Header"
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
 
function App() {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const form:any = useRef();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/projects/${input}`);
    }
  };

  const handleNavigation = (input: string) => {
    navigate(`/projects/${input}`);
  };

  const handleButtonClick = (theme: string) => {
    setInput(theme);
    handleNavigation(theme);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    emailjs.sendForm('service_7m2mxjm', 'template_p254d1l', form.current, 'A-3hcvqKw-tFCA2W3')
    .then((res) => {
      console.log(res.text);
    }, (error) => {
      console.log(error.text);
    });
  };

  return (
    <>
      <Header/>
      <section className="pb-20">
        <div className="bg-primary-color w-full py-14 relative flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-light-color">Observatório de Projetos - POLI/UPE</h1>
            <input 
              type="search" 
              name="searchbar" 
              id="searchbar" 
              className="rounded-full w-[74%] h-[5vh] border border-light-color indent-2 mt-8"
              placeholder="Pesquise por nome, tema, palavra-chave"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
        </div>
        <div className="h-[20vh]">
          <svg className="bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1F7A8C" fill-opacity="1" d="M0,96L60,90.7C120,85,240,75,360,64C480,53,600,43,720,58.7C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>        
      </section>

      <section className="grid grid-rows-3 gap-[2vw] px-[13vw] text-light-color font-semibold pb-20 text-xl w-full">
        <section className="grid grid-cols-2 gap-[2vw]">
          <button onClick={() => handleButtonClick('Inteligência Artificial')} className="bg-cover bg-center h-[40vh] w-[36vw] relative flex items-center justify-center" style={{ backgroundImage: `url(${IA})` }}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
            <div className="relative z-10 flex justify-center">
              <h5 className='text-light-color fontbold text-2xl '>Inteligência Artificial</h5>
            </div>         
          </button>
          <button onClick={() => handleButtonClick('Ciência de Dados')} className="bg-cover bg-center h-[40vh] w-[36vw] relative flex items-center justify-center" style={{backgroundImage:`url(${CD})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
            <div className="relative z-10 flex justify-center">
              <h5 className='text-light-color fontbold text-2xl '>Ciência de Dados</h5>
            </div>             
          </button>
        </section>        
        <section className="grid grid-cols-4 gap-[2vw]">
          <button onClick={() => handleButtonClick('Finanças')} className="bg-cover bg-center h-[40vh] w-[17vw] relative flex items-center justify-center" style={{backgroundImage:`url(${FIN})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>Finanças</h5>
            </div>
          </button>        
          <button onClick={() => handleButtonClick('Divida Tecnica')} className="bg-cover bg-center h-[40vh] w-[17vw] relative flex items-center justify-center" style={{backgroundImage:`url(${DT})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>Dívida Tecnica</h5>
            </div>             
          </button>
          <button onClick={() => handleButtonClick('Gestão')} className="bg-cover bg-center h-[40vh] w-[17vw] relative flex items-center justify-center" style={{backgroundImage:`url(${GESTAO})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>Gestão</h5>
            </div>
          </button>
          <button onClick={() => handleButtonClick('LGPD')} className="bg-cover bg-center h-[40vh] relative w-[17vw] flex items-center justify-center" style={{backgroundImage:`url(${LGPD})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>LGPD</h5>
            </div>
          </button>          
        </section>
        <section className="grid grid-cols-2 gap-[2vw]">
          <button onClick={() => handleButtonClick('Saude')} className="bg-cover bg-center h-[40vh] w-[36vw] relative flex items-center justify-center" style={{backgroundImage:`url(${SAUDE})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>Saúde</h5>
            </div>
          </button>
          <button onClick={() => handleButtonClick('Educação')} className="bg-cover bg-center h-[40vh] w-[36vw] relative flex items-center justify-center" style={{backgroundImage:`url(${EDUCACAO})`}}>
            <div className="absolute inset-0 bg-primary-color opacity-50"></div>
              <div className="relative z-10 flex justify-center">
                <h5 className='text-light-color fontbold text-2xl '>Educação</h5>
            </div>   
          </button>
        </section>
      </section>  

      <section className="flex flex-col items-center w-full gap-4 pb-20">
        <h1 className="text-dark-color font-semibold text-xl">Entre em contato!</h1>
        <form action="/" method="post" className="border-solid border-2 border-light-color rounded-md w-[74%] px-4 py-2 gap-2" onSubmit={handleFormSubmit}>
          <div className="grid grid-rows-2 py-2">
            <label>Nome:</label>
            <input 
              type="name" 
              id="user_name" 
              name="user_name"
              className="rounded-md h-[6vh] border border-light-color indent-2 "
              placeholder="Nome"
            />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>E-mail:</label>
            <input 
              type="email" 
              id="user_email"
              name="user_email" 
              className="rounded-md h-[6vh] border border-light-color indent-2"
              placeholder="E-mail"
            />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>Ocupação:</label>
            <input 
              type="occupation"
              id="occupation"
              name="user_occupation"
              className="rounded-md h-[6vh] border border-light-color indent-2"
              placeholder="Ocupação"
              />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>Mensagem:</label>
            <textarea id="msg" name="user_message" className="rounded-md h-[8vh] border border-light-color indent-2" placeholder="Mensagem"></textarea>
          </div>
          <div className="py-2">
            <button type="submit" className="rounded-md bg-dark-color h-[6vh] w-full text-white">Enviar</button>
          </div>          
        </form>         
      </section>

      <section className="w-full pb-20 ">
        <div className="h-[13vh] relative overflow-hidden">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(31, 122, 140, 1)" offset="0%"></stop><stop stop-color="rgba(31, 122, 140, 1)" offset="100%"></stop></linearGradient></defs><path fill="url(#sw-gradient-0)" d="M0,20L120,26.7C240,33,480,47,720,53.3C960,60,1200,60,1440,63.3C1680,67,1920,73,2160,73.3C2400,73,2640,67,2880,63.3C3120,60,3360,60,3600,56.7C3840,53,4080,47,4320,40C4560,33,4800,27,5040,28.3C5280,30,5520,40,5760,45C6000,50,6240,50,6480,55C6720,60,6960,70,7200,75C7440,80,7680,80,7920,76.7C8160,73,8400,67,8640,53.3C8880,40,9120,20,9360,18.3C9600,17,9840,33,10080,40C10320,47,10560,43,10800,45C11040,47,11280,53,11520,50C11760,47,12000,33,12240,28.3C12480,23,12720,27,12960,35C13200,43,13440,57,13680,60C13920,63,14160,57,14400,55C14640,53,14880,57,15120,61.7C15360,67,15600,73,15840,75C16080,77,16320,73,16560,66.7C16800,60,17040,50,17160,45L17280,40L17280,100L17160,100C17040,100,16800,100,16560,100C16320,100,16080,100,15840,100C15600,100,15360,100,15120,100C14880,100,14640,100,14400,100C14160,100,13920,100,13680,100C13440,100,13200,100,12960,100C12720,100,12480,100,12240,100C12000,100,11760,100,11520,100C11280,100,11040,100,10800,100C10560,100,10320,100,10080,100C9840,100,9600,100,9360,100C9120,100,8880,100,8640,100C8400,100,8160,100,7920,100C7680,100,7440,100,7200,100C6960,100,6720,100,6480,100C6240,100,6000,100,5760,100C5520,100,5280,100,5040,100C4800,100,4560,100,4320,100C4080,100,3840,100,3600,100C3360,100,3120,100,2880,100C2640,100,2400,100,2160,100C1920,100,1680,100,1440,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path></svg>
        </div>  
        <div className="h-[25vh] w-full bg-primary-color bottom-0 flex flex-row gap-36 relative justify-center items-center">
          <img className="max-h-[15vh]" src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo-upe-site.png" alt="" />        
          <img className="max-h-[15vh]" src="https://upload.wikimedia.org/wikipedia/commons/6/69/Bras%C3%A3o_UFPB.png" alt="" />        
          <img className="max-h-[15vh] rounded-lg" src="https://www.sad.pe.gov.br/images/logo.png" alt="" />        
        </div>
        <div className="h-[10vh] relative overflow-hidden">
          <svg className="absolute bottom-0 w-full" style={{ transform: 'rotate(180deg)' }} viewBox="0 0 1440 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(31, 122, 140, 1)" offset="0%"></stop><stop stop-color="rgba(31, 122, 140, 1)" offset="100%"></stop></linearGradient></defs><path fill="url(#sw-gradient-0)" d="M0,20L120,26.7C240,33,480,47,720,53.3C960,60,1200,60,1440,63.3C1680,67,1920,73,2160,73.3C2400,73,2640,67,2880,63.3C3120,60,3360,60,3600,56.7C3840,53,4080,47,4320,40C4560,33,4800,27,5040,28.3C5280,30,5520,40,5760,45C6000,50,6240,50,6480,55C6720,60,6960,70,7200,75C7440,80,7680,80,7920,76.7C8160,73,8400,67,8640,53.3C8880,40,9120,20,9360,18.3C9600,17,9840,33,10080,40C10320,47,10560,43,10800,45C11040,47,11280,53,11520,50C11760,47,12000,33,12240,28.3C12480,23,12720,27,12960,35C13200,43,13440,57,13680,60C13920,63,14160,57,14400,55C14640,53,14880,57,15120,61.7C15360,67,15600,73,15840,75C16080,77,16320,73,16560,66.7C16800,60,17040,50,17160,45L17280,40L17280,100L17160,100C17040,100,16800,100,16560,100C16320,100,16080,100,15840,100C15600,100,15360,100,15120,100C14880,100,14640,100,14400,100C14160,100,13920,100,13680,100C13440,100,13200,100,12960,100C12720,100,12480,100,12240,100C12000,100,11760,100,11520,100C11280,100,11040,100,10800,100C10560,100,10320,100,10080,100C9840,100,9600,100,9360,100C9120,100,8880,100,8640,100C8400,100,8160,100,7920,100C7680,100,7440,100,7200,100C6960,100,6720,100,6480,100C6240,100,6000,100,5760,100C5520,100,5280,100,5040,100C4800,100,4560,100,4320,100C4080,100,3840,100,3600,100C3360,100,3120,100,2880,100C2640,100,2400,100,2160,100C1920,100,1680,100,1440,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path></svg>
        </div>            
      </section>     
    </>
  )
}

export default App

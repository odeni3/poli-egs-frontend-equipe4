import Header from "./components/Header"
import IA from './images/ia.png';
import CD from './images/cd.png';
import FIN from './images/financas.png';
import DT from './images/dt.png';
import LGPD from './images/lgpd.png';
import EDUCACAO from './images/educacao.png';
import SAUDE from './images/saude.png';
import GESTAO from './images/gestao.png';

function App() {
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
            />
        </div>
        <div className="h-[20vh]">
          <svg className="bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1F7A8C" fill-opacity="1" d="M0,96L60,90.7C120,85,240,75,360,64C480,53,600,43,720,58.7C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>        
      </section>

      <section className="grid grid-rows-3 gap-[2vw] px-[13vw] opacity-75 text-light-color font-semibold pb-20 text-xl w-full">
        <section className="grid grid-cols-2 gap-[2vw]">
          <button className="bg-cover bg-center h-[40vh] w-[36vw] flex items-center justify-center" style={{backgroundImage:`url(${IA})`}}>
            Inteligência Artificial
          </button>
          <button className="bg-cover bg-center h-[40vh] w-[36vw] flex items-center justify-center" style={{backgroundImage:`url(${CD})`}}>
            Ciência de Dados
          </button>
        </section>        
        <section className="grid grid-cols-4 gap-[2vw]">
          <button className="bg-cover bg-center h-[40vh] w-[17vw] flex items-center justify-center" style={{backgroundImage:`url(${FIN})`}}>
            Finanças
          </button>        
          <button className="bg-cover bg-center h-[40vh] w-[17vw] flex items-center justify-center" style={{backgroundImage:`url(${DT})`}}>
            Divida Tecnica
          </button>
          <button className="bg-cover bg-center h-[40vh] w-[17vw] flex items-center justify-center" style={{backgroundImage:`url(${GESTAO})`}}>
            Gestão
          </button>
          <button className="bg-cover bg-center h-[40vh] w-[17vw] flex items-center justify-center" style={{backgroundImage:`url(${LGPD})`}}>
            LGPD
          </button>          
        </section>
        <section className="grid grid-cols-2 gap-[2vw]">
          <button className="bg-cover bg-center h-[40vh] w-[36vw] flex items-center justify-center" style={{backgroundImage:`url(${SAUDE})`}}>
            Saude           
          </button>
          <button className="bg-cover bg-center h-[40vh] w-[36vw] flex items-center justify-center" style={{backgroundImage:`url(${EDUCACAO})`}}>
            Educação
          </button>
        </section>
      </section>  

      <section className="flex flex-col items-center w-full gap-4 pb-20">
        <h1 className="text-dark-color font-semibold text-xl">Entre em contato!</h1>
        <form action="/" method="post" className="border-solid border-2 border-light-color rounded-md w-[74%] px-4 py-2 gap-2">
          <div className="grid grid-rows-2 py-2">
            <label>Nome:</label>
            <input 
              type="name" 
              id="name" 
              className="rounded-md h-[6vh] border border-light-color indent-2 "
              placeholder="Nome"
            />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>E-mail:</label>
            <input 
              type="email" 
              id="email" 
              className="rounded-md h-[6vh] border border-light-color indent-2"
              placeholder="E-mail"
            />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>Ocupação:</label>
            <input 
              type="occupation"
              id="occupation"
              className="rounded-md h-[6vh] border border-light-color indent-2"
              placeholder="Ocupação"
              />
          </div>
          <div className="grid grid-rows-2 py-2">
            <label>Mensagem:</label>
            <textarea id="msg" className="rounded-md h-[8vh] border border-light-color indent-2" placeholder="Mensagem"></textarea>
          </div>
          <div className="py-2">
            <button type="submit" className="rounded-md bg-dark-color h-[6vh] w-full text-white">Enviar</button>
          </div>          
        </form>         
      </section>
     
    </>
  )
}

export default App

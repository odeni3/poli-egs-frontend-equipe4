import Footer from '../components/Footer'
import Header from '../components/Header'

function Sobre() {
  return (
    <>
    <Header/>
    <section className="pb-20">
        <div className="bg-primary-color w-full py-14 relative flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-light-color">Observatório de Projetos - POLI/UPE</h1>
        </div>
        <div className="h-[20vh]">
          <svg className="bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1F7A8C" fill-opacity="1" d="M0,96L60,90.7C120,85,240,75,360,64C480,53,600,43,720,58.7C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>        
      </section>
      <section>
        <div className='flex items-center justify-around pb-20'>
            <div>
                <h2 className='text-4xl font-semibold'>Sobre Nós</h2>
                <p className='max-w-[45vw] mt-5'>O projeto do Observatório de Projetos - POLI/UPE foi uma ideia construída dentro da disciplina de Engenharia de Software da Escola Politécinca de Pernambuco. A ideia, construída por estudantes graduandos e pós-graduandos de Engenharia da Computação, consiste em possibilitar que todos os projetos já desenvolvidos e todos aqueles que ainda serão construídos possam ser eternizados em um grande repositório, apresentando suas caracterísiticas únicas, tecnologias, pessoas responsáveis e até mesmo, as organizações e pessoas parceiras que queriam transformar os seus sonhos em realidade.</p>
            </div>
            <img className='max-h-[40vh] rounded-2xl' src="https://s2.glbimg.com/smbJLb6Jt92GrMIDOFacclQ7K0o=/s.glbimg.com/jo/g1/f/original/2015/05/11/poli1.jpg" alt="" />
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Sobre
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { ProjectInt } from './Projects';
import { useParams } from 'react-router-dom';


function Project() {
    const { slug } = useParams()

    const [Data, setData] = useState<ProjectInt[]>([]);

    const projects = [
        {
          key: "1",
          titulo: "Tracy-TD",
          descricao: "Sistema de gerenciamento de dívidas técnicas.",
          cliente: "Prof. Rodrigo - UFPB",
          pitch: "PVKX6MnruBI?si=3VKzOwaxmSynC84z",
          tema: "Dividas Tecnicas",
          slug: "tracytd",
          semestre: "2023.1"
        },
        {
          key: "2",
          titulo: "SAD LGPD",
          descricao: "Website para divulgação e transparência sobre o uso dos dados de servidores do estado de Pernambuco, de acordo com a Lei Geral de Proteção de Dados.",
          cliente: "Secretaria de Administração do Estado de Pernmabuco",
          pitch: "5tqi8f88koI?si=y7uz-RyBpzxqDBep",
          tema: "LGPD",
          slug: "sadlgpd",
          semestre: "2023.2"
    
        }
      ]

      useEffect(() => {
        axios.get(`https://ecomp-egs.onrender.com/projetos/${slug}`).then(function (response) {
          setData(response.data)
        })
        let c:number = 0;
        while(projects[c]["slug"] != slug) {
            c++;
        }
        setData(projects[c])
      }, []);

  return (
    <>
    <Header/>
    <main className='space-y-12'>
        <section className='flex flex-col items-center w-full gap-4 pb-20 mt-10'>
            <h1 className='text-3xl font-bold tracking-tight text-dark-color mb-8'>{Data.titulo}</h1>
            <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+Data.pitch} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </section>
        <div className='w-full py-8 relative flex flex-col items-center'>
            <section className='w-[74%] mb-10'>
                <h2 className='text-2xl font-bold text-dark-color mb-1'>Sobre</h2>
                <p className='mt-1 text-gray-600'>{Data.descricao}</p>
            </section>
            <section className='w-[74%]'>
                <div></div>
            </section>
            <section className='w-[74%]'>
            </section>
            <section className='space-y-12 w-[74%]'>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Cliente</h2>
                    <p className='mt-1 text-gray-600'>{Data.cliente}</p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Semestre</h2>
                    <p className='mt-1 text-gray-600'>{Data.semestre}</p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Repositório</h2>
                    <p className='mt-1 text-gray-600'>Lorem ispum</p>
                </div>
            </section>
        </div>
    </main>
    </>
  )
}

export default Project
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { ProjectInt } from './Projects';


function Project() {
    const { slug } = useParams()


    const [Data, setData] = useState<ProjectInt>({});

      useEffect(() => {
        axios.get(`https://ecomp-egs.onrender.com/projetos/${slug}`).then(function (response) {
          setData(response.data[0])
        })
      }, []);

  return (
    <>
    <Header/>
    <main>
        <section className='flex flex-col items-center w-full gap-4 pb-20 mt-10'>
            <h1 className='text-3xl font-bold tracking-tight text-dark-color mb-8'>{Data.titulo}</h1>
            <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+Data.pitch} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </section>
        <div className='w-full py-8 relative grid grid-cols-2 justify-items-end w-[70vw] m-auto'>
            <section className='w-[74%] mb-10'>
                <h2 className='text-2xl font-bold text-dark-color mb-1'>Sobre</h2>
                <p className='mt-1 text-gray-600'>{Data.descricao}</p>
            </section>
            <section className='w-[74%]'>
                <h2 className='text-2xl font-bold text-dark-color mb-1'>Equipe</h2>
                <ul className='mb-1 grid grid-cols-2'>
                  {Data.equipe?.split(";").map((pessoa) => (
                    <li>{pessoa}</li>
                  ))}
                </ul>
            </section>
            <section className='w-[74%] mt-8'>
              <h2 className='text-2xl font-bold text-dark-color mb-1'>Tecnologias Utilizadas</h2>
              <ul className='mb-5 grid grid-cols-2'>
                {Data.tecnologias_utilizadas?.split(";").map((pessoa) => (
                  <li>{pessoa}</li>
                ))}
              </ul>
            </section>
                <div className='w-[74%] mt-8'>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Pessoa/Organização Parceira</h2>
                    <p className='mt-1 text-gray-600'>{Data.cliente}</p>
                </div>
                <div className='w-[74%] mt-8'>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Semestre</h2>
                    <p className='mt-1 text-gray-600'>{Data.semestre}</p>
                </div>
                <div className='w-[74%] mt-8'>
                    <h2 className='text-2xl font-bold text-dark-color mb-1'>Repositório</h2>
                    <p className='mt-1 text-blue-400 text-decoration: underline'><a href={Data.link_repositorio} target='_blank'>Link para Repositório no GitHub</a></p>
                </div>
        </div>
    </main>
    </>
  )
}

export default Project
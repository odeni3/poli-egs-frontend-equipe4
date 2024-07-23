import { useEffect } from 'react';
import Header from '../components/Header';
import { useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export interface ProjectInt {
  //key: string;
  titulo?: string;
  descricao?: string;
  equipe?: string;
  cliente?: string;
  pitch?: string;
  tema?: string;
  semestre?: string;
  video_tecnico?: string;
  tecnologias_utilizadas?: string;
  palavras_chave?: string;
  id?: string,
  link_repositorio?: string;
}

function Projects() {
  const { slug } = useParams();
  const [Input, setInput] = useState(slug || '')
  const [InputMembers, setInputMembers] = useState('')
  const [Themes, setThemes] = useState('')
  const [Semester, setSemester] = useState('')
  const [Card, setCard] = useState<ProjectInt[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSemester, setselectedSemester] = useState<string[]>([]);
  
  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then(function (response) {
      setCard(response.data)
    })
    axios.get('https://ecomp-egs.onrender.com/temasProjeto').then(function (response) {
      setSelectedThemes(response.data.temas)
    })
    axios.get('https://ecomp-egs.onrender.com/semestreProjetos').then(function (response) {
      setselectedSemester(response.data.semestres)
    })
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMembers(event.target.value);
  };

  const filteredCards = Card.filter((project) => {    
    const input = Input.toLowerCase();
    const inputMembers = InputMembers.toLowerCase();
    const inputThemes = Themes.toLowerCase();
    const inputSemester = Semester.toLowerCase();
    return (
      (
        project.titulo?.toLowerCase().includes(input) ||
        project.palavras_chave?.toLowerCase().includes(input) ||
        project.tema?.toLowerCase().includes(input)
      ) && (
        project.equipe?.toLowerCase().includes(inputMembers)
      ) && (
        project.tema?.toLowerCase().includes(inputThemes)
      ) && (
        project.semestre?.toLowerCase().includes(inputSemester)
      )
    );
  });

  return (
    <>
      <Header />
      <h1 className="px-[13vw] pt-10 text-2xl font-bold text-start text-dark-color">Projetos</h1>     
      <section className="flex flex-row gap-[2vw] px-[13vw] pt-10 w-full">        
        <section className="w-[23vw]">        
          <form action="/" method="post" className="border-solid border-2 border-light-color w-full px-4 py-2">
            <div className='flex justify-center w-full pb-2'>
              <h1 className="text-dark-color font-medium text-base">Filtro de pesquisa</h1>
            </div>            
            <div className="grid grid-rows-2 py-1">
              <label>Área do projeto:</label>
              <Listbox value={Themes} onChange={setThemes}>
                <div className="relative">
                  <ListboxButton className="relative w-full h-[6vh] indent-2 text-left border-b border-light-color cursor-default focus:outline-none focus:border-b-2 focus:border-sky-700">
                    <h1>{Themes}</h1>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2">
                      <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg z-50  focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in " 
                  >
                    {selectedThemes.map((theme) => (
                      <ListboxOption
                        key={theme}
                        value={theme}
                        className="group relative cursor-default select-none py-1 pl-2 text-gray-900 data-[focus]:bg-sky-700 data-[focus]:text-white"
                      >
                        <h1>{theme}</h1>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
            <div className="grid grid-rows-2 py-1">
              <label>Ano/Semestre:</label>
              <Listbox value={Semester} onChange={setSemester}>
                <div className="relative">
                  <ListboxButton className="relative w-full h-[6vh] indent-2 text-left border-b border-light-color focus:outline-none focus:border-b-2 focus:border-sky-700">
                    <h1>{Semester}</h1>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2">
                      <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg z-10"
                  >
                    {selectedSemester.map((semester) => (
                      <ListboxOption
                        key={semester}
                        value={semester}
                        className="group relative select-none py-1 pl-2 text-gray-900 data-[focus]:bg-sky-700 data-[focus]:text-white"
                      >
                        <h1>{semester}</h1>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
            <div className="grid grid-rows-2 py-1">
              <label>Pesquisar (nome, palavra-chave)</label>
              <input 
                type="pesquisa" 
                id="pesquisa" 
                className="w-full h-[6vh] border-b border-light-color indent-2 focus:outline-none focus:border-b-2 focus:border-sky-700"
                placeholder="Ex: Tracy-TD/Inteligência artificial..."
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-rows-2 py-1">
              <label>Integrantes</label>
              <input 
                type="integrantes" 
                id="integrantes" 
                className="w-full h-[6vh] border-b border-light-color indent-2 focus:outline-none focus:border-b-2 focus:border-sky-700"
                placeholder="Ex: Ana Karla/Arthur Xavier..."
                onChange={handleInputMembersChange}
              />
            </div>
            <div className="py-2">
              <button type="submit" className="rounded-md bg-primary-color h-[6vh] w-full text-white">Enviar</button>
            </div>          
          </form> 
        </section>
        <section className='grid grid-cols-2 gap-[1vw]'>
          {filteredCards.map((project) => (
              <div
                className="flex flex-col w-[23vw] h-[35vh] border-solid border-2 border-light-color p-4 gap-4"
              >
                <section className="flex flex-row gap-2">
                  <div className=" rounded-md w-[15vw] h-[20vh] bg-primary-color"></div>
                  <div className='flex flex-col items-start w-full gap-2'>
                    <h1 className="text-2xl text-primary-color font-normal">{project.titulo}</h1>
                    <p className='text-sm line-clamp-3'>{project.descricao}</p>
                  </div>
                </section>
                <button type="submit" className="rounded-md bg-primary-color h-[6vh] w-full text-white"><a href={`/projects/selected/` + project.id}>Ver mais</a></button>
              </div>
            ))}
          
        </section>
      </section>         
    </>    
  )
}

export default Projects


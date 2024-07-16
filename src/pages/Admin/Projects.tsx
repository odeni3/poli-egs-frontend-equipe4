import { Table } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import ModalButton from "../../components/ModalDelete";
import { ProjectInt } from "../Projects";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },
];


function ProjectsAdmin () {

  const handlePost = ( setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    axios.post(`https://ecomp-egs.onrender.com/projeto_add`, NewProject)
    setOpen(false);
  }

  const [Project, setProject] = useState<ProjectInt[]>([]);
  const [open, setOpen] = useState(false)
  const [NewProject, setNewProject] = useState({
    titulo: "",
    descricao: "",
    equipe: "",
    cliente: "",
    pitch: "",
    tema: "",
    semestre: "",
    video_tecnico: "",
    tecnologias_utilizadas: "",
    palavras_chave: "",
    id: "",
    link_repositorio: ""
  })
  
  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then(function (response) {
      setProject(response.data)
    })
  }, []);

  return (
    <>
      <HeaderAdmin />
      <div className="flex flex-col px-[13vw] pt-10 gap-6">
        <section className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-start text-dark-color ">Projetos</h1>
          <button type="submit" onClick={() => setOpen(true)} className="rounded-md bg-primary-color h-full w-[15vw] text-white">Novo projeto</button>
        </section>
        <input 
          type="search" 
          name="searchbar" 
          id="searchbar" 
          className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] "
          placeholder="Pesquise por nome, tema, palavra-chave"
        />
      </div>  
      <div className="px-[13vw] pt-10">
        <Table className="h-auto w-full">
          <thead>
            {columns.map((column) => (
              <th key={column.key} className={column.key === "titulo" ? "text-left" : "text-right "}>{column.label}</th>
            ))}
          </thead>    
          <tbody >
            {Project.map((project) => (
              <tr key={project.id} className="border border-light-color">
                {columns.map((column) => (
                  <td key={column.key} className={`items-center py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>
                    {column.key == "editar" ? (
                      <button className="text-dark-color h-full w-5">
                        <PencilSquareIcon className="h-5 w-5"/>
                      </button>
                    ) : column.key == "excluir" ? (
                      <ModalButton
                        title={project.titulo}
                        id={project.id}
                      />
                    ) : (
                      project.titulo
                    )
                  }
                  </td>
                ))}
              </tr>
            ))}   
          </tbody>    
        </Table>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[40vw] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="text-base font-semibold leading-6 text-gray-900">
                    Cadastrar novo projeto
                  </DialogTitle>
                </div>
              </div>
            </div>
            <form action="POST">
              <div className="grid grid-cols-2 justify-items-center gap-y-[2vh]">
                <div>
                  <h3 className="text-lg font-semibold">Titulo</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Titulo" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, titulo:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Equipe</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pessoa1;Pessoa2;Pessoa3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, equipe:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pessoa/Organização Parceira</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: POLI/UPE" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, cliente:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tema</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: Engenharia de Software" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, tema:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Semestre</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: 2024.1" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, semestre:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tecnologias Utilizadas</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Tecnologia1;Tecnologia2;Tecnologia3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, tecnologias_utilizadas:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Pitch</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pitch" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, pitch:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Vídeo Técnico</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Vídeo Técnico" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, video_tecnico:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Repositório</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Repositório" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, link_repositorio:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Palavras Chave</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Palavra1;Palavra2;Palavra3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, palavras_chave:e.target.value}))}/>
                </div>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold">Descrição</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Descrição" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, descricao:e.target.value}))}/>
                </div>
              </div>
            </form>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
                onClick={() => handlePost(setOpen)}
              >
                Enviar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
      </Dialog>

    </>
  )
}

export default ProjectsAdmin
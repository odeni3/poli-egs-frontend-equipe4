import { Table } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from 'axios';
import ModalButton from "../../components/ModalDelete";
import { ProjectInt } from "../Projects";

const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },
];


function ProjectsAdmin () {

  const [Project, setProject] = useState<ProjectInt[]>([]);
  
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
          <button type="submit" className="rounded-md bg-primary-color h-full w-[15vw] text-white">Novo projeto</button>
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
    </>
  )
}

export default ProjectsAdmin
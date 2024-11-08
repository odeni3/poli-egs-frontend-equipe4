import { Table } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import { SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import ModalDelete from "../../components/ModalDelete";
import { ProjectInt } from "../Projects";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalUpdate from "../../components/ModalUpdate";
import { FaFileUpload } from "react-icons/fa";

const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },
];


function ProjectsAdmin () {

  const [Input, setInput] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handlePost = (setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    axios.post(`https://ecomp-egs.onrender.com/projeto_add`, NewProject)
      .then(() => {
        return axios.get('https://ecomp-egs.onrender.com/projetos');
      })
      .then(response => {
        setProject(response.data);
        var c = 0;
        while(c != -1) {
          if(response.data[c].titulo === NewProject.titulo) {
            handleSubmitFile(response.data[c].id);
            c = -1
          } else {
            c++
          }
        }
        setOpen(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar projeto:', error);
      });
  };

  const handleUpdate = () => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then(response => {
      setProject(response.data);
    }).catch(error => {
      console.error('Erro ao atualizar projetos:', error);
    });
  };

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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitFile = async (id: string) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(`https://ecomp-egs.onrender.com/upload_logo_projeto/?id_projeto=${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  };
  //const [EditProject, setEditProject] = useState<ProjectInt>({})
  
  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then(function (response) {
      setProject(response.data)
    })
  }, []);

  const filteredProject = Array.isArray(Project)  ? Project.filter((project) => {    
    const input = Input.toLowerCase();
    return (
      (
        project.titulo?.toLowerCase().includes(input) ||
        project.palavras_chave?.toLowerCase().includes(input) ||
        project.tema?.toLowerCase().includes(input)
      ) 
    );
  }) : [];

  return (
    <>
    <HeaderAdmin />
    <div className="flex flex-col px-[13vw] pt-10 gap-6">
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-start text-dark-color">Projetos</h1>
        <button
          type="submit"
          onClick={() => setOpen(true)}
          className="rounded-md bg-primary-color h-full w-[15vw] text-white"
        >
          Novo projeto
        </button>
      </section>
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] focus:ring-2 focus:ring-primary-color transition-all"
        placeholder="Pesquise por nome, tema, palavra-chave"
        value={Input}
        onChange={handleInputChange}
      />
    </div>

    <div className="px-[13vw] pt-10">
      <Table className="h-auto w-full">
        <thead className="bg-primary-color text-white">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`py-3 ${
                column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"
              }`}
            >
              {column.label}
            </th>
          ))}
        </thead>
        <tbody>
          {filteredProject.map((project) => (
            <tr key={project.id} className="border border-light-color hover:bg-gray-100 transition duration-300">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`py-3 ${
                    column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"
                  }`}
                >
                  {column.key === "editar" ? (
                    <ModalUpdate project={project} handleUpdate={handleUpdate} />
                  ) : column.key === "excluir" ? (
                    <ModalDelete title={project.titulo} id={project.id} handleUpdate={handleUpdate} />
                  ) : (
                    project.titulo
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    {/* Modal de criação de projeto */}
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[40vw]">
        <div className="bg-[#D8DBE2] pt-5 sm:p-3 sm:pb-4">
          <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-dark-color">
            Cadastrar novo projeto
          </DialogTitle>
        </div>
        <form>
          <div className="grid grid-cols-2 justify-start pt-4 px-6 gap-y-[2vh]">
            <div>
              <h3 className="text-lg font-semibold">Titulo</h3>
              <input
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Titulo"
                className="focus:outline-none border-b-2 w-[15vw]"
                onChange={(e) => setNewProject({ ...NewProject, titulo: e.target.value })}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Equipe</h3>
              <input
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Pessoa1;Pessoa2;Pessoa3"
                className="focus:outline-none border-b-2 w-[15vw]"
                onChange={(e) => setNewProject({ ...NewProject, equipe: e.target.value })}
              />
            </div>
            {/* Outras entradas do formulário */}
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
    </Dialog>
  </>
  )
}

export default ProjectsAdmin
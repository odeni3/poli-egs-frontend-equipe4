import { Table } from "react-bootstrap";
import HeaderUser from "../../components/HeaderUser";
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

function Userprojects() {
  const [Input, setInput] = useState<string>("");
  const [Project, setProject] = useState<ProjectInt[]>([]);
  const [open, setOpen] = useState(false);
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
  });
  const [selectedFile, setSelectedFile] = useState(null);

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
        while(c !== -1) {
          if(response.data[c].titulo === NewProject.titulo) {
            handleSubmitFile(response.data[c].id);
            c = -1;
          } else {
            c++;
          }
        }
        setOpen(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar projeto:', error);
      });
  };

  const handleUpdate = () => {
    axios.get('https://ecomp-egs.onrender.com/projetos')
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar projetos:', error);
      });
  };

  const handleSubmitFile = async (id: string) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        await axios.post(`https://ecomp-egs.onrender.com/upload_logo_projeto/?id_projeto=${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  };

  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/projetos').then(response => {
      setProject(response.data);
    });
  }, []);

  const filteredProject = Array.isArray(Project) ? Project.filter((project) => {
    const input = Input.toLowerCase();
    return (
      project.titulo?.toLowerCase().includes(input) ||
      project.palavras_chave?.toLowerCase().includes(input) ||
      project.tema?.toLowerCase().includes(input)
    );
  }) : [];

  return (
    <>
      <HeaderUser />
      <div className="flex flex-col px-[13vw] pt-10 gap-6">
        <section className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-color">Projetos</h1>
          <button 
            onClick={() => setOpen(true)} 
            className="rounded-md bg-primary-color text-white py-2 px-6 hover:bg-primary-color-dark transition duration-200"
          >
            Novo projeto
          </button>
        </section>
        <input 
          type="search" 
          className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] focus:ring-2 focus:ring-primary-color transition-all"
          placeholder="Pesquise por nome, tema, palavra-chave"
          value={Input}
          onChange={handleInputChange}
        />
      </div>
      <div className="px-[13vw] pt-10">
        <Table className="w-full">
          <thead className="bg-primary-color text-white">
            {columns.map((column) => (
              <th key={column.key} className={`py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>{column.label}</th>
            ))}
          </thead>
          <tbody>
            {filteredProject.map((project) => (
              <tr key={project.id} className="border border-light-color hover:bg-gray-100 transition duration-300">
                {columns.map((column) => (
                  <td key={column.key} className={`py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>
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
            {/* Formulário com campos de entrada */}
          </form>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <button onClick={() => handlePost(setOpen)} className="rounded-md bg-primary-color px-4 py-2 text-white hover:bg-primary-color-dark transition duration-200">
              Enviar
            </button>
            <button onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-2 text-gray-900 hover:bg-gray-200 transition duration-200">
              Cancelar
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default Userprojects;

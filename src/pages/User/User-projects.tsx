import { Table } from "react-bootstrap";
import HeaderUser from "../../components/HeaderUser";
import { SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import { ProjectInt } from "../Projects";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaFileUpload } from "react-icons/fa";


const statusOptions = ["Em andamento", "Concluído", "Pendente"];


const statusColors = {
  "Em andamento": "bg-yellow-500 text-white",
  "Concluído": "bg-green-500 text-white",
  "Pendente": "bg-red-500 text-white",
};



const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "status", label: "Status" },  // Adicionando a coluna de Status
];

function Userprojects
() {
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

  const handlePost = () => {
    axios.post(`https://ecomp-egs.onrender.com/projeto_add`, NewProject)
      .then(() => {
        return axios.get('https://ecomp-egs.onrender.com/projetos');
      })
      .then(response => {
        setProject(response.data);
        const createdProject = response.data.find((project: ProjectInt) => project.titulo === NewProject.titulo);
        if (createdProject) {
          handleSubmitFile(createdProject.id);  // Envia o arquivo logo após criar o projeto
        }
        setOpen(false);  // Fecha o modal após a criação do projeto
      })
      .catch(error => {
        console.error('Erro ao adicionar projeto:', error);
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
        console.log('Arquivo enviado com sucesso');
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
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
          <h1 className="text-2xl font-bold text-start text-dark-color ">Projetos</h1>
          <button type="submit" onClick={() => setOpen(true)} className="rounded-md bg-primary-color h-full w-[15vw] text-white">Novo projeto</button>
        </section>
        <input 
          type="search" 
          name="searchbar" 
          id="searchbar" 
          className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] "
          placeholder="Pesquise por nome, tema, palavra-chave"
          value={Input}
          onChange={handleInputChange}
        />
      </div>  
      <div className="px-[13vw] pt-10">
        <Table className="h-auto w-full">
          <thead>
            {columns.map((column) => (
              <th key={column.key} className={column.key === "titulo" ? "text-left" : "text-right "}>{column.label}</th>
            ))}
          </thead>    
          <tbody>
            {filteredProject.map((project) => {
              // Sorteia um status aleatório para cada projeto
              const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

              return (
                <tr key={project.id} className="border border-light-color">
                  {columns.map((column) => (
                    <td key={column.key} className={`items-center py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>
                      {column.key === "titulo" ? (
                        project.titulo // Exibe o título do projeto
                      ) : column.key === "status" ? (  // Exibe o status com cor
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            randomStatus === "Em andamento"
                              ? "bg-yellow-500"
                              : randomStatus === "Concluído"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {randomStatus}
                        </span>
                      ) : column.key === "editar" ? (
                        <ModalUpdate project={project} handleUpdate={handleUpdate} />
                      ) : column.key === "excluir" ? (
                        <ModalDelete title={project.titulo} id={project.id} handleUpdate={handleUpdate} />
                      ) : null}
                    </td>
                  ))}
                </tr>
              );
            })}
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
            <div className="bg-[#D8DBE2] pt-5 sm:p-3 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-dark-color">
                    Cadastrar novo projeto
                  </DialogTitle>
                </div>
              </div>
            </div>
            <form action="POST">
            <div className="grid grid-cols-2 justify-start pt-4 px-6 gap-y-[2vh]">
              <div>
                <h3 className="text-lg font-semibold">Titulo</h3>
                <input type="text" name="titulo" id="titulo" placeholder="Titulo" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, titulo: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Equipe</h3>
                <input type="text" name="equipe" id="equipe" placeholder="Pessoa1;Pessoa2;Pessoa3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, equipe: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Organização Parceira</h3>
                <input type="text" name="cliente" id="cliente" placeholder="Ex: POLI/UPE" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, cliente: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tema</h3>
                <input type="text" name="tema" id="tema" placeholder="Ex: Engenharia de Software" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, tema: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Semestre</h3>
                <input type="text" name="semestre" id="semestre" placeholder="Ex: 2024.1" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, semestre: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tecnologias Utilizadas</h3>
                <input type="text" name="tecnologias_utilizadas" id="tecnologias_utilizadas" placeholder="Tecnologia1;Tecnologia2;Tecnologia3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, tecnologias_utilizadas: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Link do Pitch</h3>
                <input type="text" name="pitch" id="pitch" placeholder="Pitch" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, pitch: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Link do Vídeo Técnico</h3>
                <input type="text" name="video_tecnico" id="video_tecnico" placeholder="Vídeo Técnico" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, video_tecnico: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Repositório</h3>
                <input type="text" name="link_repositorio" id="link_repositorio" placeholder="Repositório" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, link_repositorio: e.target.value})} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Palavras Chave</h3>
                <input type="text" name="palavras_chave" id="palavras_chave" placeholder="Palavra1;Palavra2;Palavra3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, palavras_chave: e.target.value})} />
              </div>
              <div className="mb-10">
                <h3 className="text-lg font-semibold">Descrição</h3>
                <input type="text" name="descricao" id="descricao" placeholder="Descrição" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => setNewProject({...NewProject, descricao: e.target.value})} />
              </div>
              <div className="w-[15vw] relative">
                <input type="file" className="hidden" name="logo" id="logo" onChange={(e: any) => setSelectedFile(e.target.files[0])} />
                <label htmlFor="logo" className={`absolute flex items-center px-3 py-2 rounded-md w-full text-dark-color text-xs font-semibold cursor-pointer ${!selectedFile ? "bg-green-500" : "bg-[#D8DBE2]"}`}>
                  {selectedFile ? <span>Modificar Logo</span> : <span>Atualizar Logo</span>}
                  <FaFileUpload className="ml-2" />
                </label>
              </div>
            </div>

            </form>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
              onClick={handlePost}  // Altere de onClick={() => handlePost(setOpen)} para handlePost
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
  );
}

export default Userprojects
;

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
  const [projetos, setProjetos] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handlePost = (setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    if (!NewProject.titulo || !NewProject.descricao) {
      console.error('Os campos obrigatórios não foram preenchidos.');
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    axios.post(`https://poli-egs-fastapi-1.onrender.com/projeto_add`, NewProject)
      .then(() => {
        return axios.get('https://poli-egs-fastapi-1.onrender.com/projetos');
      })
      .then((response) => {
        const mappedData = response.data.map((item: any) => ({
          id: item.id,
          titulo: item.titulo || "Título não disponível",
          palavras_chave: item.palavras_chave || "",
          tema: item.tema || "",
          descricao: item.descricao || "",
          equipe: item.equipe || "",
          cliente: item.cliente || "",
          pitch: item.pitch || "",
          semestre: item.semestre || "",
          video_tecnico: item.video_tecnico || "",
          tecnologias_utilizadas: item.tecnologias_utilizadas || "",
          link_repositorio: item.link_repositorio || "",
        }));
        setProject(mappedData);
        setOpen(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar projeto:', error);
      });
  };
  

  const handleUpdate = () => {
    axios.get('https://poli-egs-fastapi-1.onrender.com/projetos').then(response => {
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
        const response = await axios.post(`https://poli-egs-fastapi-1.onrender.com/upload_logo_projeto/?id_projeto=${id}`, formData, {
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
    axios.get('https://poli-egs-fastapi-1.onrender.com/projetos')
      .then((response) => {
        console.log('Dados recebidos da API:', response.data);
        const projetos = response.data.projetos;
        if (Array.isArray(projetos)) {
          const mappedData = projetos.map((item: any) => ({
            id: item.id,
            titulo: item.titulo || "Sem título",
            equipe: item.equipe || "Equipe não informada",
            cliente: item.cliente || "Cliente não informado",
            descricao: item.descricao || "Sem descrição",
            semestre: item.semestre || "Semestre não informado",
            tema: item.tema || "Tema não informado",
            tecnologias_utilizadas: item.tecnologias_utilizadas || [],
            palavras_chave: item.palavras_chave || [],
            link_repositorio: item.link_repositorio || "Sem repositório",
          }));
          setProjetos(mappedData);
        } else {
          console.error('A propriedade "projetos" não é um array:', projetos);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar os projetos:', error);
      });
  }, []);
  
  

  const filteredProject = Array.isArray(projetos) ? projetos.filter((project) => {    
    const input = Input.toLowerCase();
    return (
      (project.titulo && project.titulo.toLowerCase().includes(input)) ||
      (project.palavras_chave && project.palavras_chave.toLowerCase().includes(input)) ||
      (project.tema && project.tema.toLowerCase().includes(input))
    );
  }) : [];
  

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
          <tbody >
            {filteredProject.map((project) => (
              <tr key={project.id} className="border border-light-color">
                {columns.map((column) => (
                  <td key={column.key} className={`items-center py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>
                    {column.key == "editar" ? (
                      <ModalUpdate
                        project={project}
                        handleUpdate={handleUpdate}
                      />
                    ) : column.key == "excluir" ? (
                      <ModalDelete
                        title={project.titulo}
                        id={project.id}
                        handleUpdate={handleUpdate}
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
                  <input type="text" name="titulo" id="titulo" placeholder="Titulo" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, titulo:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Equipe</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pessoa1;Pessoa2;Pessoa3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, equipe:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Organização Parceira</h3>
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
                <div className="w-[15vw] relative">
                  <input type="file" className="hidden" name="logo" id="logo" onChange={(e: any) => setSelectedFile(e.target.files[0])}/>
                  <label
                    htmlFor="logo"
                    className={`absolute flex items-center px-3 py-2 rounded-md w-full text-dark-color text-xs font-semibold cursor-pointer ${
                      !selectedFile ? "bg-green-500" : "bg-[#D8DBE2]"
                    } hover:opacity-60 select-none whitespace-nowrap`}
                    style={{ 
                      textOverflow: 'ellipsis', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {selectedFile ? (
                      <span>Modificar Logo</span>
                    ) : (
                      <span>Atualizar Logo</span>
                    )}
                    <FaFileUpload className="ml-2" />
                  </label>
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
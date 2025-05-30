import { Table } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import ModalDelete from "../../components/ModalDelete";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalUpdate from "../../components/ModalUpdate";
import ModalComment from "../../components/ModalComment";
import ModalLikes from "../../components/ModalLikes";
import { FaFileUpload } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "curtir", label: "Curtir"},
  { key: "comentar", label: "Comentar" },
  { key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },
  { key: "revisar", label: "Status" },
  { key: "botao", label: "" },
  { key: "botao2", label: "" },
];


function ProjectsAdmin() {
  const [Input, setInput] = useState<string>("");
  const [Project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [NewProject, setNewProject] = useState({
    titulo: "",
    descricao: "",
    equipe: [] as string[], // Agora é um array de strings
    cliente: "",
    pitch: "",
    tema: "",
    semestre: "",
    video_tecnico: "",
    tecnologias_utilizadas: [] as string[], // Agora é um array de strings
    palavras_chave: [] as string[], // Agora é um array de strings
    id: "",
    link_repositorio: "",
    revisado: "",
    curtidas: 0,
    user_curtidas_email: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const userIsAdmin = localStorage.getItem('isAdmin') === 'true'; // Verificando se o usuário é admin no localStorage
  
  if (!userIsAdmin) {
    // Se não for admin, redireciona para a página de usuário
    return <Navigate to="/user-projects" />;
  }

  const handleUpdate = () => {
    axios.get(`${import.meta.env.VITE_url_backend}/projetos/`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Erro ao atualizar projetos:', error));
  };

  const handleApprove = (project) => {
    const token = localStorage.getItem('authToken');
    axios.put(`${import.meta.env.VITE_url_backend}/projeto_revisado/${project.id}/?novo_revisado=Aprovado&id_token=${token}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        window.location.reload();
      })
        .catch(error => console.error('Erro ao aprovar projeto:', error));
  }

  const handleReprove = (project) => {
    const token = localStorage.getItem('authToken');
    axios.put(`${import.meta.env.VITE_url_backend}/projeto_revisado/${project.id}/?novo_revisado=Reprovado&id_token=${token}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {

        window.location.reload();
      })
        .catch(error => console.error('Erro ao reprovar projeto:', error));
  }

  const handlePost = () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      alert('Token de autenticação não encontrado.');
      return;
    }
  
    // Separando os campos de tecnologias, equipe e palavras-chave por vírgulas e transformando-os em arrays
    const tecnologiasArray = typeof NewProject.tecnologias_utilizadas === 'string' && NewProject.tecnologias_utilizadas.trim() 
      ? NewProject.tecnologias_utilizadas.split(',').map(item => item.trim()) 
      : [];

    const equipeArray = typeof NewProject.equipe === 'string' && NewProject.equipe.trim()
      ? NewProject.equipe.split(',').map(item => item.trim())
      : [];

    const palavrasChaveArray = typeof NewProject.palavras_chave === 'string' && NewProject.palavras_chave.trim()
      ? NewProject.palavras_chave.split(',').map(item => item.trim())
      : [];

    const userCurtidasEmailArray = typeof NewProject.user_curtidas_email === 'string' && NewProject.user_curtidas_email.trim()
      ? NewProject.palavras_chave.split(',').map(item => item.trim())
      : [];
  
    // Atualiza os dados do projeto com os arrays processados
    const NewProjectWithDefaults = {
      id: NewProject.id || "default-id",
      titulo: NewProject.titulo || "Título não informado",
      tema: NewProject.tema || "Tema não informado",
      palavras_chave: palavrasChaveArray.length > 0 ? palavrasChaveArray : [],
      descricao: NewProject.descricao || "Sem descrição",
      cliente: NewProject.cliente || "Cliente não informado",
      semestre: NewProject.semestre || "Semestre não informado",
      equipe: equipeArray.length > 0 ? equipeArray : [],
      link_repositorio: NewProject.link_repositorio || "Link não informado",
      tecnologias_utilizadas: tecnologiasArray.length > 0 ? tecnologiasArray : [],
      video_tecnico: NewProject.video_tecnico || "Vídeo não informado",
      pitch: NewProject.pitch || "Pitch não informado",
      revisado: NewProject.revisado || "Pendente",
      curtidas: NewProject.curtidas || 0,
      user_curtidas_email: userCurtidasEmailArray.length > 0 ? userCurtidasEmailArray : [],
    };
  
  
    axios.post(`${import.meta.env.VITE_url_backend}/projeto_add?id_token=${token}`, NewProjectWithDefaults, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        window.location.reload();
        setOpen(false);
      })
      .catch(error => console.error('Erro ao adicionar projeto:', error));
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_url_backend}/projetos/`)
      .then(response => setProject(response.data.projetos))
      .catch(error => console.error('Erro ao carregar projetos:', error));
  }, []);

  const filteredProject = Array.isArray(Project) ? Project.filter((project) => {
    const input = Input.toLowerCase();
    return project.titulo?.toLowerCase().includes(input) || project.palavras_chave?.toLowerCase().includes(input) || project.tema?.toLowerCase().includes(input);
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
            {filteredProject.map((project) => (
              <tr key={project.id} className="border border-light-color">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`items-center py-3 ${
                      column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"
                    }`}
                  >
                    {column.key === "editar" ? (
                      <ModalUpdate project={project} />

                    ) : column.key === "excluir" ? (
                      <ModalDelete
                        title={project.titulo}
                        id={project.id}
                        handleUpdate={handleUpdate}
                      />

                    ) : column.key === "comentar" ? (
                      <ModalComment projectId={project.id} />

                    ) : column.key === "revisar" ? (
                      project.revisado

                    ) : column.key === "botao" &&
                      (project.revisado === "Pendente") ? (
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-color text-white rounded-xl hover:bg-blue-700 transition duration-300"
                        onClick={() => handleApprove(project)}
                      >
                        Aprovar
                      </button>
                    
                    ) : column.key === "botao2" &&
                      (project.revisado === "Pendente") ? (
                      <button
                        type="button"
                        className="px-3 py-2 bg-red-800 text-white rounded-xl hover:bg-red-700 transition duration-300"
                        onClick={() => handleReprove(project)}
                      >
                        Reprovar
                      </button>
                    ) : column.key === "botao" &&
                      (project.revisado === "Reprovado") ? (
                        <button
                          type="button"
                          className="px-3 py-2 bg-primary-color text-white rounded-xl hover:bg-blue-700 transition duration-300"
                          onClick={() => handleApprove(project)}
                        >
                          Aprovar
                        </button>
                    ) : column.key === "botao2" &&
                      (project.revisado === "Aprovado") ? (
                        <button
                          type="button"
                          className="px-3 py-2 bg-red-800 text-white rounded-xl hover:bg-red-700 transition duration-300"
                          onClick={() => handleReprove(project)}
                        >
                          Reprovar
                        </button>
                    ) : column.key === "botao2" &&
                        (project.revisado === "Reprovado" ) ? (
                        <div> </div>
                    ) : column.key === "botao" &&
                        (project.revisado === "Aprovado" ) ? (
                        <div> </div>
                    ) : column.key === "curtir" ? (
                        <ModalLikes projectId={project.id} />
                    
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
                  <input type="text" name="titulo" id="titulo" placeholder="Pessoa1,Pessoa2,Pessoa3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, equipe:e.target.value}))}/>
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
                  <input type="text" name="titulo" id="titulo" placeholder="Tecnologia1,Tecnologia2,Tecnologia3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, tecnologias_utilizadas:e.target.value}))}/>
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
                  <input type="text" name="titulo" id="titulo" placeholder="Palavra1,Palavra2,Palavra3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setNewProject({...NewProject, palavras_chave:e.target.value}))}/>
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
                onClick={handlePost}
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
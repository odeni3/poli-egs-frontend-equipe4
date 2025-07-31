import { Table } from "react-bootstrap";
import HeaderUser from "../../components/HeaderUser";
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
  { key: "revisar", label: "Status" },
  /*{ key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },*/
];

function Userprojects() {
  const [Input, setInput] = useState<string>("");
  const [Project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [formValid, setFormValid] = useState(false);
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
  
  if (userIsAdmin) {
    // Se não for admin, redireciona para a página de usuário
    return <Navigate to="/admin-projects" />;
  }
  
  const validateFormWithData = (projectData) => {
    const requiredFields = [
      'titulo',
      'cliente',
      'semestre',
      'pitch',
      'link_repositorio',
      'descricao',
      'equipe',
      'tema',
      'tecnologias_utilizadas',
      'video_tecnico',
      'palavras_chave'
    ];

    return requiredFields.every(field => {
      const value = projectData[field];
    
      if (typeof value === 'string') {
        return value.trim() !== '';
      } else if (Array.isArray(value)) {
        return value.length > 0;
      }
      return false;
    });
  };

  const validateForm = () => {
    return validateFormWithData(NewProject);
  };
    
  // Função para atualizar o NewProject e verificar a validação
  const handleChangeProject = (field, value) => {
    // Primeira atualização do estado
    const updatedProject = {...NewProject, [field]: value};
    setNewProject(updatedProject);
  
    // Validação imediata com o estado atualizado
    const isValid = validateFormWithData(updatedProject);
    setFormValid(isValid);
  };

  const handleUpdate = () => {
    axios.get(`${import.meta.env.VITE_url_backend}/projetos/`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Erro ao atualizar projetos:', error));
  };
  
  const handleLogoUpload = (id: string) => {
    const token = localStorage.getItem('authToken')
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post(`${import.meta.env.VITE_url_backend}/upload_logo_projeto/${id}/?id_token=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
      window.location.reload();
      setOpen(false);
    })
    .catch(error => console.log('Erro ao fazer upload da logo:', error))
  }

  const handlePost = () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      alert('Token de autenticação não encontrado.');
      return;
    }
  
     // Verificar novamente se todos os campos obrigatórios estão preenchidos
    if (!validateForm()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    // Função auxiliar para converter string em array
    const stringToArray = (value) => {
      return typeof value === 'string' && value.trim() 
        ? value.split(',').map(item => item.trim()) 
        : [];
    };

    // Conversão usando a função auxiliar
    const tecnologiasArray = stringToArray(NewProject.tecnologias_utilizadas);
    const equipeArray = stringToArray(NewProject.equipe);
    const palavrasChaveArray = stringToArray(NewProject.palavras_chave);
    const userCurtidasEmailArray = stringToArray(NewProject.user_curtidas_email); // Corrigido

    // Atualiza os dados do projeto com os arrays processados
    const NewProjectWithDefaults = {
      id: NewProject.id || "default-id",
      titulo: NewProject.titulo,
      tema: NewProject.tema,
      palavras_chave: palavrasChaveArray,
      descricao: NewProject.descricao,
      cliente: NewProject.cliente,
      semestre: NewProject.semestre,
      equipe: equipeArray,
      link_repositorio: NewProject.link_repositorio,
      tecnologias_utilizadas: tecnologiasArray,
      video_tecnico: NewProject.video_tecnico,
      pitch: NewProject.pitch,
      revisado: NewProject.revisado || "Pendente",
      curtidas: NewProject.curtidas || 0,
      user_curtidas_email: userCurtidasEmailArray,
    };
  

  
    axios.post(`${import.meta.env.VITE_url_backend}/projeto_add?id_token=${token}`, NewProjectWithDefaults, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        alert('Projeto cadastrado com sucesso!');
        window.location.reload();
        setOpen(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar projeto:', error);
        alert(`Erro ao cadastrar projeto: ${error.response?.data?.message || 'Verifique sua conexão'}`);
      });
  };
  
  useEffect(() => {
    if (open) {
      // Quando o modal é aberto, verifica a validade do formulário
      setFormValid(validateForm());
    } else {
      // Quando o modal é fechado, reset do NewProject para o estado inicial
      setNewProject({
        titulo: "",
        descricao: "",
        equipe: [],
        cliente: "",
        pitch: "",
        tema: "",
        semestre: "",
        video_tecnico: "",
        tecnologias_utilizadas: [],
        palavras_chave: [],
        id: "",
        link_repositorio: "",
        revisado: "",
        curtidas: 0,
        user_curtidas_email: [],
      });
    }
  }, [open]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_url_backend}/projetos/`)
      .then(response => setProject(response.data.projetos))
      .catch(error => console.error('Erro ao carregar projetos:', error));
  }, []);

  const filteredProject = Array.isArray(Project) ? Project.filter((project) => {
    const input = Input.toLowerCase();
    return project.titulo?.toLowerCase().includes(input) ||
        project.palavras_chave?.some(p => p.toLowerCase().includes(input)) ||
        project.tema?.toLowerCase().includes(input);
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
          placeholder="Pesquise por título, tema, palavra-chave"
          value={Input}
          onChange={(e) => setInput(e.target.value)}
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
                    className={`items-center py-3  ${
                      column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"
                    }`}
                  >
                    {
                        column.key === "editar" ? (
                      <ModalUpdate project={project} />
                    ) : column.key === "excluir" ? (
                      <ModalDelete
                        title={project.titulo}
                        id={project.id}
                        handleUpdate={handleUpdate}
                      />
                    ) : column.key === "comentar" ? (
                      <ModalComment projectId={project.id}></ModalComment>
                    ) : column.key === "curtir" ? (
                      <ModalLikes projectId={project.id} />
                    ) : column.key === "revisar" ? (
                      project.revisado
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
                  <h3 className="text-lg font-semibold">Titulo <span className="text-red-500">*</span></h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Titulo" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('titulo', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Equipe <span className="text-red-500">*</span></h3>
                  <input type="text" name="equipe" id="equipe" placeholder="Pessoa1,Pessoa2,Pessoa3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('equipe', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Organização Parceira <span className="text-red-500">*</span></h3>
                  <input type="text" name="cliente" id="cliente" placeholder="Ex: POLI/UPE" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('cliente', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tema <span className="text-red-500">*</span></h3>
                  <input type="text" name="tema" id="tema" placeholder="Ex: Engenharia de Software" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('tema', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Semestre <span className="text-red-500">*</span></h3>
                  <input type="text" name="semestre" id="semestre" placeholder="Ex: 2024.1" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('semestre', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tecnologias Utilizadas <span className="text-red-500">*</span></h3>
                  <input type="text" name="tecnologias" id="tecnologias" placeholder="Tecnologia1,Tecnologia2,Tecnologia3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('tecnologias_utilizadas', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Pitch <span className="text-red-500">*</span></h3>
                  <input type="text" name="pitch" id="pitch" placeholder="Pitch" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('pitch', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Vídeo Técnico <span className="text-red-500">*</span></h3>
                  <input type="text" name="video" id="video" placeholder="Vídeo Técnico" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('video_tecnico', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Repositório <span className="text-red-500">*</span></h3>
                  <input type="text" name="repositorio" id="repositorio" placeholder="Repositório" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('link_repositorio', e.target.value)}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Palavras Chave <span className="text-red-500">*</span></h3>
                  <input type="text" name="palavras" id="palavras" placeholder="Palavra1,Palavra2,Palavra3" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('palavras_chave', e.target.value)}/>
                </div>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold">Descrição <span className="text-red-500">*</span></h3>
                  <input type="text" name="descricao" id="descricao" placeholder="Descrição" className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => handleChangeProject('descricao', e.target.value)}/>
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
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                  formValid 
                    ? "bg-primary-color hover:bg-blue-700" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handlePost}
                disabled={!formValid}
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

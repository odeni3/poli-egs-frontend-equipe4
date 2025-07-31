import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { SetStateAction, useState } from "react";
import { ProdutoInt } from "../pages/Admin/Produtos";
import axios from "axios";


export default function ModalUpdateProduto({ produto }: { produto: ProdutoInt }){

  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(true);

  const [UpdatedProduto, setUpdatedProduto] = useState({
    id: produto.id || "",
    titulo: produto.titulo || "",
    tipo: produto.tipo || "",
    descricao: produto.descricao || "",
    equipe: produto.equipe.join(", ") || [], // Converte o array para string separada por vírgulas
    semestre: produto.semestre || "",
    arquivo: produto.arquivo || '#',
    status: produto.status || "Pendente",
  });
  
  const handleUpdateProduto = () => {
    // Capturando o token do localStorage
    const token = localStorage.getItem('authToken');


    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }

    // Separando os campos de tecnologias, equipe e palavras-chave por vírgulas e transformando-os em arrays
    const equipeArray = typeof UpdatedProduto.equipe === 'string' && UpdatedProduto.equipe.trim()
      ? UpdatedProduto.equipe.split(',').map(item => item.trim())
      : [];

    

    // Valores padrão para os campos não preenchidos
    const UpdatedProdutoWithDefaults = {
      id: produto.id || "",
      titulo: UpdatedProduto.titulo || "",
      tipo: UpdatedProduto.tipo || "",
      descricao: UpdatedProduto.descricao || "",
      equipe: equipeArray.length > 0 ? equipeArray : [],
      semestre: UpdatedProduto.semestre || "",
      arquivo: UpdatedProduto.arquivo || '#',
      status: produto.status || "Pendente",
    };


    // Fazendo a requisição de update do projeto com o token no cabeçalho de autorização
    axios.put(`${import.meta.env.VITE_url_backend}/produtos/${produto.id}?id_token=${token}`, UpdatedProdutoWithDefaults, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Usando o token no cabeçalho
      },
    })
    .then(() => {

      window.location.reload();
      setOpen(false);
    })
    .catch(error => {
      console.error('Erro ao atualizar Produto:', error.response ? error.response.data : error.message);
      console.error('Erro completo:', error);
    });
  };

  return(
      <>
        <Button onClick={handleShow} className="text-dark-color h-full w-5">
            <PencilSquareIcon className="h-5 w-5"/>
        </Button>

        <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[40vw] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-[#D8DBE2] pt-5 sm:p-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-dark-color">
                    Atualizar: {produto.titulo}
                  </DialogTitle>
                </div>
              </div>
            </div>
            <form action="POST">
              <div className="grid grid-cols-2 justify-start pt-4 px-6 gap-y-[2vh]">
                <div>
                  <h3 className="text-lg font-semibold">Titulo</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Titulo" value={UpdatedProduto.titulo} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProduto({...UpdatedProduto, titulo:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tipo de produto</h3>
                  <select type="text" name="titulo" id="titulo" value={UpdatedProduto.tipo}
                         className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProduto({...UpdatedProduto, tipo:e.target.value}))}>
                        <option value="Outros">Outros</option>
                        <option value="Patente de Software">Patente de Software</option>
                        <option value="Registro de Software">Registro de Software</option>
                        <option value="Startup">Startup</option>
                        <option value="Artigos e Relatórios Técnicos">Artigos e Relatórios Técnicos</option>
                        <option value="Plataforma Online">Plataforma Online</option>
                        <option value="TCC">TCC</option>
                        <option value="Dissertação e Tese">Dissertação e Tese</option>


                  </select>
                </div>               

                <div>
                  <h3 className="text-lg font-semibold">Descrição</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Tecnologia1,Tecnologia2,Tecnologia3" value={UpdatedProduto.descricao} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProduto({...UpdatedProduto, descricao:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Semestre de publicação</h3>
                  <input type="date" name="titulo" id="titulo" placeholder="Ex: 2024.1" value={UpdatedProduto.semestre} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProduto({...UpdatedProduto, semestre:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Equipe</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pessoa1,Pessoa2,Pessoa3" value={UpdatedProduto.equipe} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProduto({...UpdatedProduto, equipe:e.target.value}))}/>
                </div>   
              </div>
            </form>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
                onClick={handleUpdateProduto}
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
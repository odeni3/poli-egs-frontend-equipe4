  import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
  import { PencilSquareIcon } from '@heroicons/react/20/solid';
  import axios from "axios";
  import { SetStateAction, useState } from "react";
  import { ArticleInt } from "../pages/Admin/Artigos";


  export default function ModalUpdateArticle({ article, handleUpdate }: { article: ArticleInt, handleUpdate: () => void }){

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true);

    const [UpdatedArticle, setUpdatedArticle] = useState({
      ...article
    });

    const handleUpdateArticle = () => {
      /*axios.put(`https://ecomp-egs.onrender.com/artigos/`, UpdatedArticle)
        .then(() => {
          handleUpdate();
          setOpen(false);
        })
        .catch(error => {
          console.error('Erro ao atualizar artigo:', error);
        });*/
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
                      Atualizar {article.titulo}
                    </DialogTitle>
                  </div>
                </div>
              </div>
              <form action="POST">
                <div className="grid grid-cols-2 justify-start pt-4 px-6 gap-y-[2vh]">
                  <div>
                    <h3 className="text-lg font-semibold">Titulo</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Titulo" value={UpdatedArticle.titulo} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, titulo:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Equipe</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Pessoa1;Pessoa2;Pessoa3" value={UpdatedArticle.equipe} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, equipe:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Área de pesquisa</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Ex: POLI/UPE" value={UpdatedArticle.tema} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, tema:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Palavras-chave</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Ex: Engenharia de Software" value={UpdatedArticle.palavras_chave} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, palavras_chave:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Data</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Ex: 2024.1" value={UpdatedArticle.data} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, data:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Descrição</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Tecnologia1;Tecnologia2;Tecnologia3" value={UpdatedArticle.descricao} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, descricao:e.target.value}))}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Arquivo</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Pitch" value={UpdatedArticle.arquivo} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedArticle({...UpdatedArticle, arquivo:e.target.value}))}/>
                  </div>                
                </div>
              </form>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
                  onClick={handleUpdateArticle}
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
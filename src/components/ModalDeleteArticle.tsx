import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import Button from 'react-bootstrap/Button';

interface ModalProps {
  title?: string;
  id?: string;
  handleUpdate: () => void;
}

function handleOptionDelete(id: string | undefined, setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, handleUpdate: () => void) {
  // Capturando o token do localStorage
  const token = localStorage.getItem('authToken');

  
  // Verificando se o token existe
  if (!token) {
    console.error('Token não encontrado. Usuário não está autenticado.');
    return;
  }

  // Fazendo a requisição de deletar projeto com o token no cabeçalho de autorização
  axios.delete(`${import.meta.env.VITE_url_backend}/artigos/${id}/?id_token=${localStorage.getItem('authToken')}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Usando o token obtido
    },
  })
    .then(() => {
      window.location.reload();
      setOpen(false);
    })
    .catch(error => {
      console.error('Erro ao deletar artigo:', error);
    });
}

export default function ModalDeleteArticle({ title, id, handleUpdate }: ModalProps) {

  const [open, setOpen] = useState(false)
  const handleShow = () => setOpen(true);

  const handleDelete = () => {
    handleOptionDelete(id, setOpen, handleUpdate);
  };

  return (
    <>
      <Button onClick={handleShow} className="text-dark-color h-full w-5">
        <TrashIcon className="h-5 w-5"/>
      </Button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-50 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-primary-color" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Tem certeja que deseja excluir {title} ?
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div className="bg-[#D8DBE2] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
              >
                Excluir
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

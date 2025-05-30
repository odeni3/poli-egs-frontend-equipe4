import { useState } from "react";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import axios from "axios";

export default function ModalComment({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [projectData, setProjectData] = useState(null);

  const handleShow = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendComment = () => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("userName")
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }
  
    // Verifica se o 'comment' e 'projectId' estão preenchidos
    if (!comment || !projectId) {
      console.error("Comentário ou ID do projeto não fornecido.");
      return;
    }
    fetchProjectData();
    // Requisição POST para enviar o comentário
    axios.post(`${import.meta.env.VITE_url_backend}/projetos/${projectId}/comentar?usuario=${user}&comentario=${comment}&id_token=${token}`,
        { comentario: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {

        setComment(""); // Limpa o campo de texto
        handleClose(); // Fecha o modal ou qualquer outro fechamento de interface
      })
      .catch((error) => { 
        console.error("Erro ao enviar comentário:", error.response?.data || error.message);
      });
  };
  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_url_backend}/projetos/${projectId}`);
      setProjectData(response.data); // Armazena os dados do projeto no estado

    } catch (error) {
      console.error("Erro ao obter os dados do projeto:", error);
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="text-dark-color h-full w-5">
        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
      </Button>

      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                  Adicionar Comentário
                </DialogTitle>
                <div className="mt-3">
                  <textarea
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Escreva seu comentário..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSendComment}
                  className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark sm:ml-3 sm:w-auto"
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={handleClose}
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

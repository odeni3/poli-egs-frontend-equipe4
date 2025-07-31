import { useState } from "react";
import React from "react";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { HeartIcon, HeartSolidIcon } from '@heroicons/react/20/solid'; // ícone de coração para curtir
import axios from "axios";

export default function ModalLikes({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState<number | null>(null); // número de curtidas
  const [isLiked, setIsLiked] = useState(false); // se o projeto já foi curtido pelo usuário

  const handleShow = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLike = () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }
  
    // Requisição POST para curtir o projeto
    axios.post(`${import.meta.env.VITE_url_backend}/projetos/${projectId}/curtir?id_token=${token}`)
      .then((response) => {

  
        if (response.data.msg === 'Projeto descurtido com sucesso!') {
          // se o usuário já havia curtido antes de tentar curtir novamente, o projeto é descurtido
            setIsLiked(false);
        } else if (response.data.msg === 'Projeto curtido com sucesso!') {
          // Curtida realizada com sucesso
            setIsLiked(true); // Marca como curtido
        }
        setLikes(response.data.curtidas); // Atualiza o número de curtidas
      })
      .catch((error) => {
        console.error("Erro ao curtir o projeto:", error.response?.data || error.message);
      });
  };
  

  const fetchProjectLikes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_url_backend}/projetos/${projectId}`);
      const email = localStorage.getItem('email')
      setLikes(response.data.curtidas); // Armazena o número de curtidas no estado
      if (email) setIsLiked(response.data.user_curtidas_email.includes(email))
    } catch (error) {
      console.error("Erro ao obter as curtidas do projeto:", error);
    }
  };

  // Buscar dados do projeto ao abrir o modal
  React.useEffect(() => {
      fetchProjectLikes();
  }, [open]);

  return (
    <>
        <Button
            onClick={handleShow}
            className="text-dark-color h-full w-5 transition-transform hover:scale-110"
            title={isLiked ? "Você curtiu este projeto" : "Clique para curtir"}
        >
            {isLiked ? (
                // Coração cheio (curtido)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-red-500">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
            ) : (
                // Coração vazio (não curtido)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-500 hover:text-red-500 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            )}
        </Button>

        <Dialog open={open} onClose={handleClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-lg">
                        <div className="bg-gradient-to-br from-blue-50 to-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-lg font-bold text-blue-800">
                                Curtir Projeto
                            </DialogTitle>
                            <div className="mt-3 text-sm text-gray-700">
                                <p>
                                    Este projeto possui{" "}
                                    <span className="font-semibold text-blue-600">
                                        {likes !== null ? likes : 0}
                                    </span>{" "}
                                    {likes === 1 ? "curtida" : "curtidas"}.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {isLiked ? (
                                /*<div className="text-center ml-2 mt-2 text-red-500 font-medium mb- sm:mb-0 text-xm">
                                    Curtido com sucesso!
                                </div>*/
                                <button
                                    type="button"
                                    onClick={handleLike}
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition sm:ml-3 sm:w-auto"
                                >
                                    Descurtir Projeto
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleLike}
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition sm:ml-3 sm:w-auto"
                                >
                                    Curtir Projeto
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

import { Table } from "react-bootstrap";
import HeaderUser from "../../components/HeaderUser";
import { SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalDeleteArticle from "../../components/ModalDeleteArticle";
import ModalUpdateArticle from "../../components/ModalUpdateArticle";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

export interface ArticleInt {
  titulo?: string;
  descricao?: string;
  equipe?: string;
  tema?: string;
  data?: string;
  palavras_chave?: string;
  id?: string;
  arquivo?: string;
}

const generateRandomStatus = () => {
  const statuses = ["em andamento", "recusado", "aprovado"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};


const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "status", label: "Status" }, // Adiciona a coluna para o status
];


function Userarticles() {
  const [Input, setInput] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const [Article, setArticle] = useState<ArticleInt[]>([]);
  const [open, setOpen] = useState(false);
  const [NewArticle, setNewArticle] = useState({
    titulo: "",
    descricao: "",
    equipe: "",
    tema: "",
    data: "",
    palavras_chave: "",
    id: "",
    arquivo: "#",
  });

  const [file, setFile] = useState<File | undefined>();
  async function uploadPdf(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  }

  const handlePost = async (setOpen: { (value: SetStateAction<boolean>): void }) => {
    try {
      const postResponse = await axios.post("https://ecomp-egs.onrender.com/artigos", NewArticle);
      const newArticleId = postResponse.data.id;
      console.log(newArticleId);
      if (!newArticleId) {
        throw new Error("ID do novo artigo não retornado.");
      }
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData:", formData.get("file"));
        await axios.post(`https://ecomp-egs.onrender.com/upload_pdf_artigo/?id_projeto=${newArticleId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      const response = await axios.get("https://ecomp-egs.onrender.com/artigos");
      const articlesWithStatus = response.data.map((article: any) => ({
        ...article,
        status: generateRandomStatus(),
      }));
      setArticle(articlesWithStatus);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar artigo ou enviar arquivo:", error);
    }
  };
  

  const handleUpdate = () => {
    axios.get("https://ecomp-egs.onrender.com/artigos").then(response => {
      setArticle(response.data);
    }).catch(error => {
      console.error("Erro ao atualizar artigo", error);
    });
  };

  useEffect(() => {
    axios.get("https://ecomp-egs.onrender.com/artigos").then(function (response) {
      const articlesWithStatus = response.data.map((article: any) => ({
        ...article,
        status: generateRandomStatus(),
      }));
      setArticle(articlesWithStatus);
    });
  }, []);
  

  const filteredArticle = Article.filter((article: any) => {
    const input = Input.toLowerCase();
    return (
      article.titulo?.toLowerCase().includes(input) ||
      article.palavras_chave?.toLowerCase().includes(input) ||
      article.tema?.toLowerCase().includes(input)
    );
  });

  return (
    <>
    <HeaderUser />
    <div className="flex flex-col px-[13vw] pt-10 gap-6">
        <section className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-start text-dark-color">Artigos</h1>
          <button
            type="submit"
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary-color h-full w-[15vw] text-white"
          >
            Novo artigo
          </button>
        </section>
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2]"
          placeholder="Pesquise por nome, tema, palavra-chave"
          value={Input}
          onChange={handleInputChange}
        />
      </div>
      <div className="px-[13vw] pt-10">
        <Table className="h-auto w-full">
          <thead>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.key === "titulo" ? "text-left" : "text-right"}
              >
                {column.label}
              </th>
            ))}
          </thead>
          <tbody>
            {filteredArticle.map((article) => (
              <tr key={article.id} className="border border-light-color">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`items-center py-3 ${
                      column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"
                    } ${column.key === "status" ? "w-[20vw]" : ""}`} // A largura é aumentada aqui
                  >
                    {/* Condicional para mostrar título */}
                    {column.key === "titulo" && article.titulo}

                    {/* Condicional para mostrar o status com a cor */}
                    {column.key === "status" && (
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          article.status === "em andamento"
                            ? "bg-yellow-500"
                            : article.status === "recusado"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {article.status}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>



        </Table>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[40vw] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-[#D8DBE2] pb-4 pt-5 sm:p-5 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-gray-900">
                      Cadastrar novo artigo
                    </DialogTitle>
                  </div>
                </div>
              </div>
              <form action="POST">
                <div className="grid grid-cols-2 justify-items-center pt-3 gap-y-[2vh]">
                  <div>
                    <h3 className="text-lg font-semibold">Título</h3>
                    <input
                      type="text"
                      name="titulo"
                      id="titulo"
                      placeholder="Título"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, titulo: e.target.value })}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Área de pesquisa</h3>
                    <input
                      type="text"
                      name="tema"
                      id="tema"
                      placeholder="Ex: Inteligência Artificial"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, tema: e.target.value })}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Palavras-chave</h3>
                    <input
                      type="text"
                      name="palavras"
                      id="palavras"
                      placeholder="Ex: Palavra1;Palavra2"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, palavras_chave: e.target.value })}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Descrição</h3>
                    <input
                      type="text"
                      name="descricao"
                      id="descricao"
                      placeholder="Descrição"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, descricao: e.target.value })}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Data de publicação</h3>
                    <input
                      id="datapublicacao"
                      type="date"
                      name="datapublicacao"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, data: e.target.value })}
                    />
                  </div>
                  <div className="w-[15vw] relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={uploadPdf}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`absolute flex items-center px-3 py-2 rounded-md w-full text-dark-color text-xs font-semibold cursor-pointer ${
                        !file ? "bg-green-500" : "bg-[#D8DBE2]"
                      } hover:opacity-60 select-none whitespace-nowrap`}
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {file ? <span>{file.name}</span> : <span>Subir PDF</span>}
                      <FaFileUpload className="ml-2" />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Equipe</h3>
                    <input
                      type="text"
                      name="equipe"
                      id="equipe"
                      placeholder="Pessoa1;Pessoa2;Pessoa3"
                      className="focus:outline-none border-b-2 w-[15vw]"
                      onChange={(e) => setNewArticle({ ...NewArticle, equipe: e.target.value })}
                    />
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
  );
}

export default Userarticles;

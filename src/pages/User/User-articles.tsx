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

const columns = [
  { key: "titulo", label: "Titulo" },
  { key: "editar", label: "Editar" },
  { key: "excluir", label: "Excluir" },
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
      setArticle(response.data);
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
      setArticle(response.data);
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
        <h1 className="text-2xl font-bold text-dark-color">Artigos</h1>
        <button
            type="submit"
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary-color h-full w-[15vw] text-white py-2 px-6 hover:bg-primary-color-dark transition duration-200"
        >
            Novo artigo
        </button>
        </section>
        <input
        type="search"
        name="searchbar"
        id="searchbar"
        className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] focus:ring-2 focus:ring-primary-color transition-all"
        placeholder="Pesquise por nome, tema, palavra-chave"
        value={Input}
        onChange={handleInputChange}
        />
    </div>
    <div className="px-[13vw] pt-10">
        <Table className="w-full">
        <thead className="bg-primary-color text-white">
            {columns.map((column) => (
            <th key={column.key} className={`py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>{column.label}</th>
            ))}
        </thead>
        <tbody>
            {filteredArticle.map((article) => (
            <tr key={article.id} className="border border-light-color hover:bg-gray-100 transition duration-300">
                {columns.map((column) => (
                <td key={column.key} className={`py-3 ${column.key === "titulo" ? "text-left pl-3" : "text-right pr-3"}`}>
                    {column.key === "editar" ? (
                    <ModalUpdateArticle article={article} handleUpdate={handleUpdate} />
                    ) : column.key === "excluir" ? (
                    <ModalDeleteArticle title={article.titulo} id={article.id} handleUpdate={handleUpdate} />
                    ) : (
                    article.titulo
                    )}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </Table>
    </div>

    {/* Modal de criação de artigo */}
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[40vw]">
        <div className="bg-[#D8DBE2] pt-5 sm:p-3 sm:pb-4">
            <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-dark-color">
            Cadastrar novo artigo
            </DialogTitle>
        </div>
        <form>
            {/* Formulário com campos de entrada */}
        </form>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <button onClick={() => handlePost(setOpen)} className="rounded-md bg-primary-color px-4 py-2 text-white hover:bg-primary-color-dark transition duration-200">
            Enviar
            </button>
            <button onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-2 text-gray-900 hover:bg-gray-200 transition duration-200">
            Cancelar
            </button>
        </div>
        </DialogPanel>
    </Dialog>
    </>
  );
}

export default Userarticles;

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import backgroundImage from '../images/mainpage.jpg';

function Produtos() {
  const [input, setInput] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_url_backend}/produtos/`)
      .then((response) => {
        setProdutos(response.data.produtos || []);
      })
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_url_backend}/view_pdf_produto/${id}`);
      const url = response.data.url;
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('URL não encontrada');
      }
    } catch (error) {
      console.error('Erro ao obter o PDF:', error);
    }
  };

  const filteredProdutos = produtos.filter((produto) => {
    const searchInput = input.toLowerCase();
    return (
      produto.titulo?.toLowerCase().includes(searchInput) ||
      produto.tipo?.toLowerCase().includes(searchInput)
    );
  });

  return (
    <>
      <Header />

      {/* Seção Hero */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">Produtos</h1>
          <p className="text-2xl mb-8 text-center">
            Explore nossas patentes, registros de software, startup e outros
          </p>
          <div className="flex w-full max-w-lg">
            <input
              type="search"
              name="searchbar"
              id="searchbar"
              className="w-full h-16 px-6 rounded-l-full bg-white bg-opacity-20 text-white placeholder-white outline-none focus:bg-white focus:text-black transition-colors duration-300"
              placeholder="Pesquise por nome, tema, palavra-chave"
              value={input}
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-600 h-16 px-6 rounded-r-full hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Lista de produtos */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          {filteredProdutos.filter(produto => produto.status === "Aprovado").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProdutos
                .filter(produto => produto.status === "Aprovado") // Filtra apenas os artigos aprovados
                .map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
                  >
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">{produto.titulo}</h2>
                    <div className="mb-4">
                      <h3 className="font-semibold">Autor(es):</h3>
                      <ul className="list-disc list-inside">
                        {produto.equipe?.map((autor, index) => (
                          <li key={index}>{autor}</li>
                        )) || <p>Autor não informado</p>}
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold">Tipo de produto:</h3>
                      <p>{produto.tipo || "Tipo não informado"}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold">Semestre:</h3>
                      <p>{produto.semestre || "Semesstre não disponível"}</p>
                    </div>
                    <button
                      className="mt-auto flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => handleDownload(produto.id)}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                      Visualizar
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
          )}
        </div>
      </section>


      <Footer />
    </>
  );
}

export default Produtos;

import { useEffect } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import Header from '../components/Header';
import { useState } from 'react';
import axios from 'axios';
import { ArticleInt } from './Admin/Artigos';


function Articles() {
  const [Input, setInput] = useState<string>("");
  const [Card, setCard] = useState<ArticleInt[]>([]);
  
  useEffect(() => {
    axios.get('https://ecomp-egs.onrender.com/artigos').then(function (response) {
      setCard(response.data)
    })
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleDownload = async (id: string) => {
    try {
      const response = await axios.get(`https://ecomp-egs.onrender.com/artigo_download/"${id}"`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.pdf`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao obter o PDF:', error);
    }
  };

  const filteredCards = Card.filter((article) => {    
    const input = Input.toLowerCase();
    return (
      (
        article.titulo?.toLowerCase().includes(input) ||
        article.palavras_chave?.toLowerCase().includes(input) ||
        article.tema?.toLowerCase().includes(input)
      )
    );
  });

  return (
    <>
      <Header />
      <div className="flex flex-col px-[13vw] pt-10 gap-6">        
        <h1 className="text-2xl font-bold text-start text-dark-color ">Artigos</h1>          
        <input 
          type="search" 
          name="searchbar" 
          id="searchbar" 
          className="rounded-full w-full h-[5vh] border border-light-color indent-2 bg-[#D8DBE2] "
          placeholder="Pesquise por nome, tema, palavra-chave"
          value={Input}
          onChange={handleInputChange}
        />
      </div>  
      <section className='grid grid-cols-2 px-[13vw] gap-[2vw] pt-10'>
        {filteredCards.map((article) => (
            <div
              className="flex flex-col w-[35vw] border-solid border-2 border-light-color p-4 gap-3"
            >
              <h1 className="text-3xl text-primary-color font-normal">{article.titulo}</h1>
              <div>
                <h3 className="font-semibold">Autor(es):</h3>
                <ul className='mb-1 flex flex-col'>
                  {article.equipe?.split(";").map((pessoa) => (
                    <li>{pessoa}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Área de pesquisa:</h3>
                <h3>{article.tema}</h3>
              </div>
              <div>
                <h3 className="font-semibold">Palavras-chave:</h3>
                <ul className='mb-1 flex flex-row flex-wrap gap-2 '>
                  {article.palavras_chave?.split(";").map((palavras) => (
                    <div className="flex justify-center bg-primary-color rounded-md px-2">
                      <h5 className='text-light-color font-normal'>{palavras}</h5>
                    </div>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Data de publicação:</h3>
                <h3>{article.data}</h3>
              </div>
              <div>
                <button className='flex flex-row gap-2 text-primary-color'
                onClick={() => {
                  if (article.id) {handleDownload(article.id);
                    console.log(article.id)

                  } else {
                    console.error('URL do arquivo não está disponível');
                  }}}> 
                  <ArrowDownTrayIcon className="h-5 w-5"/>Visualizar </button>  
              </div>
            </div>
          ))}          
      </section>       
    </>    
  )
}

export default Articles


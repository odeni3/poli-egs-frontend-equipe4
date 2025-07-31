import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import Nav from 'react-bootstrap/Nav';

function HeaderUser() {
  // Pegando o nome do usuário armazenado no localStorage
  const userName = localStorage.getItem('userName');

  return (
    <header className="bg-primary-color shadow text-light-color h-[10vh] w-full flex justify-between items-center px-4">     
      <Nav className="flex flex-1">
        <Nav.Link href="/" className="mr-auto ml-8 relative flex items-center">
          <ArrowLeftStartOnRectangleIcon className="absolute w-10 h-10"/>
        </Nav.Link>
        <div className="flex-1 flex justify-center space-x-8">
          <Nav.Link href="/user-projects">Projetos</Nav.Link>
          <Nav.Link href="/user-articles">Artigos</Nav.Link>
          <Nav.Link href="/user-produtos">Produtos</Nav.Link>
        </div>
      </Nav>
      <div className="text-white text-lg ml-auto flex items-center space-x-2 px-4 py-2 bg-blue-1000 transition duration-300">
        <span className="font-semibold">
          {userName ? `Olá, ${userName}` : 'Usuário não autenticado'}
        </span>
      </div>
    </header>
  );
}

export default HeaderUser;

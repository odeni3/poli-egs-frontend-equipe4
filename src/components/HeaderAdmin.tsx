import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import Nav from 'react-bootstrap/Nav';

function HeaderAdmin() {
  return (
    <header className="bg-primary-color shadow text-light-color h-[10vh] w-full flex justify-between items-center px-4">     
      <Nav className="flex flex-1">
        {/* Botão de Início à esquerda */}
        <Nav.Link href="/" className="mr-8 relative flex items-center">
          <span className="text-light-color">Início</span>
        </Nav.Link>

        {/* Links de navegação centralizados */}
        <div className="flex-1 flex justify-center space-x-8">
          <Nav.Link href="/admin-projects">Projetos</Nav.Link>
          <Nav.Link href="/admin-articles">Artigos</Nav.Link>
        </div>
      </Nav>

      {/* Botão de Logout à direita */}
      <Nav.Link href="/logout" className="relative flex items-center">
        <ArrowLeftStartOnRectangleIcon className="w-10 h-10"/>
      </Nav.Link>
    </header>
  );
}

export default HeaderAdmin;

import Nav from 'react-bootstrap/Nav';
import { UserIcon } from '@heroicons/react/20/solid';

function Header() {
  return (
    <header className="bg-primary-color text-light-color h-[8vh] flex items-center justify-center w-full">
      <Nav className="flex space-x-20 items-center">
        <Nav.Link className="text-lg" href="/">Início</Nav.Link>
        <Nav.Link className="text-lg" href="/projects">Projetos</Nav.Link>
        <Nav.Link className="text-lg" href="/Articles">Artigos</Nav.Link>
        <Nav.Link className="text-lg" href="/sobre">Sobre</Nav.Link>
        <Nav.Link className="text-lg" href="/faq">FAQ</Nav.Link>
        <Nav.Link className="text-lg flex items-center" href="/logintest">
          <UserIcon className="h-5 w-5 me-2" />Entrar
        </Nav.Link>
        <Nav.Link className="text-lg flex items-center" href="/admin-projects">adm</Nav.Link>
      </Nav>
    </header>
  );
}

export default Header;

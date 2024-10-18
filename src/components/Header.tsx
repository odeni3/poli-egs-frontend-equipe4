import Nav from 'react-bootstrap/Nav';
import { UserIcon } from '@heroicons/react/20/solid';

function Header() {
  return (
    <header className='bg-primary-color text-light-color h-[10vh] flex items-center justify-center w-full'>
        <Nav className="flex space-x-8 items-center">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/projects">Projetos</Nav.Link>
            <Nav.Link href="/Articles">Artigos</Nav.Link>
            <Nav.Link href="/sobre">Sobre</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link className="flex items-center" href="/logintest"><UserIcon className="h-5 w-5 me-2"/>Entrar</Nav.Link>
            <Nav.Link className="flex items-center" href="/admin-projects">adm</Nav.Link>
        </Nav>
    </header>
  )
}

export default Header
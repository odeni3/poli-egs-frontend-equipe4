import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <header className='bg-primary-color text-light-color h-[10vh] flex items-center justify-center w-full'>
        <Nav className="space-x-8 1">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/projects">Projetos</Nav.Link>
            <Nav.Link href="#/">Artigos</Nav.Link>
            <Nav.Link href="#/">Sobre</Nav.Link>
            <Nav.Link href="/admin-projects">Entrar</Nav.Link>
        </Nav>
    </header>
  )
}

export default Header
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import Nav from 'react-bootstrap/Nav';

function HeaderAdmin() {
  return (
    
    <header className="bg-primary-color shadow text-light-color h-[10vh] w-full flex justify-between items-center px-4">     
      <Nav className="flex flex-1">
        <Nav.Link href="/logout" className="mr-auto ml-10 w-[1vw] h-[2.5vh]">
          <ArrowLeftStartOnRectangleIcon className="h-full"/>
        </Nav.Link>
        <div className="flex-1 flex justify-center space-x-8">
          <Nav.Link href="/admin-projects">Projetos</Nav.Link>
          <Nav.Link href="/admin-articles">Artigos</Nav.Link>
        </div>
      </Nav>
  </header>
 
  )
}

export default HeaderAdmin
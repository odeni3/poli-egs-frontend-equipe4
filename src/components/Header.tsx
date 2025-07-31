import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary-color text-light-color shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 ml-[10%]">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo-upe-site.png" 
              alt="Logo" 
              className="h-10 w-15 object-contain"
            />
            <span className="ml-5 text-2xl font-semibold tracking-wide">
              Observatório de Projetos
            </span>
          </NavLink>
        </div>

        {/* Menu button (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-light-color focus:outline-none"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav Links */}
        <div className={`md:flex items-center space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {['Início', 'Projetos', 'Artigos','Produtos', 'Sobre', 'FAQ'].map((item, index) => (
            <NavLink
              key={index}
              to={item === 'Início' ? '/' : `/${item.toLowerCase()}`}
              className="text-lg font-medium hover:text-gray-300 transition duration-200"
              activeClassName="underline"
            >
              {item}
            </NavLink>
          ))}
        </div>


        {/* Login */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/logintest"
            className="flex items-center px-4 py-2 bg-gray-100 text-primary-color rounded-full shadow-lg hover:bg-gray-400 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5.982 5.982 0 0112 15c1.657 0 3.156.672 4.242 1.758M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Entrar
          </NavLink>
        </div>
      </nav>

      {/* Dropdown Menu (mobile) */}
      {isOpen && (
        <div className="md:hidden bg-primary-color">
          <ul className="space-y-4 px-6 py-4">
            {['Início', 'Projetos', 'Artigos','Produtos', 'Sobre', 'FAQ'].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className="block text-lg font-medium text-light-color hover:text-gray-300 transition duration-200"
                  activeClassName="underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/logintest"
                className="block text-lg font-medium text-light-color hover:text-gray-300 transition duration-200 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5.982 5.982 0 0112 15c1.657 0 3.156.672 4.242 1.758M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Entrar
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;

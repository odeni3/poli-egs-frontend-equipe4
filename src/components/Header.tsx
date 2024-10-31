// src/components/Header.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary-color text-light-color h-[6vh]">
      <nav className="container flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center space-x-3">
          <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo-upe-site.png" 
              alt="Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold">Observatório de Projetos</span>
          </NavLink>
        </div>

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

        <div className={`flex-1 justify-center md:flex items-center space-x-8 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <NavLink exact to="/" className="text-lg hover:text-gray-300" activeClassName="underline">
            Início
          </NavLink>
          <NavLink to="/projects" className="text-lg hover:text-gray-300" activeClassName="underline">
            Projetos
          </NavLink>
          <NavLink to="/Articles" className="text-lg hover:text-gray-300" activeClassName="underline">
            Artigos
          </NavLink>
          <NavLink to="/sobre" className="text-lg hover:text-gray-300" activeClassName="underline">
            Sobre
          </NavLink>
          <NavLink to="/faq" className="text-lg hover:text-gray-300" activeClassName="underline">
            FAQ
          </NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/logintest" className="flex items-center hover:text-gray-300" activeClassName="underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5.982 5.982 0 0112 15c1.657 0 3.156.672 4.242 1.758M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Entrar
          </NavLink>
          <NavLink to="/admin-projects" className="text-lg hover:text-gray-300" activeClassName="underline">
            ...
          </NavLink>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden">
          <ul className="px-4 pt-3 pb-5 space-y-2">
            <li>
              <NavLink exact to="/" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                Projetos
              </NavLink>
            </li>
            <li>
              <NavLink to="/Articles" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                Artigos
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                Sobre
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/logintest" className="flex items-center py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5.982 5.982 0 0112 15c1.657 0 3.156.672 4.242 1.758M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin-projects" className="block py-2 text-lg hover:text-gray-300" activeClassName="underline" onClick={() => setIsOpen(false)}>
                ...
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;

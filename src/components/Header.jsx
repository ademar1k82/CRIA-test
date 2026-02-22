import React from 'react'
import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">CRIA</div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#home">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

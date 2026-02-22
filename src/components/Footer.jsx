import React from 'react'
import '../styles/Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <p>&copy; {currentYear} CRIA. Todos os direitos reservados.</p>
        <div className="social-links">
          <a href="#github">GitHub</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#twitter">Twitter</a>
        </div>
      </div>
    </footer>
  )
}

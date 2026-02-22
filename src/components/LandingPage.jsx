import React from 'react'
import '../styles/LandingPage.css'

export default function LandingPage() {
  return (
    <section className="landing-page" id="home">
      <div className="landing-content">
        <h1>Bem-vindo ao CRIA</h1>
        <p>Desenvolvimento de soluções web modernas e inovadoras</p>
        <button className="cta-button">Começar Agora</button>
      </div>
    </section>
  )
}

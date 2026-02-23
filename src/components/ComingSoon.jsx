import React from 'react'
import ScrollVelocity from './ScrollVelocity'
import scrollTexts from '../data/scrollTexts.json'
import '../styles/ComingSoon.css'

export default function ComingSoon() {

  return (
    <section className="coming-soon" id="coming-soon">
      <div className="coming-soon-content">
        <h2>Em Desenvolvimento</h2>
        <p>O nosso website está em constante evolução. Em breve, teremos mais secções e funcionalidades para melhor servir a nossa comunidade.</p>
        <div className="scroll-velocity-container">
          <ScrollVelocity
            items={scrollTexts}
            velocity={30}
            className="coming-soon-text"
          />
        </div>
      </div>
    </section>
  )
}

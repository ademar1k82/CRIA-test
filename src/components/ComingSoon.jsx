import React from 'react'
import ScrollVelocity from './ScrollVelocity'
import '../styles/ComingSoon.css'

export default function ComingSoon() {
  return (
    <section className="coming-soon" id="coming-soon">
      <div className="coming-soon-content">
        <h2>Em Breve</h2>
        <p>Novidades incríveis estão a caminho</p>
        <div className="scroll-velocity-container">
          <ScrollVelocity
            texts={['Fique Atento', 'Em Breve']}
            velocity={100}
            className="coming-soon-text"
          />
        </div>
        <button className="notify-btn">Notifique-me</button>
      </div>
    </section>
  )
}

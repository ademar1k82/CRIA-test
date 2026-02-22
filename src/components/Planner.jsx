import React from 'react'
import ScrollReveal from './ScrollReveal'
import '../styles/Planner.css'

export default function Planner() {
  return (
    <section className="planner" id="planner">
      <div className="planner-content">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
        >
          Organize seus projetos de forma eficiente e visual. Veja cada elemento revelado enquanto você navega pela página - uma experiência imersiva e moderna.
        </ScrollReveal>
      </div>
    </section>
  )
}

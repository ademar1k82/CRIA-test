import { useState } from 'react'
import '../styles/About.css'
import slidesData from '../data/slides.json'

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = slidesData[currentSlide]

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Conteúdo Principal */}
        <div className="about-content" key={`content-${currentSlide}`}>
          <h2>{slide.h3}</h2>
          <h1>{slide.title}</h1>
          <div className="about-text">
            {Array.isArray(slide.p) ? (
              <ul className="about-list">
                {slide.p.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{slide.p}</p>
            )}
          </div>
        </div>

        {/* Grid 2x2 de Imagens Clicáveis */}
        <div className="about-grid">
          {slidesData.map((item, index) => (
            <div
              key={item.id}
              className={`about-grid-item ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              <img src={item.image} alt={item.title} />
              <div className="about-grid-overlay">
                <span className="about-grid-title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react';
import './coming-soon.css';

const ComingSoon = () => {
  const words = [
    { text: 'Testemunhos', size: 'xxl' },
    { text: 'Voluntariado', size: 'lg' },
    { text: 'RECURSOS & LITERACIA', size: 'lg' },
    { text: 'Newsletter', size: 'xs' },
    { text: 'Galeria', size: 'lg' },
    { text: 'Plataforma DIGITAL', size: 'md' },
    { text: 'CRIA Jovem', size: 'xxl' },
    { text: 'Blog', size: 'lg' },
    { text: 'Biblioteca Digital', size: 'lg' },
    { text: 'Área Reservada', size: 'sm' },
  ];

  return (
    <section id="coming-soon" className="coming-soon-section">
      <div className="coming-soon-container">
        <div className="coming-soon-header">
          <h3>Em Desenvolvimento</h3>
          <p>O nosso website está em constante evolução. Em breve, teremos mais secções e funcionalidades para melhor servir a nossa comunidade. Aqui está um vislumbre do que está por vir:</p>
        </div>
        <div className="word-cloud-container">
          <div className="word-grid">
            {words.map((word, index) => (
              <div 
                key={index} 
                className={`word-item ${word.size}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`
                }}
              >
                {word.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;

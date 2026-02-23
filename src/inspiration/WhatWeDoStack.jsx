import React, { useEffect, useRef, useState } from 'react';
import './what-we-do-stack.css';
import projetos from '../assets/projetos.jpg';
import formacao from '../assets/formacao.jpg';
import campanha from '../assets/campanha.jpg';
import parceria from '../assets/parceria.jpg';
import materiais from '../assets/materiais.jpg';

const WhatWeDoStack = () => {
  const headerRef = useRef(null);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const cardsRef = useRef([]);

  const cards = [
    {
      icon: 'hands-helping',
      title: 'Projetos Comunitários',
      description: 'Apoio direto a famílias, redes de entreajuda, voluntariado.',
      image: projetos,
      content: 'Procuramos desenvolver projetos que fortalecem laços comunitários e promovem a inclusão social. O nosso foco será sempre realizar acções de apoio direto a famílias, criar e apoiar redes de entreajuda, e fomentar o voluntariado.'
    },
    {
      icon: 'graduation-cap',
      title: 'Formação & Sensibilização',
      description: 'Cursos, tertúlias e workshops em escolas e instituições.',
      image: formacao,
      content: 'Oferecemos programas educativos que promovem a compreensão e aceitação da diversidade. As nossas formações incluem cursos, tertúlias e workshops realizados em escolas, instituições e empresas.'
    },
    {
      icon: 'bullhorn',
      title: 'Campanhas de Inclusão',
      description: 'Comunicação social e digital para mudar mentalidades.',
      image: campanha,
      content: 'Através de campanhas inovadoras e estratégias de comunicação eficazes, trabalhamos para transformar percepções e promover uma sociedade mais inclusiva e acolhedora. De forma crescente, apostamos na comunicação social e digital para mudar mentalidades.'
    },
    {
      icon: 'handshake',
      title: 'Parcerias',
      description: 'Com escolas, municípios, associações e serviços de saúde.',
      image: parceria,
      content: 'Construímos parcerias estratégicas com instituições-chave para ampliar nosso impacto. Colaboramos com diversos setores para criar soluções integradas e sustentáveis.'
    },
    {
      icon: 'book-open',
      title: 'Materiais',
      description: 'Materiais de apoio, folhetos informativos, ...',
      image: materiais,
      content: 'Desenvolvemos e disponibilizamos todos os recursos educativos e informativos que encontrarmos e que possam ajudar a comunidade. Estes incluem materiais de apoio, folhetos informativos, guias práticos, entre outros.'
    }
  ];

  useEffect(() => {
    setIsHeaderActive(false);
    
    const timer = setTimeout(() => {
      setIsHeaderActive(true);
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderActive(true);
        }
      },
      { threshold: 0.1 }
    );

    const header = headerRef.current;
    if (header) {
      observer.observe(header);
    }

    return () => {
      clearTimeout(timer);
      if (header) {
        observer.unobserve(header);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cards = cardsRef.current;
      cards.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const stickyTop = 100 + (index * 20);
          
          // Calculate how far the card has scrolled past its sticky position
          const scrollPastSticky = stickyTop - rect.top;
          
          if (scrollPastSticky > 0) {
            // Card is at or past sticky position - scale down slightly
            const scale = Math.max(0.92, 1 - (scrollPastSticky / 1000));
            card.style.transform = `scale(${scale})`;
            card.style.opacity = '1';
          } else {
            // Card approaching sticky position - keep it solid
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="what-we-do-stack" className="what-we-do-stack-section">
      <div className="what-we-do-stack-container">
        <div ref={headerRef} className={`what-we-do-stack-header ${isHeaderActive ? 'active' : ''}`}>
          <div className="what-we-do-stack-header-text">
            <h3>O que Fazemos</h3>
            <h1>Iniciativas & Ações</h1>
          </div>
        </div>
        
        <div className="stack-cards-wrapper">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="stack-card"
              style={{
                top: `${100 + (index * 20)}px`,
                zIndex: index + 1
              }}
            >
              <div className="stack-card-background" style={{backgroundImage: `url(${card.image})`}}></div>
              <div className="stack-card-overlay"></div>
              
              <div className="stack-card-content">
                <div className="stack-card-icon">
                  <i className={`fas fa-${card.icon}`}></i>
                </div>
                <h3 className="stack-card-title">{card.title}</h3>
                <p className="stack-card-description">{card.description}</p>
                <div className="stack-card-expanded">
                  <p>{card.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoStack;

import React, { useState, useRef, useEffect } from 'react'
import '../styles/EventCalendar.css'

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [eventsListHeight, setEventsListHeight] = useState('auto')
  const eventsListRef = useRef(null)
  const carouselRef = useRef(null)

  const events = [
    {
      id: 1,
      title: 'Workshop Inovação Digital',
      location: 'Auditório Principal',
      address: 'Rua da Inovação, nº 123',
      description: 'Descubra as tendências mais recentes em transformação digital e inteligência artificial.',
      image: 'https://picsum.photos/600/800?random=1'
    },
    {
      id: 2,
      title: 'Conferência de Design',
      location: 'Sala de Conferências',
      address: 'Av. do Design, nº 456',
      description: 'Explore os principios fundamentais do design moderno e user experience.',
      image: 'https://picsum.photos/600/800?random=2'
    },
    {
      id: 3,
      title: 'Hackathon de Desenvolvimento',
      location: 'Laboratório Tech',
      address: 'Av. Tecnológica, nº 789',
      description: 'Desafio de 48 horas para desenvolvedores criarem soluções inovadoras.',
      image: 'https://picsum.photos/600/800?random=3'
    },
    {
      id: 4,
      title: 'Networking Profissional',
      location: 'Espaço Social',
      address: 'Rua Central, nº 321',
      description: 'Conecte-se com profissionais da indústria e expanda sua rede de contatos.',
      image: 'https://picsum.photos/600/800?random=4'
    },
    {
      id: 5,
      title: 'Palestra sobre IA',
      location: 'Auditório Sul',
      address: 'Av. Futuro, nº 555',
      description: 'Inteligência Artificial: Oportunidades e desafios para o futuro.',
      image: 'https://picsum.photos/600/800?random=5'
    }
  ]

  const eventsPerPage = 4
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const paginatedEvents = events.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage)

  const currentEvent = events[selectedEvent]

  // Calcular altura da lista de eventos (sempre 4 eventos)
  useEffect(() => {
    if (eventsListRef.current) {
      // Calcular altura de exatamente 4 eventos
      const eventCards = eventsListRef.current.querySelectorAll('.event-card')
      if (eventCards.length > 0) {
        const firstCardHeight = eventCards[0].offsetHeight
        const gap = 16 // gap: 1rem = 16px
        const totalHeight = firstCardHeight * 4 + gap * 3
        setEventsListHeight(totalHeight)
      }
    }
  }, [paginatedEvents.length])

  // Sincronizar carousel mobile com slide
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft
        const itemWidth = carouselRef.current.offsetWidth
        const index = Math.round(scrollLeft / itemWidth)
        setSelectedEvent(Math.max(0, Math.min(index, events.length - 1)))
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMobileBulletClick = (index) => {
    setSelectedEvent(index)
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollLeft = index * itemWidth
    }
  }

  return (
    <section className="planner" id="planner">
      <div className="planner-content">
        <h2>Calendário de Atividades</h2>
        <p>Acompanhe os eventos e atividades da instituição CRIA</p>

        <div className="events-container">
          {/* Eventos à esquerda */}
          <div className="events-wrapper">
            <div className="events-list" ref={eventsListRef}>
              {paginatedEvents.map((event, index) => {
                const actualIndex = currentPage * eventsPerPage + index
                return (
                  <div
                    key={event.id}
                    className={`event-card ${selectedEvent === actualIndex ? 'active' : ''}`}
                    onClick={() => setSelectedEvent(actualIndex)}
                  >
                    <h3>{event.title}</h3>
                    <div className="event-info">
                      <p><strong>Local:</strong> {event.location}</p>
                      <p><strong>Morada:</strong> {event.address}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Bullets de paginação - Desktop */}
            {totalPages > 1 && (
              <div className="pagination-desktop">
                <div className="pagination-dots">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${currentPage === idx ? 'active' : ''}`}
                      onClick={() => setCurrentPage(idx)}
                      aria-label={`Página ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Poster à direita - Desktop */}
          <div className="event-poster" style={{ height: eventsListHeight }}>
            <img src={currentEvent.image} alt={currentEvent.title} />
          </div>
        </div>

        {/* Carousel de posteres - Mobile */}
        <div className="mobile-carousel-wrapper">
          <div className="mobile-carousel" ref={carouselRef}>
            {events.map((event) => (
              <div
                key={event.id}
                className="carousel-poster"
              >
                <img src={event.image} alt={event.title} />
              </div>
            ))}
          </div>
          
          {/* Bullets - Mobile */}
          <div className="pagination-mobile">
            {events.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${selectedEvent === idx ? 'active' : ''}`}
                onClick={() => handleMobileBulletClick(idx)}
                aria-label={`Evento ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

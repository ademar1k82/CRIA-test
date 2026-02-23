import React, { useState, useRef, useEffect } from 'react'
import eventsData from '../data/events.json'
import '../styles/EventCalendar.css'

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [eventsListHeight, setEventsListHeight] = useState('auto')
  const [imageKey, setImageKey] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const eventsListRef = useRef(null)
  const carouselRef = useRef(null)

  const events = eventsData

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
    setImageKey(prev => prev + 1)
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      })
    }
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && selectedEvent < events.length - 1) {
      const newIndex = selectedEvent + 1
      setSelectedEvent(newIndex)
      setImageKey(prev => prev + 1)
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: newIndex * carouselRef.current.offsetWidth,
          behavior: 'smooth'
        })
      }
    }

    if (isRightSwipe && selectedEvent > 0) {
      const newIndex = selectedEvent - 1
      setSelectedEvent(newIndex)
      setImageKey(prev => prev + 1)
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: newIndex * carouselRef.current.offsetWidth,
          behavior: 'smooth'
        })
      }
    }

    setTouchStart(0)
  }

  return (
    <section className="planner" id="planner">
      <div className="planner-content">
        <h2>Agenda</h2>
        <h1>Calendário de Eventos</h1>

        {/* TODO: Dados dummy - comentado até que haja eventos reais */}
        {/*
        <div className="events-container">
          {/* Eventos à esquerda */}
          {/*<div className="events-wrapper">
            <div className="events-list" ref={eventsListRef}>
              {paginatedEvents.map((event, index) => {
                const actualIndex = currentPage * eventsPerPage + index
                return (
                  <div
                    key={event.id}
                    className={`event-card ${selectedEvent === actualIndex ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedEvent(actualIndex)
                      setImageKey(prev => prev + 1)
                    }}
                  >
                    <h3>{event.title}</h3>
                    <div className="event-info">
                      <p><strong>Local:</strong> {event.location}</p>
                      <p><strong>Morada:</strong> {event.address}</p>
                      <p><strong>Data:</strong> {event.date}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Bullets de paginação - Desktop */}
            {/*{totalPages > 1 && (
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
          {/*<div className="event-poster" style={{ height: eventsListHeight }}>
            <img key={imageKey} src={currentEvent.image} alt={currentEvent.title} />
          </div>
        </div>

        {/* Carousel de posteres - Mobile */}
        {/*<div className="mobile-carousel-wrapper">
          <div 
            className="mobile-carousel" 
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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
          {/*<div className="pagination-mobile">
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
        */}

        {/* Placeholder - Sem eventos */}
        <div className="no-events-placeholder">
          <i className="fa-solid fa-gear loading-gear"></i>
          <p>Sem eventos ainda definidos.</p>
        </div>
      </div>
    </section>
  )
}

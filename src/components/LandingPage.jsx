import React, { useRef, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function LandingPage() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoUrl] = useState('https://res.cloudinary.com/deoditzdz/video/upload/v1751620950/main-blue_ck40kw.mp4')

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // Store video controls globally for CardNav to access
  useEffect(() => {
    window.videoControls = {
      play: handlePlayVideo,
      pause: handlePauseVideo,
      toggleMute: handleToggleMute,
      isPlaying,
      isMuted
    }
  }, [isPlaying, isMuted])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    )
    
    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section
      className="landing-page"
      id="home"
      ref={sectionRef}
    >
      <video
        ref={videoRef}
        className="video-slide"
        src={videoUrl}
        loop
        onError={(e) => console.error('Erro no vídeo:', e.target.error)}
      />
      
      <div className={`landing-content${active ? ' active' : ''}`}>
        <div className="content-wrapper">
          <img src="https://res.cloudinary.com/deoditzdz/image/upload/v1751623320/basewww_izyln0.svg" alt="CRIA" className="cria-logo" />
          <h2>Inclusão Social</h2>
          <p>Juntos criamos caminhos de inclusão, respeito e participação para todas as pessoas.</p>
          
          <div className="hero-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEh4ncKbImX90hb8MxUpMMybjILmzjh1jLSTA2b7MnGQ3VHQ/viewform" target="_blank" rel="noopener noreferrer" className="cta-button associate">
              Torna-te sócio
            </a>
            <a href="#footer" className="cta-button support">
              Preciso de apoio
            </a>
            <a href="#footer" className="cta-button collaborate">
              Quero colaborar
            </a>
          </div>
        </div>

        <div className="media-icons">
          <a href="https://www.facebook.com/CriaInclusaoSocial" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/cria_inclusaosocial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/company/cria-inclus%C3%A3o-social/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  )
}

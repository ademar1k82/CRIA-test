import React, { useRef, useEffect, useState } from 'react';
import './herosection.css';
import { uploadFile } from '../utils/cloudinaryUtils';

const HeroSection = ({ isAdmin }) => {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const [active, setActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://res.cloudinary.com/deoditzdz/video/upload/v1751620950/main-blue_ck40kw.mp4');
  console.log('Video URL:', videoUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async (event) => {
    if (!isAdmin) return;
    
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadFile(file, 'cria/interface/video');
      setVideoUrl(result.secure_url);
      console.log('Vídeo atualizado:', result.secure_url);
    } catch (error) {
      console.error('Erro ao atualizar vídeo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      className="home"
      id="home"
      ref={sectionRef}
    >
      <video
        className="video-slide"
        src={videoUrl}
        autoPlay
        loop
        muted
        onError={(e) => console.error('Erro no vídeo:', e.target.error)}
        onLoadStart={() => console.log('Iniciando carregamento do vídeo')}
        onLoadedData={() => console.log('Vídeo carregado com sucesso')}
      ></video>
      
      <div className={`content${active ? ' active' : ''}`}>
        <h1><span>CRIA</span></h1>
        <h3>Inclusão Social</h3>
        <p>Juntos criamos caminhos de inclusão, respeito e participação para todas as pessoas.</p>
        <div className="hero-buttons">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEh4ncKbImX90hb8MxUpMMybjILmzjh1jLSTA2b7MnGQ3VHQ/viewform" target="_blank" rel="noopener noreferrer" className="cta-button associate">Torna-te sócio</a>
          <a href="#footer" className="cta-button support">Preciso de apoio</a>
          <a href="#footer" className="cta-button collaborate">Quero colaborar</a>
        </div>
      </div>

      <div className="media-icons">
        <a href="https://www.facebook.com/CriaInclusaoSocial" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/cria_inclusaosocial" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/company/cria-inclus%C3%A3o-social/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
      </div>

      {isAdmin && (
        <div className="admin-controls">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
            id="hero-video-input"
          />
          <button
            className="admin-button"
            onClick={() => document.getElementById('hero-video-input').click()}
            disabled={isUploading}
          >
            {isUploading ? 'Enviando...' : 'Atualizar Vídeo'}
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
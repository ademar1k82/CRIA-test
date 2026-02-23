import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './footer.css';
import LegalModal from './LegalModal';
import legalData from '../data/legal.json';

// Estas constantes permanecem as mesmas pois são da sua conta EmailJS
const PUBLIC_KEY = "KCAP3I17jevQl-ua0";
const SERVICE_ID = "service_m76ic37";
// Atualize este ID com o novo template que você criar para o formulário de contato
const TEMPLATE_ID = "template_52h49gg"; // Substitua pelo ID do novo template

const Footer = () => {
  const form = useRef();
  const [message, setMessage] = useState({ text: '', type: '' });
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const initEmailJS = async () => {
      try {
        await emailjs.init(PUBLIC_KEY);
        console.log("EmailJS initialized successfully");
      } catch (error) {
        console.error("Error initializing EmailJS:", error);
      }
    };
    initEmailJS();
  }, []);

  const handleLegalClick = (type) => (e) => {
    e.preventDefault();
    console.log('Clicked:', type); // Para debug
    if (type === 'complaints') {
      window.open('https://www.livroreclamacoes.pt/Inicio/', '_blank');
      return;
    }
    const content = legalData[type];
    console.log('Content:', content); // Para debug
    if (content) {
      setModalContent({
        isOpen: true,
        ...content
      });
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      setMessage({ text: 'Enviando mensagem...', type: 'info' });

      if (!emailjs) {
        throw new Error('EmailJS não está inicializado');
      }

      const templateParams = {
        from_name: form.current.user_name.value,
        from_email: form.current.user_email.value,
        subject: form.current.subject.value,
        to_name: 'CRIA',
        reply_to: form.current.user_email.value
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      console.log('SUCCESS!', response.status, response.text);
      setMessage({ text: 'Mensagem enviada com sucesso!', type: 'success' });
      form.current.reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessage({ text: 'Erro ao enviar mensagem. Tente novamente.', type: 'error' });
    }
  };

  return (
    <footer id="footer" className="footer-container">
      {/* Donation section commented out - to be developed later
      <div id="donation" className="donation-header">
        <h1 className="donation-title">Contribua para a mudança</h1>
        <h2 className="donation-subtitle">Normalizemos a diferença</h2>
        <p>Ao escolher apoiar o trabalho do CRIA, está a contribuir diretamente para a inclusão social e o desenvolvimento de projetos que transformam vidas.<br /><br />Um apoio que faz bem a todos.</p>
      </div>

      <div className="donation-section">
        <a href="#donations" className="donation-image-link">
          <img src="https://res.cloudinary.com/deoditzdz/image/upload/v1751624191/contribution_spkqni.jpg" alt="Donativos" />
          <div className="donation-text">Donativos</div>
        </a>
        <a href="#associate" className="donation-image-link">
          <img src="https://res.cloudinary.com/deoditzdz/image/upload/v1751624195/associate_ikjtuh.jpg" alt="Tornar-se Associado" />
          <div className="donation-text">
            <span className="small-text">Tornar-se</span>
            <span className="main-text">Associado</span>
          </div>
        </a>
      </div>
      */}
      
      <div className="participation-section">
        <h2 className="participation-title">PARTICIPA</h2>
        
        <div className="participation-grid">
          <div className="participation-item">
            <i className="fas fa-users title-icon"></i>
            <h3>Torna-te Sócio</h3>
            <p>Junta-te à CRIA e ajuda-nos a crescer. Podes escolher a categoria de sócio que melhor se adapta a ti.</p>
          </div>

          <div className="participation-item">
            <i className="fas fa-hands-helping title-icon"></i>
            <h3>Voluntariado</h3>
            <p>Envolve-te nos projetos da CRIA e contribui para uma comunidade mais inclusiva.</p>
          </div>

          <div className="participation-item">
            <i className="fas fa-handshake title-icon"></i>
            <h3>Parcerias</h3>
            <p>Se és uma instituição, escola, empresa ou associação, descobre como podes colaborar connosco.</p>
          </div>

          <div className="participation-item">
            <i className="fas fa-heart title-icon"></i>
            <h3>Donativos</h3>
            <p>Cada contribuição ajuda-nos a apoiar mais famílias, criar mais projetos e chegar a mais pessoas. Transparência total na gestão dos fundos.</p>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>CRIA</h3>
          <h2 className="inclusion-title">Inclusão social</h2>
          <div className="address">
            <p>Rio Tinto</p>
            <p>Gondomar, Portugal</p>
          </div>
          <div className="contacts">
            <a href="tel:+351912345678" className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+351 910979212</span>
            </a>
            <a href="mailto:info@cria.pt" className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>geral.cria2025@gmail.com</span>
            </a>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/CriaInclusaoSocial" target="_blank" rel="noopener noreferrer" title="Facebook">
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href="https://www.instagram.com/cria_inclusaosocial" target="_blank" rel="noopener noreferrer" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/cria-inclus%C3%A3o-social/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Envie a sua mensagem</h3>
          <form ref={form} onSubmit={sendEmail} className="newsletter-form">
            <input
              type="text"
              name="user_name"
              placeholder="O seu nome"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="O seu email"
              required
            />
            <textarea
              name="subject"
              placeholder="Assunto"
              required
              rows="4"
            ></textarea>
            <button type="submit" className="submit-btn">
              <span>
                Enviar
                <i className="fas fa-paper-plane"></i>
              </span>
            </button>
            {message.text && (
              <div className={`form-message ${message.type}-message`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="legal-links">
        <button className="legal-link" onClick={(e) => handleLegalClick('privacy')(e)}>Política de Privacidade</button>
        <button className="legal-link" onClick={(e) => handleLegalClick('terms')(e)}>Termos e condições</button>
        <button className="legal-link" onClick={(e) => handleLegalClick('cookies')(e)}>Política de Cookies</button>
        <button className="legal-link" onClick={(e) => handleLegalClick('complaints')(e)}>Livro de Reclamações</button>
      </div>

      <div className="footer-bottom">
        <p>&#169; AdemarcreatiV. Todos os direitos reservados</p>
      </div>

      <LegalModal
        isOpen={modalContent !== null}
        onClose={closeModal}
        title={modalContent?.title}
        content={modalContent?.content}
      />
    </footer>
  );
};

export default Footer;

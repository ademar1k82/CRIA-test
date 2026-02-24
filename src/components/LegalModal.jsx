import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/LegalModal.css';

const LegalModal = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    <div className={`blog-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="blog-modal-header">
          <div className="blog-modal-info">
            <div className="blog-modal-main-title">
              <h2>{title}</h2>
            </div>
          </div>
        </div>

        <div className="blog-modal-body">
          <div className="blog-modal-text">
            {content}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);};

export default LegalModal;
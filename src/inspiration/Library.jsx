import React, { useRef, useEffect, useState } from 'react';
import './library.css';
import Alert from './Alert';

const bgImg = "https://res.cloudinary.com/deoditzdz/image/upload/v1751623023/library_ggizn8.jpg";

// Cartões com ícone FontAwesome
const cards = [
  {
    title: "Informações",
    icon: "fas fa-info-circle",
    desc: "Documentação institucional aberta a consulta.",
    docs: [
      { name: "Regulamento.pdf", url: "src/assets/docs/regulamento.pdf" },
      { name: "Exemplo1.jpg", url: "src/assets/docs/exemplo1.jpg" }
    ]
  },
  {
    title: "Tutoriais",
    icon: "fas fa-graduation-cap",
    desc: "Guias passo-a-passo para várias áreas.",
    docs: [
      { name: "Tutorial.docx", url: "src/assets/docs/tutorial.docx" },
      { name: "Passos.png", url: "src/assets/docs/passos.png" }
    ]
  },
  {
    title: "Legislação",
    icon: "fas fa-balance-scale",
    desc: "Conteúdos técnicos e científicos.",
    docs: [
      { name: "Lei.pdf", url: "src/assets/docs/lei.pdf" }
    ]
  },
  {
    title: "Ferramentas",
    icon: "fas fa-tools",
    desc: "Recursos e utilitários para o seu dia-a-dia.",
    docs: [
      { name: "Ferramenta.pdf", url: "src/assets/docs/ferramenta.pdf" }
    ]
  }
];

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'doc' || ext === 'docx') return 'word';
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') return 'image';
  if (ext === 'ppt' || ext === 'pptx') return 'powerpoint';
  return 'alt';
}

function canPreviewFile(name) {
  const ext = name.split('.').pop().toLowerCase();
  // Arquivos que podem ser visualizados diretamente no navegador
  return ['pdf', 'jpg', 'jpeg', 'png'].includes(ext);
}

const Library = ({ isLoggedIn }) => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [flippedIdx, setFlippedIdx] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [cardsList, setCardsList] = useState(cards);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', type: 'pdf', file: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const docsPerPage = 10;

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getCurrentPageDocs = (docs) => {
    const indexOfLastDoc = currentPage * docsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
    return docs.slice(indexOfFirstDoc, indexOfLastDoc);
  };

  const getTotalPages = (docs) => {
    return Math.ceil(docs.length / docsPerPage);
  };

  const handlePageChange = async (pageNumber) => {
    if (pageNumber === currentPage) return;
    
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Aguarda a transição de fade out
    setCurrentPage(pageNumber);
    await new Promise(resolve => setTimeout(resolve, 50)); // Pequeno delay para garantir a atualização do state
    setIsTransitioning(false);
  };

  const handleFlip = idx => {
    setFlippedIdx(prev => (prev === idx ? null : idx));
  };

  const handleExpand = async (e, idx) => {
    e.stopPropagation();
    setExpandedIdx(idx);
    setCurrentPage(1);
  };

  const handleCloseExpand = () => {
    setExpandedIdx(null);
    setCurrentPage(1); // Reset page when closing
  };

  const handleDeleteAlert = (doc) => {
    setDeleteInfo(doc);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (expandedIdx !== null && deleteInfo) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedCardsList = [...cardsList];
      updatedCardsList[expandedIdx] = {
        ...updatedCardsList[expandedIdx],
        docs: updatedCardsList[expandedIdx].docs
          .filter(doc => doc.name !== deleteInfo.name)
          .sort((a, b) => a.name.localeCompare(b.name))
      };
      
      setCardsList(updatedCardsList);
      
      // Adjust current page if necessary after deletion
      const newTotalPages = getTotalPages(updatedCardsList[expandedIdx].docs);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(1, newTotalPages));
      }

      await new Promise(resolve => setTimeout(resolve, 50));
      setIsTransitioning(false);
    }
    setShowDeleteAlert(false);
    setDeleteInfo(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setDeleteInfo(null);
  };

  const getDeleteMessage = () => {
    if (!deleteInfo) return '';
    const displayName = deleteInfo.name.replace(/\.[^/.]+$/, "");
    return (
      <>
        <strong>Confirmar exclusão</strong><br/><br/>
        Tem certeza que deseja excluir o documento "{displayName}"?<br/><br/>
        Esta ação não pode ser desfeita.
      </>
    );
  };

  const handleAddDoc = async (e) => {
    e.preventDefault();
    if (!newDoc.name.trim() || !newDoc.file) return;

    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const fileName = newDoc.name.trim();
    const fileExt = `.${newDoc.file.name.split('.').pop().toLowerCase()}`;
    const fullName = `${fileName}${fileExt}`;
    
    const fileUrl = URL.createObjectURL(newDoc.file);
    
    const newDocObj = {
      name: fullName,
      url: fileUrl
    };

    const updatedCardsList = [...cardsList];
    updatedCardsList[expandedIdx] = {
      ...updatedCardsList[expandedIdx],
      docs: [...updatedCardsList[expandedIdx].docs, newDocObj]
        .sort((a, b) => a.name.localeCompare(b.name))
    };

    setCardsList(updatedCardsList);
    
    // Move to the page where the new document appears
    const docs = updatedCardsList[expandedIdx].docs;
    const newDocIndex = docs.findIndex(doc => doc.name === fullName);
    const targetPage = Math.floor(newDocIndex / docsPerPage) + 1;
    setCurrentPage(targetPage);
    
    await new Promise(resolve => setTimeout(resolve, 50));
    setIsTransitioning(false);
    
    setNewDoc({ name: '', type: 'pdf', file: null });
    setShowAddForm(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(prev => !prev);
    if (showAddForm) {
      setNewDoc({ name: '', type: 'pdf', file: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();
    setNewDoc(prev => ({
      ...prev,
      file,
      type: fileExt
    }));

    if (!newDoc.name) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setNewDoc(prev => ({
        ...prev,
        name: fileName
      }));
    }
  };

  return (
    <div className="library-section" id="library" ref={sectionRef}>
      {showDeleteAlert && (
        <Alert
          message={getDeleteMessage()}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          showCancelButton={true}
          confirmText="Excluir"
          cancelText="Cancelar"
        />
      )}
      <div className="library-bg-image">
        <img
          src={bgImg}
          alt="Fundo biblioteca"
          className="loaded"
        />
      </div>
      <div className={`library-header-flex${active ? ' active' : ''}`}>
        <div className="library-header-text">
          <h3>Biblioteca Digital</h3>
          <h1><span>Documentação</span></h1>
          <p>
            Espaço de apoio com diversos temas e conteúdos.<br />
            Explore esta área para encontrar recursos úteis e que o possam ajudar.<br />
            Se tiver conteúdos que gostaria de ver aqui, por favor, contacte-nos.
          </p>
        </div>
      </div>
      <div className="library-cards-row">
        {cardsList.map((card, idx) => (
          <div
            className={`library-card-flip${flippedIdx === idx ? ' flipped' : ''}`}
            key={idx}
            tabIndex={0}
            onClick={() => handleFlip(idx)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleFlip(idx)}
          >
            <div className="library-card-flip-inner">
              <div className="library-card-flip-front">
                <div className="library-card-icon">
                  <i className={card.icon}></i>
                </div>
                <div className="library-card-title">{card.title}</div>
              </div>
              <div className="library-card-flip-back">
                <div className="library-card-desc">{card.desc}</div>
                <div
                  className="library-card-search"
                  onClick={e => handleExpand(e, idx)}
                  tabIndex={0}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleExpand(e, idx)}
                >
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {expandedIdx !== null && (
        <div className="library-card-expanded-bg" onClick={handleCloseExpand}>
          <div className="library-card-expanded" onClick={e => e.stopPropagation()}>
            <button className="library-card-expanded-close" onClick={handleCloseExpand}>
              <i className="fas fa-times"></i>
            </button>
            <div className="library-card-expanded-title">
              <i className={cardsList[expandedIdx].icon}></i>
              <span>{cardsList[expandedIdx].title}</span>
            </div>
            <div className="library-card-expanded-desc">{cardsList[expandedIdx].desc}</div>
            {isLoggedIn && (
              <div className="library-add-doc">
                {showAddForm ? (
                  <form onSubmit={handleAddDoc} className="library-add-form">
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Nome do documento"
                        value={newDoc.name}
                        onChange={e => setNewDoc(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx"
                          id="doc-file"
                        />
                        <label htmlFor="doc-file" className="file-label">
                          <i className="fas fa-upload"></i>
                          {newDoc.file ? newDoc.file.name : 'Escolher arquivo'}
                        </label>
                      </div>
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="add-btn" disabled={!newDoc.file}>
                        Adicionar
                      </button>
                      <button type="button" className="cancel-btn" onClick={toggleAddForm}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <button className="library-add-button" onClick={toggleAddForm}>
                    <i className="fas fa-plus"></i> Adicionar documento
                  </button>
                )}
              </div>
            )}
            <ul className={`library-card-doc-list${isTransitioning ? ' fade' : ''}`}>
              {getCurrentPageDocs(cardsList[expandedIdx].docs).map((doc, i) => {
                const displayName = doc.name.replace(/\.[^/.]+$/, "");
                const canPreview = canPreviewFile(doc.name);
                
                return (
                  <li key={i}>
                    <a 
                      href={doc.url} 
                      download={canPreview ? undefined : doc.name}
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={canPreview ? "Abrir em nova janela" : "Fazer download"}
                    >
                      <i className={`fas fa-file-${getFileIcon(doc.name)}`}></i> {displayName}
                      <i className={`fas fa-${canPreview ? 'external-link-alt' : 'download'}`} style={{ marginLeft: '8px', fontSize: '0.8em' }}></i>
                    </a>
                    {isLoggedIn && (
                      <button
                        className="library-doc-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAlert(doc);
                        }}
                        title="Excluir documento"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {getTotalPages(cardsList[expandedIdx].docs) > 1 && (
              <div className="pagination">
                <button 
                  className={`pagination-control ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => !isTransitioning && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isTransitioning}
                >
                  &lt;
                </button>
                {[...Array(getTotalPages(cardsList[expandedIdx].docs))].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => !isTransitioning && handlePageChange(index + 1)}
                    disabled={isTransitioning}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`pagination-control ${currentPage === getTotalPages(cardsList[expandedIdx].docs) ? 'disabled' : ''}`}
                  onClick={() => !isTransitioning && handlePageChange(currentPage + 1)}
                  disabled={currentPage === getTotalPages(cardsList[expandedIdx].docs) || isTransitioning}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

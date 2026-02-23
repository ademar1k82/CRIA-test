import React, { useState } from 'react'
import FlowingMenu from './FlowingMenu'
import valuesData from '../data/values.json'

import '../styles/Values.css'

export default function Values() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    setIsClosing(false)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsModalOpen(false)
      document.body.style.overflow = 'auto'
      setTimeout(() => setSelectedItem(null), 50)
    }, 400)
  }

  return (
    <section className="values" id="values">
      <div className="values-header">
        <h2>O que fazemos</h2>
        <h1>Iniciativas & Ações</h1>
        <p className="values-header-subtitle">(clica nos títulos para saber mais)</p>
      </div>
      <FlowingMenu 
        items={valuesData}
        speed={25}
        textColor="#ffffff"
        bgColor="transparent"
        marqueeBgColor="#07b2d9"
        marqueeTextColor="#ffffff"
        borderColor="rgba(255, 255, 255, 0.2)"
        onItemClick={handleItemClick}
      />

      {isModalOpen && selectedItem && (
        <div className={`values-modal-overlay ${isModalOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
          <div className="values-modal" onClick={(e) => e.stopPropagation()}>
            <div 
              className="values-modal-bg" 
              style={{ backgroundImage: `url(${selectedItem.image})` }}
            ></div>
            <div className="values-modal-content">
              <h1>{selectedItem.text}</h1>
              <p>{selectedItem.p}</p>
              <button className="values-modal-btn" onClick={handleCloseModal}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

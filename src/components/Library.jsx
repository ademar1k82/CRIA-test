import React from 'react'
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi'
import GlassIcons from './GlassIcons'
import '../styles/Library.css'

export default function Library() {
  const items = [
    { icon: <FiFileText />, color: 'blue', label: 'Files' },
    { icon: <FiBook />, color: 'purple', label: 'Books' },
    { icon: <FiHeart />, color: 'red', label: 'Health' },
    { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
    { icon: <FiEdit />, color: 'orange', label: 'Notes' },
    { icon: <FiBarChart2 />, color: 'green', label: 'Stats' }
  ]

  return (
    <section className="library" id="library">
      <div className="library-content">
        <h2>Biblioteca</h2>
        <p>Acesso a recursos e documentações úteis</p>
        <div style={{ height: '600px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GlassIcons items={items} className="library-icons" />
        </div>
      </div>
    </section>
  )
}

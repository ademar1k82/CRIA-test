import React from 'react'
import FlowingMenu from './FlowingMenu'
import '../styles/Values.css'

export default function Values() {
  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' },
    { link: '#', text: 'Ventura', image: 'https://picsum.photos/600/400?random=5' }
  ]

  return (
    <section className="values" id="values">
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu 
          items={demoItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#060010"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#060010"
          borderColor="#ffffff"
        />
      </div>
    </section>
  )
}

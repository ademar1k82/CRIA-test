import React from 'react'
import './styles/App.css'
import CardNav from './components/CardNav'
import LandingPage from './components/LandingPage'
import About from './components/About'
import Values from './components/Values'
import Planner from './components/Planner'
// import Library from './components/Library'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import cardNavItems from './data/cardNavItems.json'

export default function App() {
  return (
    <div className="app">

      <CardNav
        items={cardNavItems}
        baseColor="#ffffff"
        menuColor="#000"
        buttonBgColor="#2563eb"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div id="landing-page">
        <LandingPage />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="values">
        <Values />
      </div>
      <div id="planner">
        <Planner />
      </div>
      {/* <Library /> */}
      <div id="coming-soon">
        <ComingSoon />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  )
}

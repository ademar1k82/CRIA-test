import React from 'react'
import './styles/App.css'
import CardNav from './components/CardNav'
import LandingPage from './components/LandingPage'
import About from './components/About'
import Values from './components/Values'
import Planner from './components/Planner'
import Library from './components/Library'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'

export default function App() {
  const cardNavItems = [
    {
      label: "Sobre",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Empresa", ariaLabel: "Sobre a Empresa" },
        { label: "Carreiras", ariaLabel: "Carreiras" }
      ]
    },
    {
      label: "Projetos",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Destaque", ariaLabel: "Projetos em Destaque" },
        { label: "Casos", ariaLabel: "Estudos de Caso" }
      ]
    },
    {
      label: "Contato",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ]

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
      <About />
      <Values />
      <Planner />
      <Library />
      <ComingSoon />
      <Footer />
    </div>
  )
}

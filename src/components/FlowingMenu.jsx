import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

import '../styles/FlowingMenu.css'

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff',
  onItemClick = null
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            onItemClick={onItemClick}
          />
        ))}
      </nav>
    </div>
  )
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, onItemClick, p }) {
  const itemRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const animationRef = useRef(null)
  const [repetitions, setRepetitions] = useState(4)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [marqueeVisible, setMarqueeVisible] = useState(window.innerWidth <= 768)

  const animationDefaults = { duration: 0.6, ease: 'expo' }

  // Detectar mobile e mostrar marquee sempre em mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      setMarqueeVisible(mobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2
    const yDiff = y - y2
    return xDiff * xDiff + yDiff * yDiff
  }

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.offsetWidth
      const viewportWidth = window.innerWidth

      // Ensure we have enough repetitions to fill viewport on both sides with larger gap
      const needed = Math.ceil((viewportWidth * 3) / contentWidth)
      setRepetitions(Math.max(15, needed))
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [text, image])

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.offsetWidth
      if (contentWidth === 0) return

      if (animationRef.current) {
        animationRef.current.kill()
      }

      // Duration calcula-se pela largura do conteúdo dividida pela velocidade
      const durationPerPixel = 1 / speed
      const duration = contentWidth * durationPerPixel

      // Start from x: 0 (fully visible) and animate one full cycle
      gsap.set(marqueeInnerRef.current, { x: 0 })
      
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: duration,
        ease: 'none',
        repeat: -1,
        repeatDelay: 0,
        onRepeat: () => {
          gsap.set(marqueeInnerRef.current, { x: 0 })
        }
      })
    }

    // Ensure DOM is ready before measuring
    const timer = setTimeout(setupMarquee, 100)

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [text, image, repetitions, speed])

  const handleMouseEnter = ev => {
    if (isMobile) return // Mobile não precisa de hover effect
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = ev => {
    if (isMobile) return // Mobile não precisa de hover effect
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onClick={(e) => {
          e.preventDefault()
          if (onItemClick) {
            onItemClick({ text, image, p })
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      
      {isMobile ? (
        // Mobile: Static display without animation - text only
        <div className="marquee marquee--static" style={{ backgroundColor: marqueeBgColor }}>
          <div className="marquee__static-content" style={{ color: marqueeTextColor }}>
            <span>{text}</span>
          </div>
        </div>
      ) : (
        // Desktop: Animated marquee
        <div className={`marquee`} ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FlowingMenu

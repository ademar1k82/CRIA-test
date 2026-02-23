import React, { useRef, useEffect, useState } from 'react';
import './about.css';
import slides from '../data/slides.json';

const About = () => {
    const sectionRef = useRef(null);
    const [active, setActive] = useState(false);
    const [itemActive, setItemActive] = useState(0);
    const intervalRef = useRef(null);
    const thumbnailRefs = useRef([]);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setActive(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setItemActive(prev => (prev + 1) % slides.length);
        }, 15000);
        return () => clearInterval(intervalRef.current);
    }, [itemActive]);

    useEffect(() => {
        const node = thumbnailRefs.current[itemActive];
        if (node) {
            const rect = node.getBoundingClientRect();
            if (rect.left < 0 || rect.right > window.innerWidth) {
                node.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
            }
        }
    }, [itemActive]);

    const handleNext = () => {
        setItemActive(prev => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setItemActive(prev => (prev - 1 + slides.length) % slides.length);
    };

    const handleThumbnailClick = idx => {
        setItemActive(idx);
    };

    return (
        <section
            className='about-section'
            id='about'
            ref={sectionRef}
        >
            <div className='slider'>
                <div className='list'>
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.title}
                            className={`item${idx === itemActive && active ? ' active' : ''}`}
                        >
                            <img src={slide.img} alt={slide.alt} />
                            <div className='content'>
                                <h3>{slide.h3}</h3>
                                <h1><span>{slide.title}</span></h1>
                                {Array.isArray(slide.p) ? (
                                    <div className="values-list">
                                        {slide.p.map((item, i) => (
                                            <p key={i}>{item}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <p>{slide.p}</p>
                                        {slide.docs && (
                                            <div className="docs-list">
                                                {slide.docs.map((doc, i) => (
                                                    <a key={i} href={doc.url} className="doc-link" target="_blank" rel="noopener noreferrer">
                                                        <i className={doc.icon}></i>
                                                        <span>{doc.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='arrows'>
                    <button id="prev" onClick={handlePrev}>&lt;</button>
                    <button id="next" onClick={handleNext}>&gt;</button>
                </div>
                <div className='thumbnail'>
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.title}
                            className={`item${idx === itemActive ? ' active' : ''}`}
                            ref={el => (thumbnailRefs.current[idx] = el)}
                            onClick={() => handleThumbnailClick(idx)}
                        >
                            <img src={slide.img} alt={slide.alt} />
                            <div className='content'>{slide.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
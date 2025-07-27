import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import anime from 'animejs';
import { FEATURE_FLAGS } from '../config/features';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    anime({
      targets: '.nav-item',
      translateY: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 300}),
      easing: 'easeOutExpo',
      duration: 800
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // Special handling for AMS Classics - navigate to separate page
    if (targetId === 'ams-classics') {
      navigate('/ams-classics');
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If we're not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're on home page, just scroll
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Sono interessato ai vostri servizi automobilistici.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo nav-item">
          <Link to="/">
            <img 
              src="/immagineintestazione.jpg" 
              alt="AutoMultiService Logo" 
              className="logo-img"
            />
          </Link>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#servizi" onClick={(e) => handleNavClick(e, 'servizi')}>Servizi</a>
          </li>
          {FEATURE_FLAGS.AMS_CLASSICS_ENABLED && (
            <li className="nav-item">
              <a href="#ams-classics" onClick={(e) => handleNavClick(e, 'ams-classics')}>AMS Classics</a>
            </li>
          )}
          <li className="nav-item">
            <a href="#azienda" onClick={(e) => handleNavClick(e, 'azienda')}>Chi Siamo</a>
          </li>
          <li className="nav-item">
            <a href="#contatti" onClick={(e) => handleNavClick(e, 'contatti')}>Contatti</a>
          </li>
          <li className="nav-item">
            <button className="btn btn-whatsapp nav-whatsapp" onClick={handleWhatsAppClick}>
              WhatsApp
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
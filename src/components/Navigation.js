import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import anime from 'animejs';
import { FEATURE_FLAGS } from '../config/features';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Close mobile menu on scroll
    const handleScrollClose = () => {
      if (isMobileMenuOpen) {
        handleCloseMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollClose);
    
    // Enhanced mobile-aware animations
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      anime({
        targets: '.nav-item',
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 300}),
        easing: 'easeOutExpo',
        duration: 800
      });
    }

    // Close menu on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        handleCloseMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Detect touch device
    const detectTouch = () => {
      document.body.classList.toggle('touch-device', 'ontouchstart' in window);
    };
    detectTouch();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollClose);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  // Enhanced mobile menu close with animation
  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // Enhanced mobile menu toggle with haptic feedback
  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      handleCloseMenu();
    } else {
      setIsMobileMenuOpen(true);
      // Haptic feedback for supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // Special handling for AMS Classics - navigate to separate page
    if (targetId === 'ams-classics') {
      navigate('/ams-classics');
      handleCloseMenu();
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
    handleCloseMenu();
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Sono interessato ai vostri servizi automobilistici.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    handleCloseMenu();
  };

  // Handle backdrop click to close menu
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseMenu();
    }
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo nav-item">
            <Link to="/" className="touch-target">
              <img 
                src="/immagineintestazione.jpg" 
                alt="AutoMultiService Logo" 
                className="logo-img"
              />
            </Link>
          </div>
          
          <button 
            className={`mobile-menu-toggle touch-target touch-feedback ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={handleMenuToggle}
            aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul 
            ref={menuRef}
            className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''} ${isClosing ? 'closing' : ''}`}
          >
            <li className="nav-item">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className={`touch-target touch-feedback ${location.pathname === '/' && location.hash === '#home' ? 'active' : ''}`}
              >
                <span className="nav-item-icon">🏠</span>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#servizi" 
                onClick={(e) => handleNavClick(e, 'servizi')}
                className={`touch-target touch-feedback ${location.hash === '#servizi' ? 'active' : ''}`}
              >
                <span className="nav-item-icon">🔧</span>
                Servizi
              </a>
            </li>
            {FEATURE_FLAGS.AMS_CLASSICS_ENABLED && (
              <li className="nav-item">
                <a 
                  href="#ams-classics" 
                  onClick={(e) => handleNavClick(e, 'ams-classics')}
                  className={`touch-target touch-feedback ${location.pathname === '/ams-classics' ? 'active' : ''}`}
                >
                  <span className="nav-item-icon">🏎️</span>
                  AMS Classics
                </a>
              </li>
            )}
            <li className="nav-item">
              <a 
                href="#azienda" 
                onClick={(e) => handleNavClick(e, 'azienda')}
                className={`touch-target touch-feedback ${location.hash === '#azienda' ? 'active' : ''}`}
              >
                <span className="nav-item-icon">👥</span>
                Chi Siamo
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#contatti" 
                onClick={(e) => handleNavClick(e, 'contatti')}
                className={`touch-target touch-feedback ${location.hash === '#contatti' ? 'active' : ''}`}
              >
                <span className="nav-item-icon">📞</span>
                Contatti
              </a>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-whatsapp nav-whatsapp touch-target touch-feedback" 
                onClick={handleWhatsAppClick}
                aria-label="Contatta su WhatsApp"
              >
                <span className="nav-item-icon">💬</span>
                WhatsApp
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          ref={backdropRef}
          className={`nav-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navigation;
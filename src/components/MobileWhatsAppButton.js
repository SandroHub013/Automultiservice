import React, { useState, useEffect } from 'react';

const MobileWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide button when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Sono interessato ai vostri servizi AutoMultiService. Vorrei maggiori informazioni.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <div className={`whatsapp-float mobile-enhanced ${isVisible ? 'visible' : 'hidden'}`}>
      <button
        className={`whatsapp-button touch-target touch-feedback ${isPressed ? 'pressed' : ''}`}
        onClick={handleWhatsAppClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        aria-label="Contatta AutoMultiService su WhatsApp"
        title="Scrivici su WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="whatsapp-icon" aria-hidden="true">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.566"/>
        </svg>
        
        {/* Pulse animation ring */}
        <div className="whatsapp-pulse-ring"></div>
        
        {/* Notification badge (optional) */}
        <div className="whatsapp-notification-badge">
          <span className="whatsapp-notification-text">💬</span>
        </div>
      </button>
      
      {/* Tooltip for desktop */}
      <div className="whatsapp-tooltip">
        <span>Scrivici su WhatsApp!</span>
        <div className="whatsapp-tooltip-arrow"></div>
      </div>
    </div>
  );
};

export default MobileWhatsAppButton;
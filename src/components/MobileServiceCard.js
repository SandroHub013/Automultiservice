import React, { useState } from 'react';

const MobileServiceCard = ({ service, index, onWhatsAppClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    setIsPressed(true);
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleWhatsAppClick = () => {
    onWhatsAppClick(service.title);
    // Haptic feedback for button press
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  return (
    <div 
      className={`mobile-card service-card touch-feedback ${isPressed ? 'pressed' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Service Icon */}
      <div className="service-icon-container">
        <div className="service-icon">
          {getServiceIcon(service.title)}
        </div>
      </div>
      
      {/* Service Content */}
      <div className="service-content">
        <h3 className="mobile-title-3 service-title">{service.title}</h3>
        <p className="mobile-body service-description">{service.description}</p>
        
        {/* Service Features */}
        <ul className="service-features mobile-list">
          {service.features.map((feature, idx) => (
            <li key={idx} className="mobile-body-small">
              <span className="feature-icon">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* CTA Button */}
      <div className="service-cta-container">
        <button 
          className="btn btn-primary btn-full touch-target touch-feedback"
          onClick={handleWhatsAppClick}
          aria-label={`Richiedi preventivo per ${service.title}`}
        >
          <span className="btn-icon">💬</span>
          Richiedi Preventivo
        </button>
      </div>
    </div>
  );
};

// Service icon helper function
const getServiceIcon = (serviceTitle) => {
  const iconMap = {
    'Acquisto Veicoli Incidentati': '🚗💥',
    'Veicoli Chilometrati': '📊🚙',
    'Auto d\'Epoca': '🏎️✨',
    'Ricambi Usati Garantiti': '🔧⚙️',
    'Demolizione Veicoli': '🔨♻️',
    'Pagamenti in Contanti': '💰💳'
  };

  return iconMap[serviceTitle] || '🔧';
};

export default MobileServiceCard;
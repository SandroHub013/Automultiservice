import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo'
    });

    tl.add({
      targets: '.hero-logo',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000
    }, '-=600')
    .add({
      targets: '.hero-stats .stat',
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.8, 1],
      delay: anime.stagger(200),
      duration: 600
    }, '-=500')
    .add({
      targets: '.hero-cta',
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.9, 1],
      duration: 600
    }, '-=200');

    // Floating car icons animation
    anime({
      targets: '.floating-car',
      translateY: [
        { value: -10, duration: 2000 },
        { value: 10, duration: 2000 }
      ],
      rotateZ: [
        { value: 2, duration: 3000 },
        { value: -2, duration: 3000 }
      ],
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });

  }, []);


  const handleWhatsAppClick = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Vorrei un preventivo per il mio veicolo.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+393387487512';
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="hero-background">
        <div className="floating-car car-1"></div>
        <div className="floating-car car-2"></div>
        <div className="floating-car car-3"></div>
        <div className="floating-car car-4"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo">
            <img 
              src="/immagineintestazione.jpg" 
              alt="AutoMultiService Logo" 
              className="hero-logo-img"
            />
          </div>
          <p className="hero-subtitle">
            <strong>25 anni di esperienza</strong> nell'acquisto di veicoli incidentati, 
            chilometrati e d'epoca. Dal 2000 al vostro servizio.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">25+</div>
              <div className="stat-label">Anni di Esperienza</div>
            </div>
            <div className="stat">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Clienti Soddisfatti</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Pagamenti Sicuri</div>
            </div>
          </div>
          
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={handleWhatsAppClick}>
              Contattaci su WhatsApp
            </button>
            <button className="btn btn-outline btn-lg" onClick={handleCallClick}>
              Chiama Ora
            </button>
          </div>
          
          <div className="hero-guarantee">
            <p><strong>Valutazione Gratuita</strong> | <strong>Pagamento Immediato</strong> | <strong>Ritiro Gratuito</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
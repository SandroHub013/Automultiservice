import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import GoogleMap from './GoogleMap';

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.contact-card'),
              opacity: [0, 1],
              translateY: [40, 0],
              delay: anime.stagger(200),
              duration: 800,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleWhatsApp = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Vorrei informazioni sui vostri servizi.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = (number) => {
    window.location.href = `tel:+39${number}`;
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@automultiservice.it';
  };

  const handleMaps = () => {
    const address = 'Via del Lavoro, 12, 40061 Minerbio BO';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section id="contatti" className="contact-section section bg-light" ref={sectionRef}>
      <div className="container">
        <div className="contact-header text-center">
          <h2 className="section-title">Contattaci</h2>
          <p className="section-subtitle text-gray">
            Siamo sempre disponibili per una valutazione gratuita del tuo veicolo
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card bg-white shadow">
            <div className="contact-icon"></div>
            <h3>WhatsApp (Preferito)</h3>
            <p>Il modo più veloce per contattarci</p>
            <button className="btn btn-whatsapp contact-btn" onClick={handleWhatsApp}>
              Scrivi su WhatsApp
            </button>
          </div>
          
          <div className="contact-card bg-white shadow">
            <div className="contact-icon"></div>
            <h3>Telefono</h3>
            <div className="contact-phones">
              <p onClick={() => handleCall('3387487512')} className="phone-link">
                338.748.7512
              </p>
              <p onClick={() => handleCall('3887265091')} className="phone-link">
                388.726.5091
              </p>
            </div>
            <button className="btn btn-primary contact-btn" onClick={() => handleCall('3387487512')}>
              Chiama Ora
            </button>
          </div>
          
          <div className="contact-card bg-white shadow">
            <div className="contact-icon"></div>
            <h3>Email</h3>
            <p>info@automultiservice.it</p>
            <button className="btn btn-outline contact-btn" onClick={handleEmail}>
              Invia Email
            </button>
          </div>
          
          <div className="contact-card bg-white shadow">
            <div className="contact-icon"></div>
            <h3>Dove Siamo</h3>
            <p>Via del Lavoro, 12<br/>40061 Minerbio (BO)</p>
            <button className="btn btn-outline contact-btn" onClick={handleMaps}>
              Vedi su Maps
            </button>
          </div>
        </div>
        
        <div className="business-hours bg-white shadow">
          <h3>Orari di Apertura</h3>
          <div className="hours-grid">
            <div className="hours-item">
              <span className="day">Lunedì - Giovedì</span>
              <span className="time">8:00-12:30 / 14:00-17:30</span>
            </div>
            <div className="hours-item">
              <span className="day">Venerdì</span>
              <span className="time">8:00-12:30 / 14:00-17:00</span>
            </div>
            <div className="hours-item">
              <span className="day">Sabato</span>
              <span className="time">Solo su appuntamento</span>
            </div>
            <div className="hours-item">
              <span className="day">Domenica</span>
              <span className="time">Chiuso</span>
            </div>
          </div>
        </div>
        
        <div className="contact-cta text-center">
          <div className="cta-content bg-red">
            <h3>Hai un veicolo da vendere?</h3>
            <p>Contattaci ora per una valutazione gratuita e immediata!</p>
            <div className="cta-buttons">
              <button className="btn btn-whatsapp btn-lg" onClick={handleWhatsApp}>
                WhatsApp Gratuito
              </button>
              <button className="btn btn-outline btn-lg btn-white" onClick={() => handleCall('3387487512')}>
                Chiama Subito
              </button>
            </div>
            <p className="cta-note">
              Valutazione Gratuita | Pagamento in Contanti | Ritiro Immediato
            </p>
          </div>
        </div>
        
        <GoogleMap />
      </div>
    </section>
  );
};

export default Contact;
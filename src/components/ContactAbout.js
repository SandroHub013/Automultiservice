import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import GoogleMap from './GoogleMap';

const ContactAbout = () => {
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
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutExpo'
            });

            anime({
              targets: entry.target.querySelectorAll('.company-info'),
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 800,
              delay: 200,
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
    <section id="contatti" className="contact-about-section section bg-light" ref={sectionRef}>
      <div className="container">
        <div className="contact-header text-center">
          <h2 className="section-title">Contatti e Chi Siamo</h2>
          <p className="section-subtitle text-gray">
            25 anni di esperienza al vostro servizio. Contattateci per una valutazione gratuita!
          </p>
        </div>
        
        <div className="contact-about-grid">
          {/* Sezione Contatti */}
          <div className="contact-section-wrapper">
            <h3 className="subsection-title">Come Contattarci</h3>
            <div className="contact-cards">
              <div className="contact-card modern-card bg-white shadow">
                <div className="card-header whatsapp-gradient">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" className="contact-icon-svg">
                      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.087"/>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h4>WhatsApp</h4>
                    <span className="card-badge preferred">Preferito</span>
                  </div>
                </div>
                <div className="card-content">
                  <p className="contact-number">338.748.7512</p>
                  <p className="contact-description">Il modo più veloce per contattarci</p>
                  <button className="btn btn-whatsapp btn-modern" onClick={handleWhatsApp}>
                    <svg viewBox="0 0 24 24" className="btn-icon">
                      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.087"/>
                    </svg>
                    Scrivi su WhatsApp
                  </button>
                </div>
              </div>
              
              <div className="contact-card modern-card bg-white shadow">
                <div className="card-header phone-gradient">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" className="contact-icon-svg">
                      <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h4>Telefono</h4>
                    <span className="card-badge">Chiamata diretta</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="phone-numbers">
                    <p className="contact-number primary">338.748.7512</p>
                    <p className="contact-number">388.726.5091</p>
                  </div>
                  <p className="contact-description">Chiamaci per una valutazione immediata</p>
                  <button className="btn btn-primary btn-modern" onClick={() => handleCall('3387487512')}>
                    <svg viewBox="0 0 24 24" className="btn-icon">
                      <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                    Chiama Ora
                  </button>
                </div>
              </div>
              
              <div className="contact-card modern-card bg-white shadow">
                <div className="card-header email-gradient">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" className="contact-icon-svg">
                      <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h4>Email</h4>
                    <span className="card-badge">Risposta 24h</span>
                  </div>
                </div>
                <div className="card-content">
                  <p className="contact-number">info@automultiservice.it</p>
                  <p className="contact-description">Inviaci i dettagli del tuo veicolo</p>
                  <button className="btn btn-outline btn-modern" onClick={handleEmail}>
                    <svg viewBox="0 0 24 24" className="btn-icon">
                      <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                    Scrivi Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sezione Informazioni Aziendali */}
          <div className="company-info bg-white shadow">
            <h3 className="subsection-title">La Nostra Azienda</h3>
            
            <div className="company-details">
              <div className="company-highlight">
                <div className="experience-badge">
                  <span className="badge-number">25</span>
                  <span className="badge-label">Anni<br/>Esperienza</span>
                </div>
                <div className="company-text">
                  <h4>AutoMultiService S.a.S.</h4>
                  <p><strong>Dal 2000</strong> acquistiamo veicoli incidentati, chilometrati e d'epoca con <strong>pagamenti tramite bonifico o contanti</strong>.</p>
                </div>
              </div>

              <div className="company-address">
                <h5>📍 La Nostra Sede</h5>
                <p><strong>Via del Lavoro, 12</strong><br/>40061 Minerbio (Bologna)</p>
                <button className="btn btn-outline btn-sm" onClick={handleMaps}>
                  Vedi su Maps
                </button>
              </div>

              <div className="company-hours">
                <h5>🕒 Orari di Apertura</h5>
                <div className="hours-compact">
                  <div className="hour-row">
                    <span>Lun-Gio:</span> <span>8:00-12:30 / 14:00-17:30</span>
                  </div>
                  <div className="hour-row">
                    <span>Venerdì:</span> <span>8:00-12:30 / 14:00-17:00</span>
                  </div>
                  <div className="hour-row">
                    <span>Sabato:</span> <span>Su appuntamento</span>
                  </div>
                </div>
              </div>

              <div className="company-features">
                <div className="feature-tags">
                  <span className="tag">✅ 25 Anni Esperienza</span>
                  <span className="tag">💰 Pagamenti Sicuri</span>
                  <span className="tag">🚚 Ritiro Gratuito</span>
                  <span className="tag">⚡ Valutazione Immediata</span>
                </div>
              </div>

              <div className="company-data">
                <h5>📋 Dati Aziendali</h5>
                <div className="data-compact">
                  <p><strong>Ragione Sociale:</strong> AutoMultiService s.a.s. di D'Andrea Antonio & C.</p>
                  <p><strong>P.IVA:</strong> 04704900283</p>
                  <p><strong>Fondazione:</strong> 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Finale */}
        <div className="contact-cta text-center">
          <div className="cta-content bg-red">
            <h3>Pronto per la Valutazione Gratuita?</h3>
            <p>I nostri 25 anni di esperienza garantiscono professionalità e pagamenti sicuri!</p>
            <div className="cta-buttons">
              <button className="btn btn-whatsapp btn-lg" onClick={handleWhatsApp}>
                Contatta su WhatsApp
              </button>
              <button className="btn btn-outline btn-lg btn-white" onClick={() => handleCall('3387487512')}>
                Chiama Subito
              </button>
            </div>
            <p className="cta-note">
              ✅ Valutazione Gratuita | 💳 Bonifico o Contanti | 🚚 Ritiro Immediato
            </p>
          </div>
        </div>
        
        {/* Mappa Google Maps */}
        <GoogleMap />
      </div>
    </section>
  );
};

export default ContactAbout;
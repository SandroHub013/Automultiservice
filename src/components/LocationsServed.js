import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const LocationsServed = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.location-card'),
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(100),
              duration: 600,
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

  const locations = [
    { city: 'Bologna', province: 'BO', region: 'Emilia-Romagna' },
    { city: 'Modena', province: 'MO', region: 'Emilia-Romagna' },
    { city: 'Ferrara', province: 'FE', region: 'Emilia-Romagna' },
    { city: 'Parma', province: 'PR', region: 'Emilia-Romagna' },
    { city: 'Reggio Emilia', province: 'RE', region: 'Emilia-Romagna' },
    { city: 'Cesena', province: 'FC', region: 'Emilia-Romagna' },
    { city: 'Ravenna', province: 'RA', region: 'Emilia-Romagna' },
    { city: 'Imola', province: 'BO', region: 'Emilia-Romagna' },
    { city: 'Verona', province: 'VR', region: 'Veneto' },
    { city: 'Padova', province: 'PD', region: 'Veneto' },
    { city: 'Rovigo', province: 'RO', region: 'Veneto' },
    { city: 'Mantova', province: 'MN', region: 'Lombardia' },
    { city: 'Firenze', province: 'FI', region: 'Toscana' }
  ];

  const handleWhatsApp = (city) => {
    const phoneNumber = '393387487512';
    const message = `Ciao! Sono interessato ai vostri servizi a ${city}. Potete fornirmi maggiori informazioni?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="zone-servite" className="locations-section section bg-white" ref={sectionRef}>
      <div className="container">
        <div className="locations-header text-center">
          <h2 className="section-title">Zone Servite</h2>
          <p className="section-subtitle text-gray">
            Acquistiamo auto incidentate e sinistratre in tutto il Nord-Centro Italia
          </p>
        </div>

        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card bg-light shadow">
              <h4 className="location-city">{location.city}</h4>
              <p className="location-details">{location.province} - {location.region}</p>
              <button 
                className="btn btn-outline location-btn"
                onClick={() => handleWhatsApp(location.city)}
              >
                Contattaci per {location.city}
              </button>
            </div>
          ))}
        </div>

        <div className="locations-cta text-center">
          <h3>Servizio di Ritiro Gratuito</h3>
          <p>
            Non importa dove ti trovi in queste zone: veniamo noi da te per la valutazione 
            e il ritiro del veicolo, completamente gratis.
          </p>
          <div className="cta-features">
            <div className="feature">
              <strong>Valutazione</strong>
              <span>Sopralluogo gratuito</span>
            </div>
            <div className="feature">
              <strong>Pagamento</strong>
              <span>Bonifico o contanti</span>
            </div>
            <div className="feature">
              <strong>Ritiro</strong>
              <span>Trasporto incluso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsServed;
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import MobileServiceCard from './MobileServiceCard';

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Mobile-friendly intersection observer with fallback
    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 0.1 : 0.3;
    
    // Fallback visibility timer for mobile devices
    const fallbackTimer = setTimeout(() => {
      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.service-card');
        const title = sectionRef.current.querySelector('.section-title');
        cards.forEach(card => {
          card.style.opacity = '1';
          card.style.visibility = 'visible';
          card.style.transform = 'translateY(0)';
        });
        if (title) {
          title.style.opacity = '1';
          title.style.visibility = 'visible';
          title.style.transform = 'translateY(0)';
        }
      }
    }, isMobile ? 500 : 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            
            try {
              anime({
                targets: entry.target.querySelectorAll('.service-card'),
                opacity: [0, 1],
                translateY: [50, 0],
                rotateX: [-10, 0],
                delay: anime.stagger(200),
                duration: 800,
                easing: 'easeOutExpo'
              });

              anime({
                targets: entry.target.querySelector('.section-title'),
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutExpo'
              });
            } catch (error) {
              // Fallback if anime.js fails
              console.warn('Animation failed, using fallback', error);
              const cards = entry.target.querySelectorAll('.service-card');
              const title = entry.target.querySelector('.section-title');
              cards.forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = 'translateY(0)';
              });
              if (title) {
                title.style.opacity = '1';
                title.style.visibility = 'visible';
                title.style.transform = 'translateY(0)';
              }
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const services = [
    {
      icon: '',
      title: 'Acquisto Veicoli Incidentati',
      description: 'Acquistiamo auto incidentate di ogni marca e modello. Valutazione gratuita e pagamento immediato tramite bonifico o contanti.',
      features: ['Valutazione gratuita', 'Pagamento immediato', 'Ritiro gratuito']
    },
    {
      icon: '',
      title: 'Veicoli Chilometrati',
      description: 'Compriamo veicoli con chilometraggio elevato. Non importa i km, valutiamo ogni auto.',
      features: ['Qualsiasi chilometraggio', 'Prezzo equo', 'Documentazione completa']
    },
    {
      icon: '',
      title: 'Auto d\'Epoca',
      description: 'Specializzati nell\'acquisto di veicoli d\'epoca e da collezione. Esperti del settore vintage.',
      features: ['Esperti qualificati', 'Valutazione professionale', 'Documenti ASI']
    },
    {
      icon: '',
      title: 'Ricambi Usati Garantiti',
      description: 'Vendita ricambi auto usati con garanzia 12 mesi. Motori, cambi, pneumatici e carrozzeria.',
      features: ['Garanzia 12 mesi', 'Ampio magazzino', 'Prezzi competitivi']
    },
    {
      icon: '',
      title: 'Demolizione Veicoli',
      description: 'Servizio gratuito di demolizione veicoli con rilascio certificato di rottamazione.',
      features: ['Servizio gratuito', 'Certificato ufficiale', 'Smaltimento ecologico']
    },
    {
      icon: '',
      title: 'Pagamenti in Contanti',
      description: 'Pagamenti sicuri tramite bonifico bancario o contanti prima del ritiro del veicolo.',
      features: ['Bonifico o contanti', 'Pagamento immediato', 'Massima sicurezza']
    }
  ];

  const handleWhatsApp = (service) => {
    const phoneNumber = '393387487512';
    const message = `Ciao! Sono interessato al servizio: ${service}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="servizi" className="services-section" ref={sectionRef}>
      <div className="mobile-container">
        <h2 className="mobile-title-1 section-title">I Nostri Servizi</h2>
        <p className="mobile-body-large section-subtitle">
          25 anni di esperienza nel settore automobilistico
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <MobileServiceCard
              key={index}
              service={service}
              index={index}
              onWhatsAppClick={handleWhatsApp}
            />
          ))}
        </div>
        
        <div className="services-cta">
          <h3 className="mobile-title-2">Non trovi il servizio che cerchi?</h3>
          <p className="mobile-body">Contattaci su WhatsApp per un consulto personalizzato</p>
          <button 
            className="btn btn-whatsapp btn-lg touch-target touch-feedback"
            onClick={() => handleWhatsApp('Consulto personalizzato')}
            aria-label="Consulto gratuito su WhatsApp"
          >
            <span className="btn-icon">💬</span>
            Consulto Gratuito su WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
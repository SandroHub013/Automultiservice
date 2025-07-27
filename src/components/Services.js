import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    <section id="servizi" className="services-section section bg-light" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">I Nostri Servizi</h2>
        <p className="section-subtitle text-center text-gray">
          25 anni di esperienza nel settore automobilistico
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-white shadow">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              
              <button 
                className="btn btn-primary service-cta"
                onClick={() => handleWhatsApp(service.title)}
              >
                Richiedi Preventivo
              </button>
            </div>
          ))}
        </div>
        
        <div className="services-cta text-center">
          <h3>Non trovi il servizio che cerchi?</h3>
          <p>Contattaci su WhatsApp per un consulto personalizzato</p>
          <button 
            className="btn btn-whatsapp btn-lg"
            onClick={() => handleWhatsApp('Consulto personalizzato')}
          >
            Consulto Gratuito su WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
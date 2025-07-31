import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Mobile-friendly intersection observer with fallback
    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 0.1 : 0.3;
    
    // Fallback visibility timer for mobile devices
    const fallbackTimer = setTimeout(() => {
      if (sectionRef.current) {
        const content = sectionRef.current.querySelector('.about-content');
        const image = sectionRef.current.querySelector('.about-image');
        const features = sectionRef.current.querySelectorAll('.feature-item');
        
        [content, image, ...features].forEach(element => {
          if (element) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.transform = 'translateX(0) translateY(0)';
          }
        });
      }
    }, isMobile ? 500 : 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            
            try {
              const tl = anime.timeline({
                easing: 'easeOutExpo'
              });

              tl.add({
                targets: entry.target.querySelector('.about-content'),
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 800
              })
              .add({
                targets: entry.target.querySelector('.about-image'),
                opacity: [0, 1],
                translateX: [50, 0],
                duration: 800
              }, '-=600')
              .add({
                targets: entry.target.querySelectorAll('.feature-item'),
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(150),
                duration: 600
              }, '-=400');
            } catch (error) {
              // Fallback if anime.js fails
              console.warn('Animation failed, using fallback', error);
              const content = entry.target.querySelector('.about-content');
              const image = entry.target.querySelector('.about-image');
              const features = entry.target.querySelectorAll('.feature-item');
              
              [content, image, ...features].forEach(element => {
                if (element) {
                  element.style.opacity = '1';
                  element.style.visibility = 'visible';
                  element.style.transform = 'translateX(0) translateY(0)';
                }
              });
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

  const features = [
    {
      icon: '',
      title: '25 Anni di Esperienza',
      description: 'Dal 2000 operiamo nel settore automobilistico con professionalità e competenza'
    },
    {
      icon: '',
      title: 'Migliaia di Clienti Soddisfatti',
      description: 'Oltre 5000 clienti hanno scelto i nostri servizi con piena soddisfazione'
    },
    {
      icon: '',
      title: 'Pagamenti Sicuri',
      description: 'Pagamenti tramite bonifico bancario o contanti per massima flessibilità'
    },
    {
      icon: '',
      title: 'Territorio di Bologna',
      description: 'Presenti a Minerbio e serviamo tutta la provincia di Bologna'
    },
    {
      icon: '',
      title: 'Garanzia 12 Mesi',
      description: 'Tutti i ricambi venduti sono garantiti per 12 mesi'
    },
    {
      icon: '',
      title: 'Ritiro Gratuito',
      description: 'Ritiriamo gratuitamente i veicoli direttamente a casa tua'
    }
  ];

  const handleWhatsApp = () => {
    const phoneNumber = '393387487512';
    const message = 'Ciao! Vorrei maggiori informazioni sulla vostra azienda.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="azienda" className="about-section section bg-white" ref={sectionRef}>
      <div className="container">
        <div className="about-header text-center">
          <h2 className="section-title">Chi Siamo</h2>
          <p className="section-subtitle text-gray">
            AutoMultiService S.a.S. - La tua fiducia è il nostro successo
          </p>
        </div>
        
        <div className="about-main">
          <div className="about-content">
            <h3>La Nostra Storia</h3>
            <p>
              <strong>AutoMultiService S.a.S.</strong> è un'azienda fondata nel 2000 con sede a 
              Minerbio (Bologna) che opera nel settore dell'acquisto e vendita di veicoli e ricambi automobilistici.
            </p>
            
            <p>
              Con <strong>25 anni di esperienza</strong> nel settore, ci siamo specializzati nell'acquisto 
              di veicoli incidentati, chilometrati e d'epoca, offrendo sempre il miglior prezzo di mercato 
              con <strong>pagamenti tramite bonifico bancario o contanti</strong>.
            </p>
            
            <p>
              La nostra filosofia si basa su <strong>trasparenza, professionalità e rapidità</strong>. 
              Ogni transazione viene gestita con la massima serietà, garantendo ai nostri clienti 
              un servizio completo dalla valutazione al pagamento immediato.
            </p>
            
            <div className="company-data">
              <h4>Dati Aziendali</h4>
              <ul>
                <li><strong>Ragione Sociale:</strong> AutoMultiService s.a.s. di D'Andrea Antonio & C.</li>
                <li><strong>Sede Operativa:</strong> Via del Lavoro, 12 - 40061 Minerbio (BO)</li>
                <li><strong>P.IVA:</strong> 04704900283</li>
                <li><strong>Anno di Fondazione:</strong> 2000</li>
              </ul>
            </div>
          </div>
          
          <div className="about-image">
            <div className="experience-badge">
              <div className="badge-number">25</div>
              <div className="badge-text">Anni di<br/>Esperienza</div>
            </div>
          </div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="about-cta text-center">
          <h3>Perché Scegliere AutoMultiService?</h3>
          <p>
            I nostri 25 anni di esperienza e la soddisfazione di migliaia di clienti 
            parlano per noi. Affidati ai professionisti del settore.
          </p>
          <button className="btn btn-whatsapp btn-lg" onClick={handleWhatsApp}>
            Scopri di Più su WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
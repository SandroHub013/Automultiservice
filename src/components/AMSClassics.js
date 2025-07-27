import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const AMSClassics = () => {
  const sectionRef = useRef(null);
  const [selectedEra, setSelectedEra] = useState('all');

  useEffect(() => {
    // Animate in the main content
    setTimeout(() => {
      anime({
        targets: '.classics-hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      });

      anime({
        targets: '.vintage-card',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutExpo'
      });
    }, 300);
  }, []);

  const classicCars = [
    {
      era: '1950s',
      brand: 'Alfa Romeo',
      model: 'Giulietta Sprint',
      year: '1954-1965',
      description: 'Icona del design italiano, perfetta fusione tra eleganza e sportività.',
      expertise: 'Specialisti in restauro carrozzeria Pininfarina'
    },
    {
      era: '1960s',
      brand: 'Ferrari',
      model: 'Dino 246 GT',
      year: '1969-1974',
      description: 'Il gioiello di Maranello con motore V6, pura poesia automobilistica.',
      expertise: 'Esperti in valutazione autenticità Ferrari'
    },
    {
      era: '1960s',
      brand: 'Fiat',
      model: '500',
      year: '1957-1975',
      description: 'La vettura che ha motorizzato l\'Italia, simbolo di libertà e design.',
      expertise: 'Conoscenza approfondita versioni e allestimenti'
    },
    {
      era: '1970s',
      brand: 'Lancia',
      model: 'Stratos HF',
      year: '1973-1978',
      description: 'La leggenda dei rally, design Bertone e cuore Ferrari.',
      expertise: 'Valutazioni certificate per veicoli da competizione'
    },
    {
      era: '1970s',
      brand: 'Lamborghini',
      model: 'Countach',
      year: '1974-1990',
      description: 'Rivoluzione del design supercar, linee taglienti e prestazioni estreme.',
      expertise: 'Specialisti in supercar d\'epoca certificate'
    },
    {
      era: '1980s',
      brand: 'BMW',
      model: 'M3 E30',
      year: '1986-1991',
      description: 'La prima M3, equilibrio perfetto tra strada e pista.',
      expertise: 'Competenza in BMW sportive e versioni speciali'
    }
  ];

  const services = [
    {
      title: 'Valutazione Professionale',
      description: 'Perizie complete per auto d\'epoca con certificazione ASI e FMI',
      features: [
        'Ispezione tecnica approfondita',
        'Verifica autenticità e matching numbers',
        'Documentazione storica completa',
        'Valutazione di mercato aggiornata'
      ]
    },
    {
      title: 'Acquisto Immediato',
      description: 'Acquistiamo auto d\'epoca in qualsiasi condizione',
      features: [
        'Pagamento tramite bonifico o contanti',
        'Ritiro gratuito ovunque in Italia',
        'Massima discrezione nelle trattative',
        'Esperienza ventennale nel settore'
      ]
    },
    {
      title: 'Consulenza Specializzata',
      description: 'Supporto completo per collezionisti e appassionati',
      features: [
        'Ricerca veicoli specifici',
        'Consulenza pre-acquisto',
        'Supporto pratiche ASI',
        'Network internazionale di esperti'
      ]
    }
  ];

  const filteredCars = selectedEra === 'all' 
    ? classicCars 
    : classicCars.filter(car => car.era === selectedEra);

  const handleWhatsApp = (carInfo = null) => {
    const phoneNumber = '393387487512';
    const message = carInfo 
      ? `Ciao! Sono interessato alla valutazione di una ${carInfo.brand} ${carInfo.model}. Potete aiutarmi?`
      : 'Ciao! Sono interessato ai servizi AMS Classics per auto d\'epoca.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="ams-classics" className="classics-section" ref={sectionRef}>
      {/* Hero Section */}
      <div className="classics-hero">
        <div className="container">
          <div className="classics-hero-content">
            <h1 className="classics-hero-title">AMS CLASSICS</h1>
            <p className="classics-hero-subtitle">
              <strong>Specialisti in Auto d'Epoca dal 2000</strong><br/>
              Passione, competenza e rispetto per la storia automobilistica italiana
            </p>
            <div className="classics-hero-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Auto d'Epoca Valutate</div>
              </div>
              <div className="stat">
                <div className="stat-number">20</div>
                <div className="stat-label">Anni di Esperienza</div>
              </div>
              <div className="stat">
                <div className="stat-number">ASI</div>
                <div className="stat-label">Certificazioni Ufficiali</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Era Filter */}
      <div className="era-filter bg-light">
        <div className="container">
          <h2 className="section-title text-center">Le Nostre Specializzazioni</h2>
          <div className="filter-buttons">
            {['all', '1950s', '1960s', '1970s', '1980s'].map(era => (
              <button
                key={era}
                className={`filter-btn ${selectedEra === era ? 'active' : ''}`}
                onClick={() => setSelectedEra(era)}
              >
                {era === 'all' ? 'Tutte le Epoche' : `Anni '${era.slice(0, 2)}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vintage Cars Showcase */}
      <div className="vintage-showcase bg-white">
        <div className="container">
          <div className="vintage-grid">
            {filteredCars.map((car, index) => (
              <div key={index} className="vintage-card shadow">
                <div className="card-header">
                  <span className="era-badge">{car.era}</span>
                  <h3 className="car-title">{car.brand} {car.model}</h3>
                  <p className="car-year">{car.year}</p>
                </div>
                <div className="card-body">
                  <p className="car-description">{car.description}</p>
                  <div className="expertise-note">
                    <strong>La nostra competenza:</strong>
                    <span>{car.expertise}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => handleWhatsApp(car)}
                  >
                    Richiedi Valutazione
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="classics-services bg-light">
        <div className="container">
          <h2 className="section-title text-center">I Nostri Servizi Specializzati</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white shadow">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className="btn btn-primary service-cta"
                  onClick={() => handleWhatsApp()}
                >
                  Scopri di Più
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valuation Form */}
      <div className="valuation-form bg-white">
        <div className="container">
          <div className="form-content">
            <div className="form-header text-center">
              <h2 className="section-title">Valutazione Gratuita Auto d'Epoca</h2>
              <p className="section-subtitle">
                Compila il form per ricevere una prima valutazione della tua auto d'epoca
              </p>
            </div>
            
            <div className="form-wrapper">
              <div className="form-info">
                <h3>Cosa Valutiamo</h3>
                <ul className="evaluation-list">
                  <li>Auto italiane d'epoca (Alfa Romeo, Ferrari, Fiat, Lancia)</li>
                  <li>Supercar vintage (Lamborghini, Maserati)</li>
                  <li>Auto sportive storiche (BMW M, Porsche 911)</li>
                  <li>Veicoli commerciali d'epoca (Piaggio Ape, Fiat 615)</li>
                  <li>Motocicli storici e da collezione</li>
                </ul>
                
                <div className="certification-info">
                  <h4>Certificazioni e Partnership</h4>
                  <p>
                    Collaboriamo con <strong>ASI (Automotoclub Storico Italiano)</strong> 
                    e <strong>FMI (Federazione Motociclistica Italiana)</strong> per 
                    certificazioni ufficiali.
                  </p>
                </div>
              </div>
              
              <div className="quick-contact">
                <h3>Contatto Diretto</h3>
                <p>Per una valutazione immediata, contattaci direttamente:</p>
                <div className="contact-methods">
                  <button 
                    className="btn btn-whatsapp btn-lg"
                    onClick={() => handleWhatsApp()}
                  >
                    WhatsApp Immediato
                  </button>
                  <button 
                    className="btn btn-outline btn-lg"
                    onClick={() => window.location.href = 'tel:+393387487512'}
                  >
                    Chiamata Diretta
                  </button>
                </div>
                
                <div className="guarantee">
                  <p>
                    <strong>Garanzia di Professionalità:</strong><br/>
                    Valutazioni accurate, massima discrezione, 
                    pagamenti immediati tramite bonifico o contanti per acquisti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="classics-cta bg-red">
        <div className="container text-center">
          <h2>Hai un'Auto d'Epoca da Valutare?</h2>
          <p>
            I nostri esperti sono pronti ad aiutarti. Contattaci ora per una 
            consulenza gratuita e scopri il vero valore del tuo gioiello d'epoca.
          </p>
          <div className="cta-buttons">
            <button 
              className="btn btn-whatsapp btn-lg"
              onClick={() => handleWhatsApp()}
            >
              Contatto WhatsApp
            </button>
            <button 
              className="btn btn-outline btn-lg btn-white"
              onClick={() => window.location.href = 'mailto:info@automultiservice.it'}
            >
              Invia Email
            </button>
          </div>
          <p className="cta-note">
            Valutazione Professionale | Certificazioni ASI | Pagamenti in Contanti
          </p>
        </div>
      </div>
    </section>
  );
};

export default AMSClassics;
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import anime from 'animejs';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  useEffect(() => {
    // Smooth entrance animations
    anime({
      targets: '.fade-in',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutExpo'
    });

    // Floating animation for background elements
    anime({
      targets: '.floating-element',
      translateY: [
        { value: -15, duration: 2000 },
        { value: 15, duration: 2000 }
      ],
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>AutoMultiService S.a.S. - Acquisto Veicoli Incidentati | Minerbio Bologna</title>
        <meta name="description" content="AutoMultiService acquista veicoli incidentati, chilometrati e d'epoca. 25 anni di esperienza, pagamenti tramite bonifico o contanti, valutazione gratuita. Minerbio (Bologna)" />
        <meta name="keywords" content="acquisto auto incidentate, veicoli chilometrati, ricambi auto usati, demolizione veicoli, Minerbio, Bologna, pagamento bonifico, pagamento contanti" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AutomotiveBusiness",
              "name": "AutoMultiService S.a.S.",
              "alternateName": "AutoMultiService",
              "description": "Acquisto veicoli incidentati, chilometrati, d'epoca e vendita ricambi auto usati",
              "foundingDate": "2000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via del Lavoro, 12",
                "addressLocality": "Minerbio",
                "addressRegion": "Emilia-Romagna",
                "postalCode": "40061",
                "addressCountry": "IT"
              },
              "telephone": ["+39 338 748 7512", "+39 388 726 5091"],
              "email": "info@automultiservice.it",
              "url": "https://automultiservice.it",
              "openingHours": [
                "Mo-Th 08:00-12:30,14:00-17:30",
                "Fr 08:00-12:30,14:00-17:00",
                "Sa by appointment"
              ],
              "paymentAccepted": ["Cash", "Bank Transfer"],
              "areaServed": ["Bologna", "Emilia-Romagna", "Italia"],
              "serviceType": ["Acquisto veicoli incidentati", "Acquisto veicoli chilometrati", "Acquisto veicoli d'epoca", "Vendita ricambi auto", "Demolizione veicoli"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi Automobilistici",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Acquisto Veicoli Incidentati",
                      "description": "Acquistiamo auto incidentate con valutazione gratuita e pagamento immediato tramite bonifico o contanti"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Vendita Ricambi Auto Usati",
                      "description": "Ricambi auto usati garantiti 12 mesi"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150",
                "bestRating": "5"
              }
            }
          `}
        </script>
      </Helmet>
      
      <Hero />
      <Services />
      <About />
      <Contact />
      
      {/* SEO: Zone servite - contenuto nascosto per SEO */}
      <div style={{display: 'none'}}>
        <h2>Zone Servite - Acquistiamo auto incidentate e sinistratre</h2>
        <p>Acquistiamo auto incidentate e sinistratre in tutto il Nord-Centro Italia: Bologna, Modena, Ferrara, Parma, Reggio Emilia, Cesena, Ravenna, Imola, Verona, Padova, Rovigo, Mantova, Firenze. Servizio di ritiro gratuito con valutazione sopralluogo gratuita, pagamento tramite bonifico o contanti e trasporto incluso.</p>
      </div>
    </>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AMSClassics from '../components/AMSClassics';
import VideoSplash from '../components/VideoSplash';

const AMSClassicsPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <Helmet>
        <title>AMS Classics - Specialisti Auto d'Epoca | AutoMultiService</title>
        <meta name="description" content="AMS Classics: specialisti in auto d'epoca italiane. Valutazioni certificate ASI, acquisto Ferrari, Alfa Romeo, Lancia, Fiat storiche. 25 anni di esperienza." />
        <meta name="keywords" content="auto d'epoca, Ferrari vintage, Alfa Romeo storica, Lancia Stratos, Fiat 500 epoca, valutazione ASI, acquisto auto storiche, classics car Bologna" />
        
        {/* Structured Data for Classics */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AutomotiveBusiness",
              "name": "AMS Classics - AutoMultiService S.a.S.",
              "alternateName": "AMS Classics",
              "description": "Specialisti in valutazione e acquisto auto d'epoca italiane. Certificazioni ASI e FMI.",
              "parentOrganization": {
                "@type": "Organization",
                "name": "AutoMultiService S.a.S."
              },
              "serviceType": [
                "Valutazione auto d'epoca",
                "Acquisto Ferrari vintage",
                "Acquisto Alfa Romeo storiche",
                "Certificazioni ASI",
                "Consulenza auto da collezione"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi Auto d'Epoca",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Valutazione Professionale Auto d'Epoca",
                      "description": "Perizie complete per auto d'epoca con certificazione ASI e FMI"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Acquisto Auto Storiche",
                      "description": "Acquistiamo auto d'epoca in qualsiasi condizione con pagamento immediato tramite bonifico o contanti"
                    }
                  }
                ]
              },
              "specialty": [
                "Ferrari vintage",
                "Alfa Romeo storiche", 
                "Lancia d'epoca",
                "Fiat storiche",
                "BMW M storiche",
                "Lamborghini vintage"
              ]
            }
          `}
        </script>
      </Helmet>
      
      {showSplash && <VideoSplash onComplete={handleSplashComplete} />}
      {!showSplash && <AMSClassics />}
    </>
  );
};

export default AMSClassicsPage;
import React from 'react';

const FeatureBlocked = ({ 
  title = "Funzionalità Non Disponibile", 
  message = "Questa sezione è temporaneamente non disponibile.",
  showHomeButton = true 
}) => {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <section className="feature-blocked-section">
      <div className="container">
        <div className="blocked-content">
          <div className="blocked-icon">
            🔧
          </div>
          <h1 className="blocked-title">{title}</h1>
          <p className="blocked-message">{message}</p>
          
          <div className="blocked-info">
            <div className="info-card">
              <h3>🚗 Nel frattempo, scopri i nostri servizi</h3>
              <ul>
                <li>✅ Acquisto veicoli incidentati</li>
                <li>✅ Valutazione gratuita</li>
                <li>✅ Pagamento immediato</li>
                <li>✅ Ritiro gratuito</li>
              </ul>
            </div>
          </div>

          {showHomeButton && (
            <div className="blocked-actions">
              <button className="btn btn-primary btn-lg" onClick={handleHomeClick}>
                🏠 Torna alla Home
              </button>
              <a 
                href="https://wa.me/393387487512?text=Ciao!%20Sono%20interessato%20ai%20vostri%20servizi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                💬 Contattaci su WhatsApp
              </a>
            </div>
          )}
          
          <div className="blocked-footer">
            <p>
              <strong>AutoMultiService S.a.S.</strong> - 25 anni di esperienza al vostro servizio
            </p>
            <p>📍 Via del Lavoro, 12 - 40061 Minerbio (Bologna)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlocked;
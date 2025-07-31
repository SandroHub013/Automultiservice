import React from 'react';

const GoogleMap = () => {
  const address = 'Via del Lavoro, 12, 40061 Minerbio BO, Italy';
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz-z0mUFE&q=${encodeURIComponent(address)}`;

  const handleDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="google-map-section">
      <div className="map-container">
        <div className="map-header">
          <h3>La Nostra Sede</h3>
          <p>Via del Lavoro, 12 - 40061 Minerbio (Bologna)</p>
        </div>
        
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.123456789!2d11.485!3d44.635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDM4JzA2LjAiTiAxMcKwMjknMDYuMCJF!5e0!3m2!1sit!2sit!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AutoMultiService Sede"
          ></iframe>
        </div>
        
        <div className="map-actions">
          <button className="btn btn-primary" onClick={handleDirections}>
            Ottieni Indicazioni
          </button>
          <div className="map-info">
            <div className="info-item">
              <strong>Indirizzo:</strong>
              <span>Via del Lavoro, 12</span>
            </div>
            <div className="info-item">
              <strong>Città:</strong>
              <span>40061 Minerbio (BO)</span>
            </div>
            <div className="info-item">
              <strong>Parcheggio:</strong>
              <span>Disponibile in sede</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
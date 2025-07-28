import React, { useState, useEffect } from 'react';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    // Detect iOS devices
    const detectIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isIOSDevice);
    };

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after user has interacted with the site
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true);
        }
      }, 30000); // Show after 30 seconds of usage
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Track installation
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'PWA Installation'
        });
      }
    };

    checkIfInstalled();
    detectIOS();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      }
      return;
    }

    try {
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      
      // Track user choice
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'pwa_install_prompt', {
          event_category: 'engagement',
          event_label: result.outcome
        });
      }

      if (result.outcome === 'accepted') {
        setIsInstalled(true);
        setShowInstallPrompt(false);
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
    
    // Track dismissal
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'pwa_install_dismiss', {
        event_category: 'engagement',
        event_label: 'Install prompt dismissed'
      });
    }
  };

  const handleIOSInstructionsClose = () => {
    setShowIOSInstructions(false);
  };

  // Don't show if already installed or dismissed
  if (isInstalled || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <>
      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="pwa-install-prompt">
          <div className="pwa-prompt-content">
            <div className="pwa-prompt-icon">
              📱
            </div>
            <div className="pwa-prompt-text">
              <h3>Installa AutoMultiService</h3>
              <p>Aggiungi la nostra app alla schermata home per un accesso rapido ai nostri servizi automobilistici.</p>
            </div>
            <div className="pwa-prompt-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleInstallClick}
              >
                Installa App
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleDismiss}
              >
                Non ora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Instructions Modal */}
      {showIOSInstructions && (
        <div className="pwa-ios-modal-backdrop" onClick={handleIOSInstructionsClose}>
          <div className="pwa-ios-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-ios-header">
              <h3>Installa su iPhone/iPad</h3>
              <button 
                className="pwa-ios-close"
                onClick={handleIOSInstructionsClose}
              >
                ×
              </button>
            </div>
            <div className="pwa-ios-content">
              <div className="pwa-ios-step">
                <div className="pwa-ios-step-icon">1</div>
                <div className="pwa-ios-step-text">
                  Tocca il pulsante <strong>Condividi</strong> <span className="ios-share-icon">⎋</span> in basso
                </div>
              </div>
              <div className="pwa-ios-step">
                <div className="pwa-ios-step-icon">2</div>
                <div className="pwa-ios-step-text">
                  Seleziona <strong>"Aggiungi alla schermata Home"</strong> <span className="ios-add-icon">⊞</span>
                </div>
              </div>
              <div className="pwa-ios-step">
                <div className="pwa-ios-step-icon">3</div>
                <div className="pwa-ios-step-text">
                  Tocca <strong>"Aggiungi"</strong> per completare l'installazione
                </div>
              </div>
            </div>
            <div className="pwa-ios-footer">
              <button 
                className="btn btn-primary btn-full"
                onClick={handleIOSInstructionsClose}
              >
                Ho capito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Install Button (for devices that support it) */}
      {deferredPrompt && !showInstallPrompt && (
        <button
          className="pwa-install-fab"
          onClick={handleInstallClick}
          aria-label="Installa AutoMultiService App"
          title="Installa l'app per un accesso rapido"
        >
          <span className="pwa-fab-icon">📱</span>
          <span className="pwa-fab-text">Installa App</span>
        </button>
      )}
    </>
  );
};

export default PWAInstaller;
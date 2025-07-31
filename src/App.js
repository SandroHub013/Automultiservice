import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import MobileWhatsAppButton from './components/MobileWhatsAppButton';
import PWAInstaller from './components/PWAInstaller';
import TurboWrapper from './components/TurboWrapper';
import FeatureBlocked from './components/FeatureBlocked';
import { FEATURE_FLAGS } from './config/features';
import './styles/mobile-core.css';
import './styles/mobile-navigation.css';
import './styles/mobile-whatsapp.css';
import './styles/mobile-components.css';
import './styles/mobile-pwa.css';
import './styles/mobile-performance.css';
import './styles/App.css';
import './styles/Locations.css';
import './styles/Classics.css';

// Lazy loading delle pagine per performance migliori
const Home = lazy(() => import('./pages/Home'));
const AMSClassicsPage = lazy(() => import('./pages/AMSClassicsPage'));

function App() {
  useEffect(() => {
    // Mobile viewport height fix for iOS Safari
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Register Service Worker for PWA functionality
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully:', registration);
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, show update notification
                  if (window.confirm('Una nuova versione dell\'app è disponibile. Vuoi aggiornarla?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    // Preload critical mobile fonts
    const preloadFont = (fontFamily, fontWeight = '400') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.googleapis.com/css2?family=Inter:wght@${fontWeight}&display=swap`;
      document.head.appendChild(link);
    };

    // Initialize mobile optimizations
    const initializeMobileOptimizations = () => {
      // Prevent zoom on input focus (iOS)
      document.addEventListener('touchstart', () => {
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
          metaViewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          );
        }
      }, { passive: true });

      // Add mobile CSS classes
      document.body.classList.add('mobile-optimized');
      
      // Detect touch capability
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
      }
    };

    registerServiceWorker();
    preloadFont('Inter', '400');
    preloadFont('Inter', '600');
    preloadFont('Inter', '700');
    initializeMobileOptimizations();

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <Router>
      <TurboWrapper>
        <div className="App">
          <Navigation />
          
          <Suspense fallback={
            <div className="mobile-container" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              gap: 'var(--mobile-space-4)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #dc3545',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <div style={{
                fontSize: 'var(--mobile-text-lg)',
                color: '#dc3545',
                fontWeight: '600'
              }}>
                Caricamento...
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/ams-classics" 
                element={
                  FEATURE_FLAGS.AMS_CLASSICS_ENABLED ? (
                    <AMSClassicsPage />
                  ) : (
                    <FeatureBlocked 
                      title="AMS Classics - In Manutenzione" 
                      message={FEATURE_FLAGS.AMS_CLASSICS_DISABLED_MESSAGE}
                    />
                  )
                } 
              />
            </Routes>
          </Suspense>
          
          {/* Enhanced Mobile WhatsApp Button */}
          <MobileWhatsAppButton />
          
          {/* PWA Installer */}
          <PWAInstaller />
          
          {/* Floating Background Elements - Desktop Only */}
          <div className="floating-elements desktop-only">
            <div className="floating-element gear-1"></div>
            <div className="floating-element gear-2"></div>
            <div className="floating-element gear-3"></div>
          </div>
          
          {/* Vercel Analytics */}
          <Analytics />
        </div>
      </TurboWrapper>
    </Router>
  );
}

export default App;
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useTurboNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Preload delle pagine al hover sui link
    const preloadPage = (href) => {
      if (href && !href.startsWith('http') && !href.includes('#')) {
        // Precarica la route usando React Router
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Preload delle immagini critiche
    const preloadImages = () => {
      const criticalImages = [
        '/immagineintestazione.jpg',
        '/IMG_1685.mp4'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = src.endsWith('.mp4') ? 'video' : 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Gestione dei link per navigazione veloce
    const handleLinkHover = (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.target) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          preloadPage(url.pathname);
        }
      }
    };

    // Gestione click per navigazione instantanea
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.target && !e.ctrlKey && !e.metaKey) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin && url.pathname !== location.pathname) {
          e.preventDefault();
          
          // Aggiunge una classe di transizione veloce
          document.body.classList.add('turbo-loading');
          
          // Navigazione immediata
          navigate(url.pathname);
          
          // Rimuove la classe dopo la navigazione
          setTimeout(() => {
            document.body.classList.remove('turbo-loading');
          }, 150);
        }
      }
    };

    // Inizializza preloading
    preloadImages();

    // Aggiungi event listeners
    document.addEventListener('mouseover', handleLinkHover);
    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [navigate, location.pathname]);

  // Progress bar per il caricamento
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .turbo-loading {
        position: relative;
      }
      
      .turbo-loading::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #dc3545, transparent);
        background-size: 200% 100%;
        animation: turbo-progress 0.3s ease-out;
        z-index: 10000;
      }
      
      @keyframes turbo-progress {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      /* Smooth page transitions */
      .turbo-loading * {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);
};

export default useTurboNavigation;
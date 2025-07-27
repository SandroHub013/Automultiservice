import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const VideoSplash = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay compliance
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const splashRef = useRef(null);

  // Utility function to detect if device is desktop
  const isDesktop = () => {
    return window.innerWidth >= 1024 && !(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  };

  // Fullscreen API utilities
  const enterFullscreen = async (element) => {
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      }
      setIsFullscreen(true);
    } catch (error) {
      console.log('Fullscreen request failed:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      }
      setIsFullscreen(false);
    } catch (error) {
      console.log('Exit fullscreen failed:', error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const splash = splashRef.current;
    if (!video || !splash) return;

    // Debug video loading
    video.addEventListener('loadstart', () => console.log('Video loading started'));
    video.addEventListener('canplay', () => console.log('Video can play'));
    video.addEventListener('error', (e) => console.error('Video error:', e));
    video.addEventListener('loadeddata', () => console.log('Video data loaded'));

    // Auto fullscreen for desktop
    const handleVideoStart = async () => {
      if (isDesktop()) {
        console.log('Desktop detected - entering fullscreen');
        await enterFullscreen(splash);
        
        // Enable audio after entering fullscreen (user gesture requirement satisfied)
        setTimeout(() => {
          if (video && isMuted) {
            video.muted = false;
            setIsMuted(false);
            console.log('Audio enabled after fullscreen');
          }
        }, 500);
      }
    };

    // Auto play video
    video.play().then(() => {
      // Video started playing successfully
      handleVideoStart();
    }).catch(e => {
      console.log('Video autoplay failed:', e);
      // If autoplay fails, show video with play button
    });

    // Set timer for 5 seconds
    const timer = setTimeout(() => {
      handleSplashEnd();
    }, 5000);

    // Also listen for video end
    const handleVideoEnd = () => {
      handleSplashEnd();
    };

    // Handle fullscreen change events
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
      
      // If user exits fullscreen manually, end splash
      if (!isCurrentlyFullscreen && isPlaying) {
        handleSplashEnd();
      }
    };

    // Handle ESC key to exit fullscreen and end splash
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleSplashEnd();
      }
    };

    video.addEventListener('ended', handleVideoEnd);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', handleVideoEnd);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, isPlaying]);

  const handleSplashEnd = async () => {
    // Exit fullscreen before ending splash
    if (isFullscreen) {
      await exitFullscreen();
    }
    
    setIsPlaying(false);
    
    // Animate out
    anime({
      targets: splashRef.current,
      opacity: [1, 0],
      scale: [1, 1.1],
      duration: 800,
      easing: 'easeInExpo',
      complete: () => {
        onComplete();
      }
    });
  };

  const handleSkip = () => {
    handleSplashEnd();
  };

  const toggleAudio = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  if (!isPlaying) return null;

  return (
    <div className="video-splash" ref={splashRef}>
      <video
        ref={videoRef}
        className="splash-video"
        muted={isMuted}
        playsInline
        preload="auto"
        autoPlay
      >
        <source src="/IMG_1685.mp4" type="video/mp4" />
        <source src="/IMG_1685.MOV" type="video/quicktime" />
        Il tuo browser non supporta il video.
      </video>
      
      {/* Skip button - visible in fullscreen and always on mobile */}
      {(isFullscreen || !isDesktop()) && (
        <button 
          className="fullscreen-skip"
          onClick={handleSkip}
          title="Salta intro (ESC)"
        >
          Salta intro
        </button>
      )}
      
      {/* Audio toggle - visible in fullscreen and always on mobile */}
      {(isFullscreen || !isDesktop()) && (
        <button 
          className="fullscreen-audio-toggle"
          onClick={toggleAudio}
          title={isMuted ? "Attiva audio" : "Disattiva audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}
    </div>
  );
};

export default VideoSplash;
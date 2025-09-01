import { useState, useEffect } from 'react';

export const useExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const MAX_SHOWS = 3;

  useEffect(() => {
    if (showCount >= MAX_SHOWS) return; // Maximum 3 fois

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0 && !showPopup && showCount < MAX_SHOWS) {
        setShowPopup(true);
        setShowCount(prev => prev + 1);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showCount < MAX_SHOWS) {
        setShowPopup(true);
        setShowCount(prev => prev + 1);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && showCount < MAX_SHOWS) {
        setShowPopup(true);
        setShowCount(prev => prev + 1);
      }
    };

    // Mouse leave detection
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Page unload detection
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Tab visibility change detection
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showPopup, showCount]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    showPopup,
    closePopup,
    showCount,
    maxShows: MAX_SHOWS
  };
};

import { useState, useEffect } from 'react';

export const useExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  // Récupérer le compteur depuis localStorage ou initialiser à 0
  const getShowCount = (): number => {
    try {
      const stored = localStorage.getItem('exitIntentShowCount');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  };

  // Sauvegarder le compteur dans localStorage
  const saveShowCount = (count: number): void => {
    try {
      localStorage.setItem('exitIntentShowCount', count.toString());
    } catch {
      // Ignorer les erreurs localStorage
    }
  };

  const [showCount, setShowCount] = useState(getShowCount);
  const MAX_SHOWS = 2; // Changé de 3 à 2

  useEffect(() => {
    if (showCount >= MAX_SHOWS) return; // Maximum 3 fois

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0 && !showPopup && showCount < MAX_SHOWS) {
        const newCount = showCount + 1;
        setShowCount(newCount);
        saveShowCount(newCount);
        setShowPopup(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showCount < MAX_SHOWS) {
        const newCount = showCount + 1;
        setShowCount(newCount);
        saveShowCount(newCount);
        setShowPopup(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && showCount < MAX_SHOWS) {
        const newCount = showCount + 1;
        setShowCount(newCount);
        saveShowCount(newCount);
        setShowPopup(true);
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

  // Fonction pour réinitialiser le compteur (optionnel, pour les tests)
  const resetShowCount = () => {
    setShowCount(0);
    saveShowCount(0);
  };

  return {
    showPopup,
    closePopup,
    showCount,
    maxShows: MAX_SHOWS,
    resetShowCount
  };
};

import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (duration: number) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Update the timer if the duration prop changes (e.g., user selects a new goal)
  useEffect(() => {
    setTimeRemaining(duration);
    if (isRunning) {
        // If the timer is running and a new duration is set, we stop the old timer.
        // The user will have to press start again. This prevents unexpected behavior.
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
    }
  }, [duration]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const startTimer = useCallback(() => {
    if (isRunning || timeRemaining <= 0) return;

    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isRunning, timeRemaining, stopTimer]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeRemaining(duration);
  }, [stopTimer, duration]);
  
  // Cleanup effect for when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
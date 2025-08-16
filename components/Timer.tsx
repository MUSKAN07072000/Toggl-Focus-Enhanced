import React from 'react';
import { Icon } from './Icon';

interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  goalMinutes: number;
  demoHighlightId?: string | null;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, isRunning, onStart, onStop, onReset, goalMinutes, demoHighlightId }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = ((goalMinutes * 60 - timeRemaining) / (goalMinutes * 60)) * 100;

  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-toggl-gray"
            stroke="currentColor"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
          />
          <circle
            className="text-toggl-pink"
            stroke="currentColor"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeDasharray="289.027"
            strokeDashoffset={289.027 * (1 - progress / 100)}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="text-white text-6xl font-bold tracking-tighter">
          <span>{String(minutes).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-8">
        <button 
          id="timer-reset-button"
          onClick={onReset} 
          className={`p-3 text-toggl-light-gray hover:text-white rounded-full transition-all duration-300 ${demoHighlightId === 'timer-reset-button' ? 'demo-highlight' : ''}`} 
          title="Reset Timer">
          <Icon name="reset" className="w-6 h-6" />
        </button>
        {isRunning ? (
          <button
            id="timer-start-button"
            onClick={onStop}
            className={`w-20 h-20 bg-toggl-pink text-toggl-bg rounded-full flex items-center justify-center text-xl font-bold shadow-lg transform hover:scale-105 transition-transform transition-all duration-300 ${demoHighlightId === 'timer-start-button' ? 'demo-highlight' : ''}`}
          >
            STOP
          </button>
        ) : (
          <button
            id="timer-start-button"
            onClick={onStart}
            className={`w-20 h-20 bg-toggl-pink text-toggl-bg rounded-full flex items-center justify-center text-xl font-bold shadow-lg transform hover:scale-105 transition-transform transition-all duration-300 ${demoHighlightId === 'timer-start-button' ? 'demo-highlight' : ''}`}
          >
            START
          </button>
        )}
         <div className="w-9 h-9"></div>
      </div>
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { Soundscape } from '../types';
import { Icon } from './Icon';

interface SoundscapesProps {
  soundscapes: Soundscape[];
  currentSound: Soundscape | null;
  onSoundChange: (sound: Soundscape | null) => void;
  isDisabled: boolean;
  demoHighlightId?: string | null;
}

export const Soundscapes: React.FC<SoundscapesProps> = ({ soundscapes, currentSound, onSoundChange, isDisabled, demoHighlightId }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (currentSound) {
        audioRef.current.src = currentSound.soundUrl;
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
  }, [currentSound]);

  const handleSelectSound = (sound: Soundscape) => {
    if (currentSound?.id === sound.id) {
      onSoundChange(null); // Toggle off
    } else {
      onSoundChange(sound);
    }
  };

  return (
    <div 
      id="onboarding-sound" 
      className={`mt-6 pt-6 border-t border-toggl-gray transition-opacity rounded-xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} transition-all duration-300 ${demoHighlightId === 'onboarding-sound' ? 'demo-highlight' : ''}`}
    >
      <h4 className="text-center font-medium mb-4">Soundscapes</h4>
      <div className="flex justify-center space-x-4">
        {soundscapes.map(sound => (
          <button
            key={sound.id}
            onClick={() => handleSelectSound(sound)}
            className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-all duration-200 border-2 ${
              currentSound?.id === sound.id 
              ? 'bg-toggl-pink border-toggl-pink text-toggl-dark' 
              : 'bg-toggl-gray border-transparent hover:border-toggl-light-gray'
            }`}
            disabled={isDisabled}
            title={sound.name}
          >
            <Icon name={sound.icon as any} className="w-8 h-8 mb-1" />
            <span className="text-xs">{sound.name}</span>
          </button>
        ))}
      </div>
      <audio ref={audioRef} />
    </div>
  );
};
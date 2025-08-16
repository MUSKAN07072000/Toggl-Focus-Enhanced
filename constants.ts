
import { Project, Tag, SessionGoal, Soundscape } from './types';

export const PROJECTS: Project[] = [
  { id: 1, name: 'Toggl Focus Redesign', color: 'bg-toggl-pink' },
  { id: 2, name: 'Mobile App Sync', color: 'bg-blue-500' },
  { id: 3, name: 'API Integration', color: 'bg-green-500' },
  { id: 4, name: 'Marketing Campaign', color: 'bg-yellow-500' },
];

export const TAGS: Tag[] = [
  { id: 1, name: 'design' },
  { id: 2, name: 'development' },
  { id: 3, name: 'meeting' },
  { id: 4, name: 'research' },
  { id: 5, name: 'prototyping' },
];

export const GOALS: SessionGoal[] = [
  { id: 1, label: 'Pomodoro (25 min)', minutes: 25 },
  { id: 2, label: 'Short Break (5 min)', minutes: 5 },
  { id: 3, label: 'Deep Work (50 min)', minutes: 50 },
  { id: 4, label: 'Long Break (15 min)', minutes: 15 },
];

// Placeholder URLs. In a real app, these would point to actual audio files.
export const SOUNDSCAPES: Soundscape[] = [
    { id: 1, name: 'Rain', soundUrl: '/sounds/rain.mp3', icon: 'rain' },
    { id: 2, name: 'Cafe', soundUrl: '/sounds/cafe.mp3', icon: 'cafe' },
    { id: 3, name: 'Forest', soundUrl: '/sounds/forest.mp3', icon: 'forest' },
    { id: 4, name: 'Ocean', soundUrl: '/sounds/ocean.mp3', icon: 'ocean' },
];

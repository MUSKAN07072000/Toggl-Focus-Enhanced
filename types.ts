
export interface Project {
  id: number;
  name: string;
  color: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface SessionGoal {
  id: number;
  label: string;
  minutes: number;
}

export interface Soundscape {
  id: number;
  name: string;
  soundUrl: string; // In a real app, this would be a URL to an audio file
  icon: string;
}

export interface FeedbackAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  category: 'Bug Report' | 'Feature Request' | 'UI/UX' | 'Praise' | 'Other';
  summary: string;
}

import React, { useState, useCallback } from 'react';
import { Timer } from './components/Timer';
import { Settings } from './components/Settings';
import { Onboarding } from './components/Onboarding';
import { FeedbackModal } from './components/FeedbackModal';
import { Soundscapes } from './components/Soundscapes';
import { Icon } from './components/Icon';
import { useTimer } from './hooks/useTimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Project, Tag, SessionGoal, Soundscape } from './types';
import { PROJECTS, TAGS, GOALS, SOUNDSCAPES } from './constants';

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useLocalStorage('showOnboarding', true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const [currentProject, setCurrentProject] = useState<Project | null>(PROJECTS[0]);
  const [currentTags, setCurrentTags] = useState<Tag[]>([TAGS[0]]);
  const [currentGoal, setCurrentGoal] = useState<SessionGoal>(GOALS[0]);
  const [currentSound, setCurrentSound] = useState<Soundscape | null>(null);

  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoHighlightId, setDemoHighlightId] = useState<string | null>(null);

  const {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer(currentGoal.minutes * 60);

  const handleStart = useCallback(() => {
    if (timeRemaining > 0) {
      startTimer();
    }
  }, [timeRemaining, startTimer]);

  const handleStop = useCallback(() => {
    stopTimer();
  }, [stopTimer]);
  
  const handleReset = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  const onOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const startDemo = useCallback(async () => {
    if (isRunning || isDemoRunning) return;

    setIsDemoRunning(true);
    setDemoHighlightId(null);
    handleReset();

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

    setCurrentProject(PROJECTS[0]);
    setCurrentTags([TAGS[0]]);
    setCurrentGoal(GOALS[0]);
    setCurrentSound(null);
    await wait(1000);

    setDemoHighlightId('onboarding-project');
    await wait(1500);
    setCurrentProject(PROJECTS[1]);
    await wait(1500);

    setDemoHighlightId('onboarding-tags');
    await wait(1500);
    setCurrentTags([TAGS[1], TAGS[4]]);
    await wait(1500);

    setDemoHighlightId('onboarding-goal');
    await wait(1500);
    setCurrentGoal(GOALS[2]);
    await wait(1500);

    setDemoHighlightId('onboarding-sound');
    await wait(1500);
    setCurrentSound(SOUNDSCAPES[2]);
    await wait(1500);

    setDemoHighlightId('timer-start-button');
    await wait(1000);
    handleStart();
    await wait(5000);

    setDemoHighlightId('timer-start-button');
    await wait(1000);
    handleStop();
    await wait(1000);
    
    setDemoHighlightId('timer-reset-button');
    await wait(1000);
    handleReset();
    await wait(1000);

    setDemoHighlightId(null);
    setIsDemoRunning(false);
  }, [isRunning, isDemoRunning, handleReset, handleStart, handleStop]);

  return (
    <div className="bg-toggl-bg min-h-screen text-toggl-light-gray flex flex-col items-center justify-center p-4 transition-colors duration-500">
      
      {showOnboarding && <Onboarding onComplete={onOnboardingComplete} />}

      <div className="w-full max-w-2xl mx-auto z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="8" fill="#E57CD8"/><path d="M24 38c7.732 0 14-6.268 14-14S31.732 10 24 10 10 16.268 10 24s6.268 14 14 14z" stroke="#1B1527" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 18v6h6" stroke="#1B1527" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h1 className="text-2xl font-bold text-white">Toggl Focus</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={startDemo} disabled={isRunning || isDemoRunning} className="flex items-center space-x-2 px-4 py-2 bg-toggl-gray hover:bg-opacity-80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Icon name="brain" className="w-5 h-5" />
                <span>{isDemoRunning ? 'Demo Running...' : 'Start Demo'}</span>
            </button>
            <button onClick={() => setShowFeedbackModal(true)} disabled={isDemoRunning} className="flex items-center space-x-2 px-4 py-2 bg-toggl-gray hover:bg-opacity-80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Icon name="feedback" className="w-5 h-5" />
              <span>Feedback</span>
            </button>
          </div>
        </header>

        <main className="bg-toggl-card p-8 rounded-2xl shadow-2xl border border-toggl-gray">
          <Settings 
            projects={PROJECTS}
            tags={TAGS}
            goals={GOALS}
            currentProject={currentProject}
            currentTags={currentTags}
            currentGoal={currentGoal}
            onProjectChange={setCurrentProject}
            onTagsChange={setCurrentTags}
            onGoalChange={setCurrentGoal}
            isDisabled={isRunning || isDemoRunning}
            demoHighlightId={demoHighlightId}
          />
          <Timer
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            goalMinutes={currentGoal.minutes}
            demoHighlightId={demoHighlightId}
          />
          <Soundscapes 
            soundscapes={SOUNDSCAPES}
            currentSound={currentSound}
            onSoundChange={setCurrentSound}
            isDisabled={isRunning || isDemoRunning}
            demoHighlightId={demoHighlightId}
          />
        </main>
      </div>

      <footer className="absolute bottom-4 text-sm text-toggl-gray">
        Built with React, TypeScript, and Gemini. A prototype for enhancing user experience.
      </footer>
      
      {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} />}
    </div>
  );
};

export default App;
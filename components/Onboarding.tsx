import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: 'Welcome to Toggl Focus Enhanced!',
    text: 'Let\'s quickly walk through the new features designed to boost your productivity.',
    targetId: null,
  },
  {
    title: 'Assign Projects',
    text: 'Easily assign your focus session to a project to keep your time organized.',
    targetId: 'onboarding-project',
  },
  {
    title: 'Add Tags',
    text: 'Add tags to categorize your work. Just start typing to find or add new ones.',
    targetId: 'onboarding-tags',
  },
  {
    title: 'Set Session Goals',
    text: 'Choose a predefined session length like a Pomodoro or a Deep Work session.',
    targetId: 'onboarding-goal',
  },
  {
    title: 'Choose Your Soundscape',
    text: 'Select an ambient sound to help you stay focused and block out distractions.',
    targetId: 'onboarding-sound',
  },
  {
    title: 'You\'re All Set!',
    text: 'You\'re ready to start your first focused session. Happy tracking!',
    targetId: null,
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const getTooltipPosition = () => {
    if (!currentStep.targetId) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' as const };
    }
    const element = document.getElementById(currentStep.targetId);
    if (!element) return {};
    const rect = element.getBoundingClientRect();
    return {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left}px`,
      position: 'absolute' as const,
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50">
      <div
        className="bg-toggl-card p-6 rounded-lg shadow-xl text-center max-w-sm transition-all duration-300"
        style={getTooltipPosition()}
      >
        <h3 className="text-xl font-bold text-white mb-2">{currentStep.title}</h3>
        <p className="text-toggl-light-gray mb-4">{currentStep.text}</p>
        <button
          onClick={nextStep}
          className="bg-toggl-pink text-toggl-dark font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          {step === steps.length - 1 ? 'Start Focusing' : 'Next'}
        </button>

        {step < steps.length - 1 && (
          <button
            onClick={onComplete}
            className="mt-3 text-sm text-toggl-light-gray hover:text-white transition-colors"
          >
            Skip Tour
          </button>
        )}

        {currentStep.targetId && (
             <div 
               className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-toggl-card"
               style={{ top: '-8px', left: '20px' }}
            ></div>
        )}
      </div>
    </div>
  );
};

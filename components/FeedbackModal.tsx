
import React, { useState, useCallback } from 'react';
import { analyzeFeedback } from '../services/geminiService';
import { FeedbackAnalysis } from '../types';
import { Icon } from './Icon';

interface FeedbackModalProps {
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!feedback.trim()) return;
    setStatus('loading');
    setError(null);
    try {
      const result = await analyzeFeedback(feedback);
      setAnalysis(result);
      setStatus('success');
    } catch (err) {
      setError('Sorry, we couldn\'t analyze your feedback right now. It has been submitted.');
      setStatus('error');
      console.error('Gemini API error:', err);
    }
  }, [feedback]);
  
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-48">
            <Icon name="loader" className="w-12 h-12 animate-spin text-toggl-pink" />
            <p className="mt-4">Analyzing your feedback...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
             <Icon name="success" className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
            <p className="mb-4">Your feedback has been received and categorized.</p>
            {analysis && (
              <div className="bg-toggl-dark text-left p-4 rounded-lg">
                  <p><strong>Summary:</strong> {analysis.summary}</p>
                  <p><strong>Sentiment:</strong> <span className="capitalize">{analysis.sentiment}</span></p>
                  <p><strong>Category:</strong> {analysis.category}</p>
              </div>
            )}
             <button onClick={onClose} className="mt-6 w-full bg-toggl-pink text-toggl-dark font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
              Close
            </button>
          </div>
        );
        case 'error':
            return (
                <div className="text-center">
                    <Icon name="error" className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Submission Received</h3>
                    <p>{error}</p>
                    <button onClick={onClose} className="mt-6 w-full bg-toggl-gray text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                      Close
                    </button>
                </div>
            )
      case 'idle':
      default:
        return (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Feedback</h2>
            <p className="mb-4">
              Help us improve Toggl Focus. What's working? What's not? All feedback is welcome.
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 bg-toggl-gray p-3 rounded-lg focus:ring-2 focus:ring-toggl-pink focus:outline-none"
              placeholder="I would love a feature that..."
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={onClose} className="px-4 py-2 bg-toggl-gray rounded-lg hover:bg-opacity-80 transition-opacity">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!feedback.trim()}
                className="px-4 py-2 bg-toggl-pink text-toggl-dark font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-toggl-card rounded-2xl p-8 shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-toggl-light-gray hover:text-white">
          <Icon name="close" className="w-6 h-6" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

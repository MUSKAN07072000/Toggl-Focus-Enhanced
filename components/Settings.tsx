import React, { useState, useRef, useEffect } from 'react';
import { Project, Tag, SessionGoal } from '../types';
import { Icon } from './Icon';

interface SettingsProps {
  projects: Project[];
  tags: Tag[];
  goals: SessionGoal[];
  currentProject: Project | null;
  currentTags: Tag[];
  currentGoal: SessionGoal;
  onProjectChange: (project: Project | null) => void;
  onTagsChange: (tags: Tag[]) => void;
  onGoalChange: (goal: SessionGoal) => void;
  isDisabled: boolean;
  demoHighlightId?: string | null;
}

export const Settings: React.FC<SettingsProps> = ({
  projects,
  tags,
  goals,
  currentProject,
  currentTags,
  currentGoal,
  onProjectChange,
  onTagsChange,
  onGoalChange,
  isDisabled,
  demoHighlightId,
}) => {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveTag = (tagToRemove: Tag) => {
    onTagsChange(currentTags.filter(tag => tag.id !== tagToRemove.id));
  };
  
  const handleAddTag = (tagToAdd: Tag) => {
    if (!currentTags.some(t => t.id === tagToAdd.id)) {
      onTagsChange([...currentTags, tagToAdd]);
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };
  
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(tagInput.toLowerCase()) && 
    !currentTags.some(ct => ct.id === tag.id)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagInputRef.current && !tagInputRef.current.contains(event.target as Node)) {
        setShowTagSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`transition-opacity ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Selector */}
        <div id="onboarding-project" className={`relative transition-all duration-300 rounded-xl ${demoHighlightId === 'onboarding-project' ? 'demo-highlight' : ''}`}>
          <label className="block text-sm font-medium mb-1">Project</label>
          <select
            value={currentProject?.id || ''}
            onChange={(e) => onProjectChange(projects.find(p => p.id === parseInt(e.target.value)) || null)}
            className="w-full bg-toggl-gray border border-transparent focus:ring-2 focus:ring-toggl-pink focus:border-toggl-pink rounded-md p-2 text-white"
            disabled={isDisabled}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Tag Selector */}
        <div ref={tagInputRef} id="onboarding-tags" className={`relative transition-all duration-300 rounded-xl ${demoHighlightId === 'onboarding-tags' ? 'demo-highlight' : ''}`}>
           <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap items-center gap-2 p-2 bg-toggl-gray rounded-md">
            {currentTags.map(tag => (
              <span key={tag.id} className="flex items-center bg-toggl-dark text-sm px-2 py-1 rounded">
                {tag.name}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-toggl-light-gray hover:text-white" disabled={isDisabled}>&times;</button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onFocus={() => setShowTagSuggestions(true)}
              placeholder="Add tags..."
              className="bg-transparent focus:outline-none flex-grow"
              disabled={isDisabled}
            />
          </div>
           {showTagSuggestions && filteredTags.length > 0 && (
            <ul className="absolute z-20 w-full mt-1 bg-toggl-dark rounded-md shadow-lg max-h-40 overflow-auto">
              {filteredTags.map(tag => (
                <li key={tag.id} onClick={() => handleAddTag(tag)} className="p-2 hover:bg-toggl-gray cursor-pointer">
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Goal Selector */}
      <div id="onboarding-goal" className={`mt-4 transition-all duration-300 rounded-xl ${demoHighlightId === 'onboarding-goal' ? 'demo-highlight' : ''}`}>
        <label className="block text-sm font-medium mb-2">Session Goal</label>
        <div className="flex space-x-2">
          {goals.map(goal => (
            <button
              key={goal.id}
              onClick={() => onGoalChange(goal)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                currentGoal.id === goal.id
                  ? 'bg-toggl-pink text-toggl-dark font-semibold'
                  : 'bg-toggl-gray hover:bg-opacity-80'
              }`}
              disabled={isDisabled}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
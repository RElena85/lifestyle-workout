import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Exercise {
  title: string;
  steps?: string[];
  sets?: string;
  notes?: string[];
}

interface Section {
  title: string;
  exercises: Record<string, Exercise>;
}

interface WorkoutDayProps {
  dayKey: string;
}

export const WorkoutDay: React.FC<WorkoutDayProps> = ({ dayKey }) => {
  const { t } = useTranslation();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Get all exercises for the current day
  const sections = t(`workout.days.${dayKey}.sections`, { returnObjects: true }) as Record<string, Section>;
  const totalExercises = Object.values(sections).reduce(
    (total, section) => total + Object.keys(section.exercises).length,
    0
  );

  // Check if previous day is completed
  useEffect(() => {
    const previousDay = `day${parseInt(dayKey.replace('day', '')) - 1}`;
    
    // If this is day1 or localStorage shows previous day is complete, unlock this day
    if (dayKey === 'day1' || localStorage.getItem(`${previousDay}_completed`) === 'true') {
      setIsLocked(false);
      // If this is day1 and it's not started yet, auto-open it
      if (dayKey === 'day1' && !localStorage.getItem(`${dayKey}_started`)) {
        setIsOpen(true);
        localStorage.setItem(`${dayKey}_started`, 'true');
      }
    }
  }, [dayKey]);

  // Save completion status
  useEffect(() => {
    if (completedExercises.size === totalExercises) {
      localStorage.setItem(`${dayKey}_completed`, 'true');
    }
  }, [completedExercises, dayKey, totalExercises]);

  const handleExerciseToggle = (sectionKey: string, exerciseKey: string) => {
    const exerciseId = `${sectionKey}_${exerciseKey}`;
    const newCompletedExercises = new Set(completedExercises);

    if (newCompletedExercises.has(exerciseId)) {
      newCompletedExercises.delete(exerciseId);
    } else {
      newCompletedExercises.add(exerciseId);
    }

    setCompletedExercises(newCompletedExercises);
    localStorage.setItem(`${dayKey}_exercises`, JSON.stringify([...newCompletedExercises]));
  };

  // Load saved progress
  useEffect(() => {
    const savedExercises = localStorage.getItem(`${dayKey}_exercises`);
    if (savedExercises) {
      setCompletedExercises(new Set(JSON.parse(savedExercises)));
    }
  }, [dayKey]);

  const progress = Math.round((completedExercises.size / totalExercises) * 100);

  return (
    <details 
      className={`group bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-purple-500/20'}`}
      open={isOpen}
      onToggle={(e) => {
        if (isLocked) {
          e.preventDefault();
          return false;
        }
        setIsOpen((e.target as HTMLDetailsElement).open);
      }}
    >
      <summary 
        className={`cursor-pointer p-6 [&::-webkit-details-marker]:hidden 
          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white group-open:text-purple-400 transition-colors">
              {t(`workout.days.${dayKey}.title`)}
            </h2>
            {isLocked && (
              <span className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-400 text-sm">
              {progress}% {t('workout.completed')}
            </div>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </summary>

      <div className="p-6 pt-0">
        {Object.entries(sections).map(([sectionKey, section]) => (
          <div key={sectionKey} className="mb-8 last:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-purple-400 border-b border-purple-500/30 pb-2">
              {section.title}
            </h3>
            <div className="space-y-4">
              {Object.entries(section.exercises).map(([exerciseKey, exercise]) => (
                <div key={exerciseKey} className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={completedExercises.has(`${sectionKey}_${exerciseKey}`)}
                      onChange={() => handleExerciseToggle(sectionKey, exerciseKey)}
                      className="mt-1.5 h-4 w-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{exercise.title}</h4>
                      {exercise.sets && (
                        <p className="text-sm text-purple-400 mt-1">{exercise.sets}</p>
                      )}
                      {exercise.steps && (
                        <ul className="mt-2 space-y-1">
                          {exercise.steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-center">
                              <span className="mr-2 text-purple-400">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      )}
                      {exercise.notes && (
                        <ul className="mt-2 space-y-1">
                          {exercise.notes.map((note, index) => (
                            <li key={index} className="text-sm text-gray-400 italic flex items-center">
                              <span className="mr-2 text-purple-400">ℹ</span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
};
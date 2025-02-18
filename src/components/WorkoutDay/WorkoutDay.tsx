import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from './components/Section';
import { WorkoutDayProps } from './types';
import { workoutDayStyles } from './styles';
import {
  calculateProgress,
  getTotalExercises,
  loadSavedExercises,
  saveExercises,
  isDayLocked
} from './utils';

export const WorkoutDay: React.FC<WorkoutDayProps> = ({ dayKey }) => {
  const { t } = useTranslation();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const sections = t(`workout.days.${dayKey}.sections`, { returnObjects: true }) as Record<string, any>;
  const totalExercises = getTotalExercises(sections);

  useEffect(() => {
    const locked = isDayLocked(dayKey);
    setIsLocked(locked);
    
    if (!locked && dayKey === 'day1' && !localStorage.getItem(`${dayKey}_started`)) {
      setIsOpen(true);
      localStorage.setItem(`${dayKey}_started`, 'true');
    }
  }, [dayKey]);

  useEffect(() => {
    if (completedExercises.size === totalExercises) {
      localStorage.setItem(`${dayKey}_completed`, 'true');
    }
  }, [completedExercises, dayKey, totalExercises]);

  useEffect(() => {
    setCompletedExercises(loadSavedExercises(dayKey));
  }, [dayKey]);

  const handleExerciseToggle = (sectionKey: string, exerciseKey: string) => {
    const exerciseId = `${sectionKey}_${exerciseKey}`;
    const newCompletedExercises = new Set(completedExercises);

    if (newCompletedExercises.has(exerciseId)) {
      newCompletedExercises.delete(exerciseId);
    } else {
      newCompletedExercises.add(exerciseId);
    }

    setCompletedExercises(newCompletedExercises);
    saveExercises(dayKey, newCompletedExercises);
  };

  const progress = calculateProgress(completedExercises.size, totalExercises);

  return (
    <details 
      className={`${workoutDayStyles.container.base} ${
        isLocked ? workoutDayStyles.container.locked : workoutDayStyles.container.unlocked
      }`}
      open={isOpen}
      onToggle={(e) => {
        if (isLocked) {
          e.preventDefault();
          return false;
        }
        setIsOpen((e.target as HTMLDetailsElement).open);
      }}
    >
      <summary className={`${workoutDayStyles.summary.base} ${
        isLocked ? workoutDayStyles.summary.locked : workoutDayStyles.summary.unlocked
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className={workoutDayStyles.title}>{t(`workout.days.${dayKey}.title`)}</h2>
            {isLocked && (
              <span className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className={workoutDayStyles.progress.text}>
              {progress}% {t('workout.completed')}
            </div>
            <div className={workoutDayStyles.progress.bar.container}>
              <div 
                className={workoutDayStyles.progress.bar.fill}
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
        {Object.entries(sections).map(([sectionKey, section]) => {
            return (
                <Section
                    key={sectionKey}
                    title={section.title}
                    exercises={section.exercises}
                    completedExercises={completedExercises}
                    sectionKey={sectionKey}
                    onExerciseToggle={handleExerciseToggle} completedSubActivities={{}} onSubActivityToggle={function (_exerciseId: string, _subActivityId: string): void {
                        throw new Error('Function not implemented.');
                    } } renderExerciseContent={function (_exercise: any): JSX.Element {
                        throw new Error('Function not implemented.');
                    } } />
            );
        })}
      </div>
    </details>
  );
};
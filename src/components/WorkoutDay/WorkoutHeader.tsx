import React from 'react';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { workoutDayStyles } from './styles';
import { Button } from '../ui/button';

interface WorkoutHeaderProps {
  isOpen: boolean;
  isLocked: boolean;
  dayKey: string;
  workoutStarted: boolean;
  progress: number;
  totalExercises: number;
  completedExercises: Set<string>;
  onToggleOpen: () => void;
}

export const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  isOpen,
  isLocked,
  dayKey,
  workoutStarted,
  progress,
  totalExercises,
  completedExercises,
  onToggleOpen,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${workoutDayStyles.summary.base} ${
      isLocked ? workoutDayStyles.summary.locked : workoutDayStyles.summary.unlocked
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Button
            onClick={onToggleOpen}
            variant="default"
            size="square"
            disabled={isLocked}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
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
        </div>
      </div>
    </div>
  );
};
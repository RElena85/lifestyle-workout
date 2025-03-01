// components/WorkoutController/WorkoutController.tsx
import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { standardButtonStyles } from '../ButtonsBar/standardButtonStyles';

export const WorkoutController: React.FC = () => {
  const { t } = useTranslation();
  const [isWorkoutActive, setIsWorkoutActive] = React.useState(() => {
    return localStorage.getItem('workoutInProgress') === 'true';
  });

  const toggleWorkout = () => {
    if (isWorkoutActive) {
      // Clear all workout related data from localStorage
      localStorage.setItem('workoutInProgress', 'false');
      
      // Clear day completion status
      localStorage.removeItem('day1_started');
      localStorage.removeItem('day1_completed');
      localStorage.removeItem('day2_completed');
      localStorage.removeItem('day3_completed');
      
      // Clear exercises for each day
      localStorage.removeItem('day1_exercises');
      localStorage.removeItem('day2_exercises');
      localStorage.removeItem('day3_exercises');
      
      // Clear subactivities if they exist
      localStorage.removeItem('day1_subactivities');
      localStorage.removeItem('day2_subactivities');
      localStorage.removeItem('day3_subactivities');

      setIsWorkoutActive(false);
      window.location.reload();
    } else {
      localStorage.setItem('workoutInProgress', 'true');
      setIsWorkoutActive(true);
    }
  };

  return (
    <button
      onClick={toggleWorkout}
      aria-label={t(isWorkoutActive ? 'workout.reset' : 'workout.start')}
      className={standardButtonStyles}
    >
      {isWorkoutActive ? (
        <>
          <RotateCcw className="w-5 h-5" />
          <span>{t('workout.reset')}</span>
        </>
      ) : (
        <>
          <Play className="w-5 h-5" />
          <span>{t('workout.start')}</span>
        </>
      )}
    </button>
  );
};
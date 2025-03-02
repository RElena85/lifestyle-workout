import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { standardButtonStyles } from '../ButtonsBar/standardButtonStyles';

/**
 * WorkoutController component with responsive design adjustments.
 * This component is optimized for adaptive and responsive rendering on smartphones
 */
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
      // Reload window to reflect reset state; consider alternative SPA approaches if available.
      window.location.reload();
    } else {
      localStorage.setItem('workoutInProgress', 'true');
      setIsWorkoutActive(true);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={toggleWorkout}
        aria-label={t(isWorkoutActive ? 'workout.reset' : 'workout.start')}
        // Responsive classes added: w-full for full width on smaller screens, flex for alignment, and spacing adjustments.
        className={`${standardButtonStyles} w-full flex items-center justify-center space-x-2 py-2 px-3 text-base sm:text-lg`}
      >
        {isWorkoutActive ? (
          <>
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{t('workout.reset')}</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{t('workout.start')}</span>
          </>
        )}
      </button>
    </div>
  );
};
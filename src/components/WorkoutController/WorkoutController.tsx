import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { standardButtonStyles } from '../ButtonsBar/standardButtonStyles';
import { Button } from '../ui/button';

const getDayKeys = (t: (key: string, opts?: any) => any): string[] => {
    // Retrieve the days object from the translation files (e.g., "workout.days")
    const daysObj = t('workout.days', { returnObjects: true }) as Record<string, any>;
    // Return an array of keys like ["day1", "day2", ...]
    return Object.keys(daysObj);
};

const getWorkoutActiveStatus = (dayKeys: string[]): boolean => {
  // Check a global flag or any day status from localStorage to determine if a workout is active.
  if (localStorage.getItem('workoutInProgress') === 'true') {
    return true;
  }
  // Check if any day has been started dynamically
  return dayKeys.some((dayKey) => localStorage.getItem(`${dayKey}_started`) === 'true');
};

export const WorkoutController: React.FC = () => {
  const { t } = useTranslation();
  const dayKeys = getDayKeys(t);
  const [isWorkoutActive, setIsWorkoutActive] = React.useState<boolean>(getWorkoutActiveStatus(dayKeys));

  const toggleWorkout = () => {
    if (isWorkoutActive) {
      // Deactivate workout
      localStorage.setItem('workoutInProgress', 'false');

      // Loop through all dynamic day keys to remove their related localStorage items
      dayKeys.forEach((dayKey) => {
        localStorage.removeItem(`${dayKey}_started`);
        localStorage.removeItem(`${dayKey}_completed`);
        localStorage.removeItem(`${dayKey}_exercises`);
        localStorage.removeItem(`${dayKey}_subactivities`);
      });

      setIsWorkoutActive(false);
      // Reload page to reflect the reset state (consider SPA alternatives in the future)
      window.location.reload();
    } else {
      // Start workout
      localStorage.setItem('workoutInProgress', 'true');
      setIsWorkoutActive(true);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <Button
        onClick={toggleWorkout}
        aria-label={t(isWorkoutActive ? 'workout.reset' : 'workout.start')}
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
      </Button>
    </div>
  );
};

export default WorkoutController;
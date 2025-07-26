import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from './components/Section';
import { WorkoutHeader } from './WorkoutHeader.tsx';
import { workoutDayStyles } from './styles';
import {
  calculateProgress,
  getTotalExercises,
  loadSavedExercises,
  saveExercises,
  isDayLocked
} from './utils';

export interface WorkoutDayProps {
  dayKey: string;
  onOpenNextDay?: (dayKey: string) => void;
}

// Helper function to check if this is the first day
const isFirstDay = (dayKey: string): boolean => {
  const dayNumber = parseInt(dayKey.replace(/\D/g, ''), 10);
  return dayNumber === 1;
};

//Figure out how this class is called 2 times each
export const WorkoutDay: React.FC<WorkoutDayProps> = ({ dayKey, onOpenNextDay }) => {
  console.log(`totalExercises dayKey ${dayKey} onOpenNextDay()`);
  const { t } = useTranslation();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const sections = t(`workout.days.${dayKey}.sections`, { returnObjects: true }) as Record<string, any>;
  const totalExercises = getTotalExercises(sections);
  console.log(`totalExercises dayKey ${dayKey} totalExercises ${totalExercises}`);
  const progress = calculateProgress(completedExercises.size, totalExercises);
  console.log(`totalExercises progress ${progress} completedExercises ${completedExercises.size}`);

  useEffect(() => {
    // Recalculate the locked state on mount
    const locked = isDayLocked(dayKey);
    console.log(`Day ${dayKey} locked:`, locked);
    setIsLocked(locked);
    
    // Auto-open the first day if it's unlocked and hasn't been started yet
    if (!locked && isFirstDay(dayKey) && !localStorage.getItem(`${dayKey}_started`)) {
      setIsOpen(true);
      localStorage.setItem(`${dayKey}_started`, 'true');
    }
  }, [dayKey]);

  useEffect(() => {
    if (completedExercises.size === totalExercises && totalExercises > 0) {
      console.log(`Day ${dayKey} completed. Completed ${completedExercises.size} out of ${totalExercises}`);
      localStorage.setItem(`${dayKey}_completed`, 'true');
      setWorkoutStarted(false);
      setCurrentExercise(null);
      setIsOpen(false); // Collapse the current day 
    }
  }, [completedExercises, dayKey, totalExercises, onOpenNextDay]);

  useEffect(() => {
    setCompletedExercises(loadSavedExercises(dayKey));
  }, [dayKey]);

  const findAndSetNextExercise = (completed: Set<string>) => {
    for (const [sectionKey, section] of Object.entries(sections)) {
      for (const exerciseKey of Object.keys(section.exercises)) {
        const exerciseId = `${sectionKey}_${exerciseKey}`;
        if (!completed.has(exerciseId)) {
          setCurrentExercise(exerciseId);
          return;
        }
      }
    }
    setCurrentExercise(null);
  };

  const handleExerciseToggle = (sectionKey: string, exerciseKey: string) => {
    const exerciseId = `${sectionKey}_${exerciseKey}`;
    console.log(`exerciseID ${exerciseId}`);  
    if (workoutStarted && exerciseId !== currentExercise) return;
  
    console.log(`completedExercises ${completedExercises}`);  
    const newCompletedExercises = new Set(completedExercises);
    if (newCompletedExercises.has(exerciseId)) return;
    
    console.log(`Add the new exercise`);  
    newCompletedExercises.add(exerciseId);
    setCompletedExercises(newCompletedExercises);
    saveExercises(dayKey, newCompletedExercises);
    findAndSetNextExercise(newCompletedExercises);
  };
  
  // Function to manually toggle the open/closed state
  const toggleOpen = () => {
    console.log(`Day ${dayKey} is locked ${isLocked} is open ${isOpen}. Completed ${completedExercises.size} out of ${totalExercises}`);
    if (isLocked) return;
    console.log(`is open ${isOpen} will be !isopen ${!isOpen}.`);  
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${workoutDayStyles.container.base} ${
        isLocked ? workoutDayStyles.container.locked : workoutDayStyles.container.unlocked
      }`}>
        <WorkoutHeader
          isOpen={isOpen}
          isLocked={isLocked}
          dayKey={dayKey}
          workoutStarted={workoutStarted}
          progress={progress}
          totalExercises={totalExercises}
          completedExercises={completedExercises}
          onToggleOpen={toggleOpen}
        />

        {isOpen && (
          <div className="p-6 pt-0">
            {Object.entries(sections).map(([sectionKey, section]) => (
              <Section
                key={sectionKey}
                title={section.title}
                exercises={section.exercises}
                completedExercises={completedExercises}
                sectionKey={sectionKey}
                onExerciseToggle={handleExerciseToggle}
                currentExercise={currentExercise}
                workoutStarted={workoutStarted}
                completedSubActivities={{}}
                onSubActivityToggle={function (_exerciseId: string, _subActivityId: string): void {
                  throw new Error('Function not implemented.');
                }}
                renderExerciseContent={function (_exercise: any): JSX.Element {
                  throw new Error('Function not implemented.');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutDay;

import React from 'react';
import { SectionProps } from '../types';
import { ExerciseItem } from './ExerciseItem';
import { workoutDayStyles } from '../styles';

export const Section: React.FC<SectionProps> = ({
  title,
  exercises,
  completedExercises,
  sectionKey,
  onExerciseToggle
}) => {
  const styles = workoutDayStyles.section;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.exerciseList}>
        {Object.entries(exercises).map(([exerciseKey, exercise]) => (
          <ExerciseItem
            key={exerciseKey}
            exercise={exercise}
            isCompleted={completedExercises.has(`${sectionKey}_${exerciseKey}`)}
            onToggle={() => onExerciseToggle(sectionKey, exerciseKey)}
          />
        ))}
      </div>
    </div>
  );
};
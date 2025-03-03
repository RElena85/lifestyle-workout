import React from 'react';
import { SectionProps } from '../types';
import { ExerciseItem } from './ExerciseItem';
import { workoutDayStyles } from '../styles';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export const Section: React.FC<SectionProps> = ({
  title,
  exercises,
  completedExercises,
  sectionKey,
  onExerciseToggle
}) => {
  const styles = workoutDayStyles.section;

  return (
    <Card className={`${styles.container} mb-4`}>
      <CardHeader className="p-3">
        <CardTitle className={styles.title}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
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
      </CardContent>
    </Card>
  );
};
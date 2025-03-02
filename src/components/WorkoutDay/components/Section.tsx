import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';

export interface SectionProps {
  title: string;
  exercises: Record<string, { name: string }>;
  completedExercises: Set<string>;
  sectionKey: string;
  onExerciseToggle: (sectionKey: string, exerciseKey: string) => void;
  currentExercise: string | null;
  workoutStarted: boolean;
  completedSubActivities: Record<string, any>;
  onSubActivityToggle: (exerciseId: string, subActivityId: string) => void;
  renderExerciseContent: (exercise: any) => JSX.Element;
}

export const Section: React.FC<SectionProps> = ({
  title,
  exercises,
  completedExercises,
  sectionKey,
  onExerciseToggle,
  currentExercise,
  workoutStarted,
  completedSubActivities,
  onSubActivityToggle,
  renderExerciseContent,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(exercises).map(([exerciseKey, exercise]) => {
          const exerciseId = `${sectionKey}_${exerciseKey}`;
          return (
            <div key={exerciseKey} className="mb-2">
              <Button
                onClick={() => onExerciseToggle(sectionKey, exerciseKey)}
                variant={completedExercises.has(exerciseId) ? 'destructive' : 'default'}
                size="sm"
                className="mb-1"
              >
                {exercise.name}
              </Button>
              {renderExerciseContent(exercise)}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
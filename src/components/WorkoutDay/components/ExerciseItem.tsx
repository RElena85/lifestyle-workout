import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ExerciseItemProps } from '../types';
import { workoutDayStyles } from '../styles';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';

/**
 * ExerciseItem Component refactored with shadcn/ui Card and Button components.
 * Preserves existing functionality while using shadcn/ui UI primitives.
 */
export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  isCompleted,
  onToggle,
}) => {
  // Extract styles from global workoutDayStyles config.
  const styles = workoutDayStyles.exercise;

  // Render video actions using a shadcn/ui Button for consistency.
  const renderVideoActions = () => {
    if (!exercise.videoId) return null;

    const youtubeUrl = `https://www.youtube.com/watch?v=${exercise.videoId}`;

    return (
      <CardFooter className="pt-2">
        <Button 
          asChild
          variant="outline" 
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
          title="Open in YouTube"
        >
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            <span>Open in YouTube</span>
          </a>
        </Button>
      </CardFooter>
    );
  };

  return (
    <Card className={`${styles.container} mb-4`}>
      <CardContent>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            className={styles.checkbox}
          />
          <div className="flex-1">
            <h4 className={styles.title}>{exercise.title}</h4>
            {exercise.sets && (
              <p className={styles.sets}>{exercise.sets}</p>
            )}
            {exercise.steps && (
              <ul className={styles.steps.container}>
                {exercise.steps.map((step, index) => (
                  <li key={index} className={styles.steps.item}>
                    <span className={styles.steps.bullet}>•</span>
                    {step}
                  </li>
                ))}
              </ul>
            )}
            {exercise.notes && (
              <ul className={styles.notes.container}>
                {exercise.notes.map((note, index) => (
                  <li key={index} className={styles.notes.item}>
                    <span className={styles.notes.icon}>ℹ</span>
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </CardContent>
      {renderVideoActions()}
    </Card>
  );
};
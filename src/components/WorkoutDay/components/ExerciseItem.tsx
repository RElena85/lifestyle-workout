import React, { useState, useEffect } from 'react';
import { ExerciseItemProps } from '../types';
import { workoutDayStyles } from '../styles';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';

/**
 * useMediaQuery
 * A hook that returns whether the given media query matches.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * ExerciseItem component
 *
 * This component renders a single exercise.
 * On small screens, if the exercise is marked as completed, the entire card gets collapsed by default.
 * The parent component (e.g., WorkoutDay) is responsible for rendering a day-level progress bar.
 */
export const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise,
  isCompleted,
  onToggle
}) => {
  const styles = workoutDayStyles.exercise;

  // Determine if we're on a small screen (for example, below 640px)
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // If completed and on a small screen, collapse the details (entire card) by default.
  const [isExpanded, setIsExpanded] = useState<boolean>(!(isCompleted && isSmallScreen));

  // Update the expanded state if screen size or exercise completion status changes.
  useEffect(() => {
    setIsExpanded(!(isCompleted && isSmallScreen));
  }, [isCompleted, isSmallScreen]);

  // Toggle the expandable area when clicking on header (exclude checkbox clicks).
  const handleToggleDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'input') return;
    setIsExpanded(prev => !prev);
  };

  // Render video actions with a button if a video is available.
  const renderVideoActions = () => {
    if (!exercise.videoId) return null;
    const youtubeUrl = `https://www.youtube.com/watch?v=${exercise.videoId}`;
    return (
      <CardFooter className="flex items-center gap-1 mt-1 px-3 py-1.5">
        <Button
          asChild
          variant="default"
          size="sm"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
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
    <Card className={styles.container}>
      <CardContent>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={isCompleted}
            onChange={onToggle}
            className={styles.checkbox}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center" onClick={handleToggleDetails}>
              <h4 className={styles.title}>{exercise.title}</h4>
              {/* Toggle icon appears on small screens */}
              {isSmallScreen && (
                <span className="ml-2 text-lg" aria-hidden="true">
                  {isExpanded ? '▼' : '►'}
                </span>
              )}
            </div>
            {isExpanded && (
              <div className="mt-2">
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
            )}
          </div>
        </label>
      </CardContent>
      {isExpanded && renderVideoActions()}
    </Card>
  );
};

export default ExerciseItem;
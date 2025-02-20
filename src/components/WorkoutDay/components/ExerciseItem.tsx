import React from 'react';
import { ExerciseItemProps } from '../types';
import { workoutDayStyles } from '../styles';
import { ExternalLink } from 'lucide-react';

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
    exercise,
    isCompleted,
    onToggle
 }) => {
    const styles = workoutDayStyles.exercise;

    const renderVideoActions = () => {
        if (!exercise.videoId) return null;
        
        const youtubeUrl = `https://www.youtube.com/watch?v=${exercise.videoId}`;
        
        return (
          <div className="flex items-center gap-2 mt-2">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
              title="Open in YouTube"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in YouTube</span>
            </a>
          </div>
        );
      };

  return (
    <div className={styles.container}>
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
             {renderVideoActions()}
    </div>
  );
};
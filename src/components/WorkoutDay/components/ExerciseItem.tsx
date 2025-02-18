import React from 'react';
import { ExerciseItemProps } from '../types';
import { workoutDayStyles } from '../styles';

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, isCompleted, onToggle }) => {
  const styles = workoutDayStyles.exercise;

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
    </div>
  );
};
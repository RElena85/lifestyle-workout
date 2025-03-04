import React from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { WorkoutController } from '../WorkoutController/WorkoutController';
import { Button } from '../ui/button';

interface ButtonBarProps {
  className?: string;
}

/**
 * ButtonsBar
 *
 * Renders a top bar with various controls using shadcn's Button components.
 * The bar is fixed at the top at all times. A spacer is added in the overall layout (or here)
 * so that the fixed bar does not overlap the app title.
 *
 * In this example, we assume the bar has a fixed height of h-16 (4rem).
 */
export const ButtonsBar: React.FC<ButtonBarProps> = ({ className }) => {
  return (
    <>
      {/* Spacer element to avoid content overlap (change h-16 if your header height differs) */}
      <div className="h-16" />
      <div 
        className={`
          ${className} 
          bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 shadow-lg 
          fixed top-0 inset-x-0 z-50
        `}
      >
        <div className="flex items-center gap-3 justify-center">
          <WorkoutController />
          <div className="w-px h-6 bg-gray-600" />
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export default ButtonsBar;
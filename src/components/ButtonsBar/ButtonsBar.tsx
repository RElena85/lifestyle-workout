// components/ButtonBar/ButtonBar.tsx
import React from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { WorkoutController } from '../WorkoutController/WorkoutController';
import { Settings, BarChart2 } from 'lucide-react';
import { standardButtonStyles } from './standardButtonStyles';

interface ButtonBarProps {
  className?: string;
}

export const ButtonsBar: React.FC<ButtonBarProps> = ({ className }) => {
  return (
    <div className={`${className} bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 shadow-lg`}>
      <div className="flex items-center gap-3">
        <WorkoutController />
        <div className="w-px h-6 bg-gray-600" />
        <button 
          className={standardButtonStyles}
          onClick={() => console.log('Stats clicked')}
          aria-label="View Statistics"
        >
          <BarChart2 className="w-5 h-5" />
          <span>Stats</span>
        </button>
        <div className="w-px h-6 bg-gray-600" />
        <LanguageSwitcher />
        <div className="w-px h-6 bg-gray-600" />
        <button 
          className={standardButtonStyles}
          onClick={() => console.log('Settings clicked')}
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};
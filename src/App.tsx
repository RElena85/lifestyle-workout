import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { WorkoutDay } from './components/WorkoutDay';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <LanguageSwitcher />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            {t('workout.title')}
          </h1>
          <blockquote className="border-l-4 border-purple-500 pl-4 mx-auto max-w-2xl text-gray-300 italic">
            {t('workout.tip')}
          </blockquote>
        </div>
        <div className="space-y-8">
          <WorkoutDay dayKey="day1" />
          <WorkoutDay dayKey="day2" />
          <WorkoutDay dayKey="day3" />
        </div>
      </div>
    </div>
  );
}

export default App;
export const calculateProgress = (completedCount: number, totalCount: number): number => {
  return Math.round((completedCount / totalCount) * 100);
};

export const getTotalExercises = (sections: Record<string, any>): number => {
  return Object.values(sections).reduce(
    (total, section) => total + Object.keys(section.exercises).length,
    0
  );
};

export const loadSavedExercises = (dayKey: string): Set<string> => {
  const savedExercises = localStorage.getItem(`${dayKey}_exercises`);
  return savedExercises ? new Set(JSON.parse(savedExercises)) : new Set();
};

export const saveExercises = (dayKey: string, exercises: Set<string>): void => {
  localStorage.setItem(`${dayKey}_exercises`, JSON.stringify([...exercises]));
};

export const isDayLocked = (dayKey: string): boolean => {
  if (dayKey === 'day1') return false;
  const previousDay = `day${parseInt(dayKey.replace('day', '')) - 1}`;
  return localStorage.getItem(`${previousDay}_completed`) !== 'true';
};

// utils.ts
export const loadSavedSubActivities = (dayKey: string): Record<string, Set<string>> => {
    const saved = localStorage.getItem(`${dayKey}_subactivities`);
    if (!saved) return {};

    const parsed = JSON.parse(saved);
    return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [k, new Set(v as string[])])
    );
};
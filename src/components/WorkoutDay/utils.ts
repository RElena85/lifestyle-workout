export const calculateProgress = (completedCount: number, totalCount: number): number => {
  return Math.round((completedCount / totalCount) * 100);
};

export const getTotalExercises = (sections: Record<string, any>): number => {
  console.log(`getTotalExercises dayKey ${sections} Sections`);
  return Object.values(sections).reduce(
    (total, section) => total + Object.keys(section.exercises).length,
    0
  );
};

export const loadSavedExercises = (dayKey: string): Set<string> => {
  const savedExercises = localStorage.getItem(`${dayKey}_exercises`);
  console.log(`Key ${dayKey}_exercises`);    
  return savedExercises ? new Set(JSON.parse(savedExercises)) : new Set();
};

export const saveExercises = (dayKey: string, exercises: Set<string>): void => {
  console.log(`Save exercise dayKey ${dayKey} exercises ${exercises.values.length}`);
  localStorage.setItem(`${dayKey}_exercises`, JSON.stringify([...exercises]));
};

export const isDayLocked = (dayKey: string): boolean => {
  // Extract the day number from the day key (e.g., "day1" -> 1)
  const dayNumber = parseInt(dayKey.replace(/\D/g, ''), 10);
  
  // First day is never locked
  if (dayNumber <= 1) return false;
  
  // Check if the previous day is completed
  const previousDayKey = `day${dayNumber - 1}`;
  return localStorage.getItem(`${previousDayKey}_completed`) !== 'true';
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
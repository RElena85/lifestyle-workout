// types.ts
export interface SubActivity {
    id: string;
    description: string;
}

export interface Exercise {
    title: string;
    steps?: string[];
    sets?: string;
    notes?: string[];
    subActivities?: SubActivity[];
    videoId?: string;
}


export interface Section {
    title: string;
    exercises: Record<string, Exercise>;
}

export interface WorkoutDayProps {
    dayKey: string;
}

export interface ExerciseItemProps {
    exercise: Exercise;
    isCompleted: boolean;
    onToggle: () => void;
}

export interface SectionProps {
    title: string;
    exercises: Record<string, Exercise>;
    completedExercises: Set<string>;
    completedSubActivities: Record<string, Set<string>>;
    sectionKey: string;
    onExerciseToggle: (sectionKey: string, exerciseKey: string) => void;
    onSubActivityToggle: (exerciseId: string, subActivityId: string) => void;
    renderExerciseContent: (exercise: any, exerciseId: string) => JSX.Element;
}
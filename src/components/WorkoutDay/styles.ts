export const workoutDayStyles = {
  container: {
    base: "group bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300",
    locked: "opacity-50 cursor-not-allowed",
    unlocked: "hover:shadow-purple-500/20"
  },
  summary: {
    base: "cursor-pointer p-6 [&::-webkit-details-marker]:hidden",
    locked: "cursor-not-allowed",
    unlocked: "cursor-pointer"
  },
  title: "text-2xl font-bold text-white group-open:text-purple-400 transition-colors",
  progress: {
    text: "text-gray-400 text-sm",
    bar: {
      container: "w-24 h-2 bg-gray-700 rounded-full overflow-hidden",
      fill: "h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
    }
  },
  section: {
    container: "mb-8 last:mb-0",
    title: "text-xl font-semibold mb-4 text-purple-400 border-b border-purple-500/30 pb-2",
    exerciseList: "space-y-4"
  },
  exercise: {
    container: "bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors",
    checkbox: "mt-1.5 h-4 w-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900",
    title: "font-medium text-white",
    sets: "text-sm text-purple-400 mt-1",
    steps: {
      container: "mt-2 space-y-1",
      item: "text-sm text-gray-300 flex items-center",
      bullet: "mr-2 text-purple-400"
    },
    notes: {
      container: "mt-2 space-y-1",
      item: "text-sm text-gray-400 italic flex items-center",
      icon: "mr-2 text-purple-400"
    }
  }
} as const;
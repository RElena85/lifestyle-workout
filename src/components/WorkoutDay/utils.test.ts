import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  calculateProgress,
  getTotalExercises,
  loadSavedExercises,
  saveExercises,
  isDayLocked,
  loadSavedSubActivities
} from './utils'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('WorkoutDay Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('calculateProgress', () => {
    it('calculates progress correctly for normal cases', () => {
      expect(calculateProgress(5, 10)).toBe(50)
      expect(calculateProgress(7, 10)).toBe(70)
      expect(calculateProgress(0, 10)).toBe(0)
      expect(calculateProgress(10, 10)).toBe(100)
    })

    it('handles edge cases', () => {
      expect(calculateProgress(3, 7)).toBe(43) // Should round to nearest integer
      expect(calculateProgress(2, 3)).toBe(67)
    })

    it('handles zero total count', () => {
      expect(calculateProgress(0, 0)).toBeNaN()
    })
  })

  describe('getTotalExercises', () => {
    it('counts exercises correctly across sections', () => {
      const sections = {
        warmup: {
          exercises: {
            exercise1: {},
            exercise2: {},
            exercise3: {}
          }
        },
        main: {
          exercises: {
            exercise1: {},
            exercise2: {}
          }
        }
      }

      expect(getTotalExercises(sections)).toBe(5)
    })

    it('handles empty sections', () => {
      expect(getTotalExercises({})).toBe(0)
    })

    it('handles sections with no exercises', () => {
      const sections = {
        warmup: { exercises: {} },
        main: { exercises: {} }
      }

      expect(getTotalExercises(sections)).toBe(0)
    })
  })

  describe('loadSavedExercises', () => {
    it('loads saved exercises from localStorage', () => {
      const savedData = ['exercise1', 'exercise2', 'exercise3']
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData))

      const result = loadSavedExercises('day1')

      expect(localStorageMock.getItem).toHaveBeenCalledWith('day1_exercises')
      expect(result).toEqual(new Set(savedData))
    })

    it('returns empty set when no saved data exists', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = loadSavedExercises('day1')

      expect(result).toEqual(new Set())
    })
  })

  describe('saveExercises', () => {
    it('saves exercises to localStorage', () => {
      const exercises = new Set(['exercise1', 'exercise2'])

      saveExercises('day1', exercises)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'day1_exercises',
        JSON.stringify(['exercise1', 'exercise2'])
      )
    })

    it('saves empty set correctly', () => {
      const exercises = new Set()

      saveExercises('day1', exercises)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'day1_exercises',
        JSON.stringify([])
      )
    })
  })

  describe('isDayLocked', () => {
    it('returns false for day 1 (never locked)', () => {
      expect(isDayLocked('day1')).toBe(false)
    })

    it('returns false for day 0 or negative numbers', () => {
      expect(isDayLocked('day0')).toBe(false)
    })

    it('returns false when previous day is completed', () => {
      localStorageMock.getItem.mockReturnValue('true')

      expect(isDayLocked('day2')).toBe(false)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('day1_completed')
    })

    it('returns true when previous day is not completed', () => {
      localStorageMock.getItem.mockReturnValue(null)

      expect(isDayLocked('day3')).toBe(true)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('day2_completed')
    })

    it('extracts day number correctly from different formats', () => {
      localStorageMock.getItem.mockReturnValue('true')

      expect(isDayLocked('day10')).toBe(false)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('day9_completed')
    })
  })

  describe('loadSavedSubActivities', () => {
    it('loads saved sub-activities from localStorage', () => {
      const savedData = {
        'exercise1': ['sub1', 'sub2'],
        'exercise2': ['sub3']
      }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData))

      const result = loadSavedSubActivities('day1')

      expect(localStorageMock.getItem).toHaveBeenCalledWith('day1_subactivities')
      expect(result).toEqual({
        'exercise1': new Set(['sub1', 'sub2']),
        'exercise2': new Set(['sub3'])
      })
    })

    it('returns empty object when no saved data exists', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = loadSavedSubActivities('day1')

      expect(result).toEqual({})
    })
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './i18n/config'

// Mock the components to avoid complex dependencies
vi.mock('./components/WorkoutDay', () => ({
  WorkoutDay: ({ dayKey }: { dayKey: string }) => (
    <div data-testid={`workout-day-${dayKey}`}>
      Workout Day {dayKey}
    </div>
  )
}))

vi.mock('./components/ButtonsBar/ButtonsBar', () => ({
  ButtonsBar: () => <div data-testid="buttons-bar">Buttons Bar</div>
}))

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main title', async () => {
    renderWithI18n(<App />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the ButtonsBar component', () => {
    renderWithI18n(<App />)
    
    expect(screen.getByTestId('buttons-bar')).toBeInTheDocument()
  })

  it('renders workout days based on translation keys', () => {
    renderWithI18n(<App />)
    
    // Should render workout days (the exact number depends on translation data)
    const workoutDays = screen.getAllByTestId(/workout-day-/)
    expect(workoutDays.length).toBeGreaterThan(0)
  })

  it('has proper gradient background styling', () => {
    const { container } = renderWithI18n(<App />)
    
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-gray-900', 'to-gray-800')
  })

  it('renders the workout tip blockquote', () => {
    renderWithI18n(<App />)
    
    const blockquote = screen.getByRole('blockquote')
    expect(blockquote).toBeInTheDocument()
    expect(blockquote).toHaveClass('border-l-4', 'border-purple-500', 'pl-4')
  })
})
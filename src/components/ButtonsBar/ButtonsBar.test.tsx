import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { ButtonsBar } from './ButtonsBar'
import i18n from '../../i18n/config'

// Mock the child components
vi.mock('../LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}))

vi.mock('../WorkoutController/WorkoutController', () => ({
  WorkoutController: () => <div data-testid="workout-controller">Workout Controller</div>
}))

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  )
}

describe('ButtonsBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the buttons bar container', () => {
    const { container } = renderWithI18n(<ButtonsBar />)
    
    // Check that the component renders
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders the language switcher', () => {
    renderWithI18n(<ButtonsBar />)
    
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('renders the workout controller', () => {
    renderWithI18n(<ButtonsBar />)
    
    expect(screen.getByTestId('workout-controller')).toBeInTheDocument()
  })

  it('has proper styling structure', () => {
    const { container } = renderWithI18n(<ButtonsBar />)
    
    // Check that the main container exists
    const mainContainer = container.querySelector('.fixed')
    expect(mainContainer).toBeInTheDocument()
    
    // Check that the inner container with flex layout exists
    const flexContainer = container.querySelector('.flex.items-center')
    expect(flexContainer).toBeInTheDocument()
  })
})
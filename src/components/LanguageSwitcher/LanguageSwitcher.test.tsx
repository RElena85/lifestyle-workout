import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import i18n from '../../i18n/config'

// Mock the UI components
vi.mock('../ui/button', () => ({
  Button: ({ children, onClick, className, 'aria-label': ariaLabel }: any) => (
    <button onClick={onClick} className={className} aria-label={ariaLabel} data-testid="language-button">
      {children}
    </button>
  )
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Globe: () => <span data-testid="globe-icon">🌐</span>
}))

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  )
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset language to English
    i18n.changeLanguage('en')
  })

  it('renders the language switcher button', () => {
    renderWithI18n(<LanguageSwitcher />)
    
    const button = screen.getByTestId('language-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  it('displays the current language label', () => {
    renderWithI18n(<LanguageSwitcher />)
    
    // Should show English label - look for "English" in the full text
    expect(screen.getByText(/English/)).toBeInTheDocument()
  })

  it('displays the globe icon', () => {
    renderWithI18n(<LanguageSwitcher />)
    
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
  })

  it('toggles language when clicked', async () => {
    renderWithI18n(<LanguageSwitcher />)
    
    const button = screen.getByTestId('language-button')
    
    // Initially should show English
    expect(screen.getByText(/English/)).toBeInTheDocument()
    
    // Click to change language
    fireEvent.click(button)
    
    // Should change to Spanish
    expect(screen.getByText(/Español/)).toBeInTheDocument()
  })

  it('cycles back to English from Spanish', async () => {
    // Start with Spanish
    i18n.changeLanguage('es')
    
    renderWithI18n(<LanguageSwitcher />)
    
    const button = screen.getByTestId('language-button')
    
    // Should show Spanish
    expect(screen.getByText(/Español/)).toBeInTheDocument()
    
    // Click to change back
    fireEvent.click(button)
    
    // Should change back to English
    expect(screen.getByText(/English/)).toBeInTheDocument()
  })

  it('handles unknown languages gracefully', () => {
    // Set an unknown language
    i18n.changeLanguage('fr')
    
    renderWithI18n(<LanguageSwitcher />)
    
    // Should fallback to English
    expect(screen.getByText(/English/)).toBeInTheDocument()
  })

  it('has proper button styling', () => {
    renderWithI18n(<LanguageSwitcher />)
    
    const button = screen.getByTestId('language-button')
    expect(button).toHaveClass('flex')
  })
})
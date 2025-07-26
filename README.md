# 🏋️ Interactive Workout Tracker

## Summary

This is a modern, responsive React web application built with TypeScript and Vite that provides an interactive workout program management system. The application features a dynamic, multi-day workout structure with progress tracking, internationalization (English/Spanish), and responsive design optimized for both desktop and mobile devices.

### Key Features

- **Dynamic Day Management**: Automatically reads workout days from translation files - supports any number of days
- **Progressive Unlocking**: Days unlock sequentially as previous days are completed
- **Progress Tracking**: Real-time progress indicators with persistent storage via localStorage
- **Responsive Design**: Mobile-first approach with collapsible exercise details on smaller screens
- **Internationalization**: Full i18n support with English and Spanish translations
- **Exercise Management**: Detailed exercise instructions with video links, sets, reps, and notes
- **Workout State Management**: Start/reset functionality with complete progress persistence

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with HMR (Hot Module Replacement)
- **Styling**: Tailwind CSS with custom gradient animations
- **UI Components**: Custom shadcn/ui-inspired component library
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence

## Project Structure

### Configuration Files

#### `vite.config.ts`
Vite configuration file that sets up:
- React plugin integration
- Path aliases (`@` pointing to `./src`)
- Development server with auto-open and HMR
- Build configuration for GitHub Pages deployment (`base: '/lifestyle-workout/'`)
- Source map and output directory settings

#### `tailwind.config.js`
Tailwind CSS configuration with:
- Custom animations (gradient animations for buttons)
- Tailwind Forms plugin integration
- Content path specifications for purging unused styles

#### `tsconfig.json` & `tsconfig.node.json`
TypeScript configuration files:
- Main config for the application with modern ES features
- Node config for Vite tooling with bundler module resolution

#### `postcss.config.js`
PostCSS configuration for Tailwind CSS processing and autoprefixer.

#### `eslint.config.js`
ESLint configuration with React-specific rules and React Hooks linting.

#### `package.json`
Project dependencies and scripts:
- Development server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Linting: `npm run lint`

### Source Code Structure

#### Core Application

##### `src/main.tsx`
Application entry point that renders the React app with strict mode enabled.

##### `src/App.tsx`
Main application component that:
- Sets up the overall layout with gradient background
- Implements dynamic day rendering from translation files
- Manages the top navigation bar with controls
- Provides responsive grid layout for workout days

##### `src/index.css`
Global styles with Tailwind CSS imports and base typography settings.

#### Internationalization

##### `src/i18n/config.ts`
i18next configuration that:
- Sets up language detection
- Configures English and Spanish translations
- Enables debug mode for development

##### `src/i18n/locales/en/translations.json` & `src/i18n/locales/es/translations.json`
Translation files containing:
- Workout day definitions with exercises, sets, reps, and instructions
- UI text and labels
- Dynamic day structure that the application reads to determine available workout days

#### UI Components

##### `src/components/ui/`
Reusable UI component library inspired by shadcn/ui:

- **`button.tsx`**: Flexible button component with variants (default, outline, destructive) and sizes
- **`card.tsx`**: Card layout components (Card, CardHeader, CardContent, CardFooter)
- **`tabs.tsx`**: Tab navigation components with Radix UI integration
- **`Accordion.tsx`**: Custom accordion implementation with context-based state management
- **`utils.ts`**: Utility functions for className merging using clsx and tailwind-merge

#### Feature Components

##### `src/components/ButtonsBar/`
Top navigation component:
- **`ButtonsBar.tsx`**: Fixed header with workout controls and language switcher
- **`standardButtonStyles.ts`**: Shared button styling with gradient effects

##### `src/components/LanguageSwitcher/`
Language switching functionality:
- **`LanguageSwitcher.tsx`**: Toggle button for English/Spanish switching
- **`constants.ts`**: Language mappings and labels
- **`types.ts`**: TypeScript interfaces for language switching
- **`styles.ts`**: Component-specific styling

##### `src/components/WorkoutController/`
Workout session management:
- **`WorkoutController.tsx`**: Start/reset workout functionality with dynamic day detection

##### `src/components/WorkoutDay/`
Core workout day functionality:

- **`WorkoutDay.tsx`**: Main day component with state management for:
  - Exercise completion tracking
  - Day locking/unlocking logic
  - Progress calculation
  - localStorage persistence

- **`WorkoutHeader.tsx`**: Day header with:
  - Expand/collapse functionality
  - Progress bar display
  - Lock status indicators
  - Responsive layout for mobile/desktop

- **`types.ts`**: TypeScript interfaces for workout data structures
- **`styles.ts`**: Comprehensive styling definitions for all workout components
- **`utils.ts`**: Utility functions for:
  - Progress calculation
  - localStorage operations
  - Day locking logic
  - Exercise counting

##### `src/components/WorkoutDay/components/`
Detailed workout components:

- **`Section.tsx`**: Workout section container (warmup, strength, conditioning)
- **`ExerciseItem.tsx`**: Individual exercise component with:
  - Responsive collapsing on mobile when completed
  - Video link integration
  - Step-by-step instructions
  - Notes and set information

#### Assets

##### `src/assets/`
Static assets including React logo and other images.

### Deployment

#### `.github/workflows/deploy.yml`
GitHub Actions workflow for automatic deployment to GitHub Pages:
- Builds the application on push to main branch
- Deploys to gh-pages branch

#### `workflow/deploy.yml`
Alternative deployment configuration.

## Development

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Adding New Workout Days

To add more workout days:

1. Edit the translation files (`src/i18n/locales/*/translations.json`)
2. Add new day objects (e.g., `day4`, `day5`) under `workout.days`
3. The application will automatically detect and render the new days
4. Days will follow the sequential unlocking pattern

### Customization

- **Styling**: Modify `src/components/WorkoutDay/styles.ts` for workout-specific styles
- **Colors**: Update Tailwind configuration in `tailwind.config.js`
- **Translations**: Add new languages by creating new locale files and updating `i18n/config.ts`

## Browser Support

- Modern browsers with ES2020+ support
- Mobile-responsive design for iOS and Android devices
- Progressive Web App capabilities ready for implementation

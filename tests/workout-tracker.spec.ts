import { test, expect } from '@playwright/test';

test.describe('Interactive Workout Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page with correct title and elements', async ({ page }) => {
    // Verificar título de la página
    await expect(page).toHaveTitle(/Workout Tracker/);
    
    // Verificar que los elementos principales estén presentes
    await expect(page.locator('h1')).toContainText(/Workout|Entrenamiento/);
    
    // Verificar que el botón de idioma esté presente
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
    
    // Verificar que haya al menos un día de entrenamiento
    await expect(page.locator('[data-testid="workout-day"]').first()).toBeVisible();
  });

  test('should switch between languages', async ({ page }) => {
    // Obtener texto inicial
    const initialText = await page.locator('h1').textContent();
    
    // Hacer clic en el botón de idioma
    await page.locator('[data-testid="language-switcher"]').click();
    
    // Esperar a que el texto cambie
    await page.waitForTimeout(500);
    
    // Verificar que el texto ha cambiado
    const newText = await page.locator('h1').textContent();
    expect(newText).not.toBe(initialText);
  });

  test('should start and reset workout', async ({ page }) => {
    // Verificar que el botón de iniciar está presente
    const startButton = page.locator('[data-testid="start-workout"]');
    await expect(startButton).toBeVisible();
    
    // Hacer clic en iniciar entrenamiento
    await startButton.click();
    
    // Verificar que aparece el botón de reiniciar
    const resetButton = page.locator('[data-testid="reset-workout"]');
    await expect(resetButton).toBeVisible();
    
    // Hacer clic en reiniciar
    await resetButton.click();
    
    // Verificar que vuelve a aparecer el botón de iniciar
    await expect(startButton).toBeVisible();
  });

  test('should expand and collapse workout days', async ({ page }) => {
    // Iniciar entrenamiento primero
    await page.locator('[data-testid="start-workout"]').click();
    
    // Buscar el primer día desbloqueado
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    const dayHeader = firstDay.locator('[data-testid="workout-day-header"]');
    
    // Verificar que el día está presente
    await expect(dayHeader).toBeVisible();
    
    // Hacer clic para expandir
    await dayHeader.click();
    
    // Verificar que se muestran los ejercicios
    await expect(firstDay.locator('[data-testid="exercise-item"]').first()).toBeVisible();
    
    // Hacer clic de nuevo para colapsar
    await dayHeader.click();
    
    // Verificar que los ejercicios están ocultos
    await expect(firstDay.locator('[data-testid="exercise-item"]').first()).not.toBeVisible();
  });

  test('should mark exercises as completed and track progress', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Expandir el primer día
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Obtener el primer ejercicio
    const firstExercise = firstDay.locator('[data-testid="exercise-item"]').first();
    await expect(firstExercise).toBeVisible();
    
    // Marcar como completado
    const checkbox = firstExercise.locator('input[type="checkbox"]');
    await checkbox.check();
    
    // Verificar que el ejercicio está marcado como completado
    await expect(checkbox).toBeChecked();
    
    // Verificar que la barra de progreso se actualiza
    const progressBar = firstDay.locator('[data-testid="progress-bar"]');
    await expect(progressBar).toBeVisible();
  });

  test('should unlock days progressively', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Verificar que el primer día está desbloqueado
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await expect(firstDay).not.toHaveClass(/locked/);
    
    // Verificar que los días siguientes están bloqueados
    const secondDay = page.locator('[data-testid="workout-day"]').nth(1);
    if (await secondDay.count() > 0) {
      await expect(secondDay).toHaveClass(/locked/);
    }
  });

  test('should persist workout state in localStorage', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Expandir primer día y marcar un ejercicio
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    const firstExercise = firstDay.locator('[data-testid="exercise-item"]').first();
    const checkbox = firstExercise.locator('input[type="checkbox"]');
    await checkbox.check();
    
    // Recargar la página
    await page.reload();
    
    // Verificar que el estado se mantiene
    await expect(page.locator('[data-testid="reset-workout"]')).toBeVisible();
    
    // Expandir primer día y verificar que el ejercicio sigue marcado
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    await expect(checkbox).toBeChecked();
  });

  test('should display exercise details correctly', async ({ page }) => {
    // Iniciar entrenamiento y expandir primer día
    await page.locator('[data-testid="start-workout"]').click();
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Verificar que los ejercicios tienen la información correcta
    const firstExercise = firstDay.locator('[data-testid="exercise-item"]').first();
    
    // Verificar que tiene sets y reps
    await expect(firstExercise.locator('[data-testid="sets-reps"]')).toBeVisible();
    
    // Verificar que tiene instrucciones
    await expect(firstExercise.locator('[data-testid="instructions"]')).toBeVisible();
  });
});
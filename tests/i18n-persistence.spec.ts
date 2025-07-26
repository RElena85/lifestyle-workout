import { test, expect } from '@playwright/test';

test.describe('Internationalization Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should switch from English to Spanish', async ({ page }) => {
    // Verificar contenido en inglés por defecto
    await expect(page.locator('h1')).toContainText(/Workout/i);
    
    // Cambiar a español
    await page.locator('[data-testid="language-switcher"]').click();
    await page.waitForTimeout(500);
    
    // Verificar contenido en español
    await expect(page.locator('h1')).toContainText(/Entrenamiento/i);
    
    // Verificar botones en español
    await expect(page.locator('[data-testid="start-workout"]')).toContainText(/Iniciar|Comenzar/i);
  });

  test('should maintain language preference on page reload', async ({ page }) => {
    // Cambiar a español
    await page.locator('[data-testid="language-switcher"]').click();
    await page.waitForTimeout(500);
    
    // Verificar que está en español
    await expect(page.locator('h1')).toContainText(/Entrenamiento/i);
    
    // Recargar página
    await page.reload();
    
    // Verificar que mantiene el español
    await expect(page.locator('h1')).toContainText(/Entrenamiento/i);
  });

  test('should translate workout content correctly', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Expandir primer día
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Obtener texto de ejercicio en inglés
    const exerciseTitle = await firstDay.locator('[data-testid="exercise-item"]').first().locator('h3').textContent();
    
    // Cambiar a español
    await page.locator('[data-testid="language-switcher"]').click();
    await page.waitForTimeout(500);
    
    // Verificar que el contenido del ejercicio cambió
    const spanishExerciseTitle = await firstDay.locator('[data-testid="exercise-item"]').first().locator('h3').textContent();
    expect(spanishExerciseTitle).not.toBe(exerciseTitle);
  });
});

test.describe('Data Persistence Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Limpiar localStorage antes de cada test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should persist workout progress across browser sessions', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Expandir primer día y completar algunos ejercicios
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Marcar primer ejercicio como completado
    const firstExercise = firstDay.locator('[data-testid="exercise-item"]').first();
    const firstCheckbox = firstExercise.locator('input[type="checkbox"]');
    await firstCheckbox.check();
    
    // Marcar segundo ejercicio como completado si existe
    const secondExercise = firstDay.locator('[data-testid="exercise-item"]').nth(1);
    if (await secondExercise.count() > 0) {
      const secondCheckbox = secondExercise.locator('input[type="checkbox"]');
      await secondCheckbox.check();
    }
    
    // Simular cierre y reapertura del navegador
    await page.reload();
    
    // Verificar que el estado se mantiene
    await expect(page.locator('[data-testid="reset-workout"]')).toBeVisible();
    
    // Expandir día y verificar que los ejercicios siguen marcados
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    await expect(firstCheckbox).toBeChecked();
    
    if (await secondExercise.count() > 0) {
      await expect(secondExercise.locator('input[type="checkbox"]')).toBeChecked();
    }
  });

  test('should persist day unlock status', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Completar completamente el primer día (esto podría desbloquear el segundo)
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Marcar todos los ejercicios del primer día como completados
    const exercises = firstDay.locator('[data-testid="exercise-item"]');
    const exerciseCount = await exercises.count();
    
    for (let i = 0; i < exerciseCount; i++) {
      const checkbox = exercises.nth(i).locator('input[type="checkbox"]');
      await checkbox.check();
      await page.waitForTimeout(100); // Pequeña pausa entre clicks
    }
    
    // Recargar página
    await page.reload();
    
    // Verificar que el progreso se mantiene
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Verificar que todos los ejercicios siguen marcados
    for (let i = 0; i < exerciseCount; i++) {
      const checkbox = exercises.nth(i).locator('input[type="checkbox"]');
      await expect(checkbox).toBeChecked();
    }
  });

  test('should reset all data when reset button is clicked', async ({ page }) => {
    // Iniciar entrenamiento y completar algunos ejercicios
    await page.locator('[data-testid="start-workout"]').click();
    
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    const firstCheckbox = firstDay.locator('[data-testid="exercise-item"]').first().locator('input[type="checkbox"]');
    await firstCheckbox.check();
    
    // Verificar que está marcado
    await expect(firstCheckbox).toBeChecked();
    
    // Resetear entrenamiento
    await page.locator('[data-testid="reset-workout"]').click();
    
    // Verificar que vuelve al estado inicial
    await expect(page.locator('[data-testid="start-workout"]')).toBeVisible();
    
    // Iniciar de nuevo y verificar que los ejercicios están desmarcados
    await page.locator('[data-testid="start-workout"]').click();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    await expect(firstCheckbox).not.toBeChecked();
  });
});
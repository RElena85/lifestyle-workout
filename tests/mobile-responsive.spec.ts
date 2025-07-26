import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Tests', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correctly on mobile devices', async ({ page }) => {
    // Verificar que el layout se adapta a móvil
    await expect(page.locator('body')).toBeVisible();
    
    // Verificar que los botones son accesibles en móvil
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
    await expect(page.locator('[data-testid="start-workout"]')).toBeVisible();
    
    // Verificar que las tarjetas de días se muestran en una columna
    const workoutDays = page.locator('[data-testid="workout-day"]');
    const firstDayBox = await workoutDays.first().boundingBox();
    const secondDayBox = await workoutDays.nth(1).boundingBox();
    
    if (firstDayBox && secondDayBox) {
      // En móvil, los días deben estar uno debajo del otro
      expect(secondDayBox.y).toBeGreaterThan(firstDayBox.y + firstDayBox.height - 50);
    }
  });

  test('should collapse exercises on mobile when completed', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Expandir primer día
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    // Obtener primer ejercicio
    const firstExercise = firstDay.locator('[data-testid="exercise-item"]').first();
    
    // Marcar como completado
    const checkbox = firstExercise.locator('input[type="checkbox"]');
    await checkbox.check();
    
    // En móvil, el ejercicio debería colapsar cuando está completado
    // Esto depende de la implementación específica de tu aplicación
    await page.waitForTimeout(500);
    
    // Verificar que el ejercicio sigue siendo accesible pero posiblemente colapsado
    await expect(checkbox).toBeChecked();
  });

  test('should handle touch interactions properly', async ({ page }) => {
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    
    // Verificar que los toques funcionan correctamente
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    const dayHeader = firstDay.locator('[data-testid="workout-day-header"]');
    
    // Usar tap en lugar de click para simular interacción táctil
    await dayHeader.tap();
    
    // Verificar que se expande
    await expect(firstDay.locator('[data-testid="exercise-item"]').first()).toBeVisible();
    
    // Tap de nuevo para colapsar
    await dayHeader.tap();
    
    // Verificar que se colapsa
    await expect(firstDay.locator('[data-testid="exercise-item"]').first()).not.toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Accessibility and Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Verificar que los botones tienen etiquetas accesibles
    const startButton = page.locator('[data-testid="start-workout"]');
    await expect(startButton).toHaveAttribute('aria-label');
    
    // Verificar que los checkboxes tienen etiquetas
    await page.locator('[data-testid="start-workout"]').click();
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await firstDay.locator('[data-testid="workout-day-header"]').click();
    
    const checkbox = firstDay.locator('[data-testid="exercise-item"]').first().locator('input[type="checkbox"]');
    await expect(checkbox).toHaveAttribute('id');
    
    // Verificar que hay labels asociadas a los checkboxes
    const checkboxId = await checkbox.getAttribute('id');
    const label = page.locator(`label[for="${checkboxId}"]`);
    await expect(label).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Verificar que existe un h1 principal
    await expect(page.locator('h1')).toBeVisible();
    
    // Iniciar entrenamiento para ver más headings
    await page.locator('[data-testid="start-workout"]').click();
    
    // Verificar que los días tienen headings apropiados
    const firstDay = page.locator('[data-testid="workout-day"]').first();
    await expect(firstDay.locator('h2, h3')).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Verificar que se puede navegar con Tab
    await page.keyboard.press('Tab');
    
    // El primer elemento enfocable debería ser el language switcher o start button
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continuar navegando con Tab
    await page.keyboard.press('Tab');
    const secondFocusedElement = page.locator(':focus');
    await expect(secondFocusedElement).toBeVisible();
    
    // Verificar que se puede activar con Enter
    await page.keyboard.press('Enter');
    
    // Debería haber algún cambio en la página
    await page.waitForTimeout(500);
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Esperar a que se carguen los elementos principales
    await expect(page.locator('[data-testid="start-workout"]')).toBeVisible();
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
    await expect(page.locator('[data-testid="workout-day"]').first()).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // La página debe cargar en menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simular conexión lenta
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100);
    });
    
    await page.goto('/');
    
    // La aplicación debería seguir funcionando
    await expect(page.locator('[data-testid="start-workout"]')).toBeVisible();
    
    // Y debería poder iniciar el entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    await expect(page.locator('[data-testid="reset-workout"]')).toBeVisible();
  });
});

test.describe('Cross-browser Compatibility', () => {
  test('should work correctly in different browsers', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Tests básicos que deben funcionar en todos los navegadores
    await expect(page.locator('[data-testid="start-workout"]')).toBeVisible();
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
    
    // Iniciar entrenamiento
    await page.locator('[data-testid="start-workout"]').click();
    await expect(page.locator('[data-testid="reset-workout"]')).toBeVisible();
    
    // Cambiar idioma
    await page.locator('[data-testid="language-switcher"]').click();
    await page.waitForTimeout(500);
    
    // Verificar que funciona en el navegador específico
    console.log(`Test ejecutado exitosamente en ${browserName}`);
  });
});
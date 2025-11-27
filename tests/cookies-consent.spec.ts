import { test, expect } from '@playwright/test';

test.describe('Cookies Consent Modal', () => {
  // Use empty storage state to ensure clean state for each test
  test.use({ 
    storageState: { cookies: [], origins: [] }
  });

  test('should display the cookies modal on first visit', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Wait fo
    // r the modal to appear
    const modal = page.getByRole('dialog', { name: /Preferências de cookies/i });
    await expect(modal).toBeVisible();
    
    // Check for key elements
    await expect(page.getByText(/A Pandami usa cookies/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Aceitar todos' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apenas essenciais' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Recusar todos' })).toBeVisible();
    
    // Check for privacy policy link
    await expect(page.getByRole('link', { name: /Política de Privacidade/i })).toBeVisible();
  });

  test('should hide modal after clicking "Aceitar todos"', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const modal = page.getByRole('dialog', { name: /Preferências de cookies/i });
    await expect(modal).toBeVisible();
    
    const acceptButton = page.getByRole('button', { name: 'Aceitar todos' });
    await acceptButton.click();
    
    // Verify modal disappears
    await expect(modal).toBeHidden();
    
    // Verify choice persists after page reload
    await page.reload();
    await expect(modal).toBeHidden();
  });

  test('should hide modal after clicking "Apenas essenciais"', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const modal = page.getByRole('dialog', { name: /Preferências de cookies/i });
    await expect(modal).toBeVisible();
    
    const essentialsButton = page.getByRole('button', { name: 'Apenas essenciais' });
    await essentialsButton.click();
    
    // Verify modal disappears
    await expect(modal).toBeHidden();
    
    // Verify choice persists after page reload
    await page.reload();
    await expect(modal).toBeHidden();
  });

  test('should hide modal after clicking "Recusar todos"', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const modal = page.getByRole('dialog', { name: /Preferências de cookies/i });
    await expect(modal).toBeVisible();
    
    const declineButton = page.getByRole('button', { name: 'Recusar todos' });
    await declineButton.click();
    
    // Verify modal disappears
    await expect(modal).toBeHidden();
    
    // Verify choice persists after page reload
    await page.reload();
    await expect(modal).toBeHidden();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const modal = page.getByRole('dialog', { name: /Preferências de cookies/i });
    await expect(modal).toBeVisible();
    
    // Check ARIA attributes
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    await expect(modal).toHaveAttribute('aria-labelledby', 'cookies-title');
    
    // Check button accessibility labels
    const acceptButton = page.getByRole('button', { name: 'Aceitar todos' });
    await expect(acceptButton).toHaveAttribute('aria-label', 'Aceitar todos os cookies');
    
    const essentialsButton = page.getByRole('button', { name: 'Apenas essenciais' });
    await expect(essentialsButton).toHaveAttribute('aria-label', 'Aceitar apenas cookies essenciais');
    
    const declineButton = page.getByRole('button', { name: 'Recusar todos' });
    await expect(declineButton).toHaveAttribute('aria-label', 'Não aceitar cookies');
  });
});

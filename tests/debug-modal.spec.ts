import { test, expect } from '@playwright/test';

test.describe('Debug Cookies Modal', () => {
  test.use({ 
    storageState: { cookies: [], origins: [] }
  });

  test('debug modal visibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Take a screenshot to see what's on the page
    await page.screenshot({ path: 'debug-modal.png', fullPage: true });
    
    // Wait a bit for any dynamic content
    await page.waitForTimeout(2000);
    
    // Log all elements with role="dialog"
    const dialogs = await page.locator('[role="dialog"]').all();
    console.log(`Found ${dialogs.length} dialog elements`);
    
    // Log all buttons on the page
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} button elements`);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      console.log(`Button ${i}: "${text}"`);
    }
    
    // Check if modal exists with any text
    const modal = page.locator('[role="dialog"]').first();
    if (await modal.count() > 0) {
      const modalText = await modal.textContent();
      console.log('Modal text:', modalText);
      await expect(modal).toBeVisible();
    } else {
      console.log('No modal found');
    }
  });
});

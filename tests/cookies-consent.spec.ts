import { test, expect } from '@playwright/test';

test.describe('Cookies Consent Modal', () => {
  test.beforeEach(async ({ context }) => {
    // Clear all storage to ensure modal appears
    await context.clearCookies();
    await context.clearPermissions();
  });

  test('should display the cookies modal on first visit', async ({ page }) => {
		// Clear localStorage before navigation
		await page.addInitScript(() => {
			window.localStorage.clear();
			window.sessionStorage.clear();
		});

		await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

		// Wait for hydration and modal to appear (hook has 100ms delay + React hydration)
		const modal = page.locator('[role="dialog"]');
		await expect(modal).toBeVisible({ timeout: 20000 });

		// Check for key elements using text content instead of role
		await expect(page.getByText(/A Pandami usa cookies/i)).toBeVisible();

		// Find buttons by text content within the modal
		// Find buttons by accessible role and name (more specific and reliable)
		await expect(
			modal.getByRole("button", { name: "Aceitar todos os cookies" })
		).toBeVisible();
		await expect(
			modal.getByRole("button", { name: "Aceitar apenas cookies essenciais" })
		).toBeVisible();
		await expect(
			modal.getByRole("button", { name: "Não aceitar cookies" })
		).toBeVisible();
	});

  test('should accept all cookies, save preference to localStorage and dispatch consent event', async ({ page }) => {
    // Clear localStorage before navigation
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    await page.goto("http://localhost:3000");

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 20000 });

    // Setup event listener before clicking to capture the event
    const consentEventPromise = page.evaluate(() => {
      return new Promise((resolve) => {
        window.addEventListener('pdmi:consent', (event: any) => {
          resolve(event.detail);
        });
      });
    });

    // Click "Aceitar todos os cookies"
    await modal.getByRole("button", { name: "Aceitar todos os cookies" }).click();

    // Verify modal disappears
    await expect(modal).not.toBeVisible();

    // Verify localStorage
    const storedConsent = await page.evaluate(() => {
      return window.localStorage.getItem('pdmi_consent_choice_v2');
    });
    expect(storedConsent).toBe('accepted');

    // Verify event was dispatched with correct detail
    const eventDetail = await consentEventPromise;
    expect(eventDetail).toEqual({ choice: 'accepted' });
  });

  test('should update GTM consent to granted when cookies are accepted', async ({ page }) => {
    // Clear storage
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      // Initialize dataLayer to capture pushes
      window.dataLayer = window.dataLayer || [];
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 20000 });

    // Click "Aceitar todos os cookies"
    await modal.getByRole("button", { name: "Aceitar todos os cookies" }).click();

    // Wait for script execution (ConsentScripts.tsx adds the script after state update)
    await expect(async () => {
      const isConsentGranted = await page.evaluate(() => {
        if (!window.dataLayer) return false;
        
        return window.dataLayer.some((item: any) => {
          // Handle both Array and Arguments object (serialized as object with numeric keys)
          let args: any[] = [];
          if (Array.isArray(item)) {
            args = item;
          } else if (item && typeof item === 'object' && '0' in item) {
            args = Array.from(item);
          }

          if (args.length >= 3 && args[0] === 'consent' && args[1] === 'update') {
            const config = args[2];
            // Check for granted status in snake_case (as used in ConsentScripts.tsx)
            return config.ad_storage === 'granted' && 
                   config.analytics_storage === 'granted';
          }
          return false;
        });
      });
      expect(isConsentGranted).toBe(true);
    }).toPass({ timeout: 5000 });
  });
});


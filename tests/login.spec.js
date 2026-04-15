const { test, expect } = require('@playwright/test');

test('Verify Successful Login', async ({ page }) => {
    // 1. Navigation (The "Wait" for the page to load is built-in)
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // 2. Locators (Using CSS and ID selectors)
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    // 3. Actions
    await usernameInput.fill('student');
    await passwordInput.fill('Password123');
    await submitButton.click();

    // 4. Explicit Wait & Assertions
    // We expect the URL to change to the "logged-in" page
    await expect(page).toHaveURL(/logged-in-successfully/);

    // Assert that a success message is visible
    const successMessage = page.locator('.post-title');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Logged In Successfully');

    // 5. Practical Wait: Wait for a logout button to ensure page is fully interactive
    const logoutButton = page.locator('text=Log out');
    await expect(logoutButton).toBeEnabled();
});
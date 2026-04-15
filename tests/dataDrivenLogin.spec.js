const { test, expect } = require('@playwright/test');
const testData = require('../data/users.json'); // Import your JSON data

// This loop creates a new test for every entry in your JSON file
for (const data of testData) {
    
    test(`Login Test: ${data.desc}`, async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        // Locators
        await page.locator('#username').fill(data.username);
        await page.locator('#password').fill(data.password);
        await page.locator('#submit').click();

        // Conditional Assertion based on the data
        if (data.desc === "Valid User") {
            await expect(page).toHaveURL(/logged-in-successfully/);
            await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');
        } else {
            // Assert that an error message appears for invalid inputs
            const errorMessage = page.locator('#error');
            await expect(errorMessage).toBeVisible();
        }
    });
}
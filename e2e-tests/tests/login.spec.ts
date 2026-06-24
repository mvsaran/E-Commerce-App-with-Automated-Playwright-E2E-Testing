import { test, expect } from '../fixtures/testFixtures';

test.describe('Login flow', () => {
  test('should successfully login and redirect to products', async ({ page, loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.login('test@example.com', 'mypassword');
    
    // Verify redirection back to root/products page
    await expect(page).toHaveURL('/');
    
    // Check if the navbar shows the user is logged in
    const userGreeting = page.locator('.user-greeting');
    await expect(userGreeting).toBeVisible();
    await expect(userGreeting).toContainText('test');
  });

  test('should redirect to login if checkout is accessed without auth', async ({ page, checkoutPage }) => {
    // Navigating directly to checkout should redirect to login
    await page.goto('/checkout');
    await expect(page).toHaveURL('/login');
  });
});

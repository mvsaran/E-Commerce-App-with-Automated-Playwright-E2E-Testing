# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login flow >> should redirect to login if checkout is accessed without auth
- Location: e2e-tests/tests/login.spec.ts:17:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://web:5173/login"
Received: "http://web:5173/checkout"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://web:5173/checkout"

```

```yaml
- text: "Blocked request. This host (\"web\") is not allowed. To allow this host, add \"web\" to `preview.allowedHosts` in vite.config.js."
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/testFixtures';
  2  | 
  3  | test.describe('Login flow', () => {
  4  |   test('should successfully login and redirect to products', async ({ page, loginPage, productsPage }) => {
  5  |     await loginPage.navigate();
  6  |     await loginPage.login('test@example.com', 'mypassword');
  7  |     
  8  |     // Verify redirection back to root/products page
  9  |     await expect(page).toHaveURL('/');
  10 |     
  11 |     // Check if the navbar shows the user is logged in
  12 |     const userGreeting = page.locator('.user-greeting');
  13 |     await expect(userGreeting).toBeVisible();
  14 |     await expect(userGreeting).toContainText('test');
  15 |   });
  16 | 
  17 |   test('should redirect to login if checkout is accessed without auth', async ({ page, checkoutPage }) => {
  18 |     // Navigating directly to checkout should redirect to login
  19 |     await page.goto('/checkout');
> 20 |     await expect(page).toHaveURL('/login');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  21 |   });
  22 | });
  23 | 
```
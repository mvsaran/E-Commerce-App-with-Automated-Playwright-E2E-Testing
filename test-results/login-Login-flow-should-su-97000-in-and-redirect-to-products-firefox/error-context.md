# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login flow >> should successfully login and redirect to products
- Location: e2e-tests/tests/login.spec.ts:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Email Address')

```

# Page snapshot

```yaml
- generic [ref=e2]: "Blocked request. This host (\"web\") is not allowed. To allow this host, add \"web\" to `preview.allowedHosts` in vite.config.js."
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class LoginPage extends BasePage {
  5  |   readonly emailInput: Locator;
  6  |   readonly passwordInput: Locator;
  7  |   readonly submitButton: Locator;
  8  | 
  9  |   constructor(page: Page) {
  10 |     super(page);
  11 |     // Since we used useId(), the input id is dynamic. 
  12 |     // We can select by the label or type.
  13 |     this.emailInput = page.getByLabel('Email Address');
  14 |     this.passwordInput = page.getByLabel('Password');
  15 |     this.submitButton = page.locator('button[type="submit"]');
  16 |   }
  17 | 
  18 |   async navigate() {
  19 |     await this.page.goto('/login');
  20 |   }
  21 | 
  22 |   async login(email: string, password = 'password123') {
> 23 |     await this.emailInput.fill(email);
     |                           ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  24 |     await this.passwordInput.fill(password);
  25 |     await this.submitButton.click();
  26 |     // Wait for navigation after simulated login delay
  27 |     await this.page.waitForURL('**/');
  28 |   }
  29 | }
  30 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-flow.spec.ts >> Checkout flow >> should complete the entire checkout flow successfully
- Location: e2e-tests/tests/checkout-flow.spec.ts:9:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.product-card').first().locator('.add-to-cart-btn')

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
  4  | export class ProductsPage extends BasePage {
  5  |   readonly pageTitle: Locator;
  6  |   readonly productCards: Locator;
  7  | 
  8  |   constructor(page: Page) {
  9  |     super(page);
  10 |     this.pageTitle = page.locator('h1:has-text("Discover Our Collection")');
  11 |     this.productCards = page.locator('.product-card');
  12 |   }
  13 | 
  14 |   async navigate() {
  15 |     await this.page.goto('/');
  16 |   }
  17 | 
  18 |   async addToCartByIndex(index: number) {
  19 |     const card = this.productCards.nth(index);
> 20 |     await card.locator('.add-to-cart-btn').click();
     |                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  21 |   }
  22 | 
  23 |   async getProductTitleByIndex(index: number): Promise<string> {
  24 |     const card = this.productCards.nth(index);
  25 |     return await card.locator('.product-title').innerText();
  26 |   }
  27 | }
  28 | 
```
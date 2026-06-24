import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.desktop-only .cart-link');
    this.cartBadge = page.locator('.desktop-only .cart-badge');
  }

  async navigateToCart() {
    await this.cartIcon.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.innerText();
      return parseInt(text, 10);
    }
    return 0;
  }
}

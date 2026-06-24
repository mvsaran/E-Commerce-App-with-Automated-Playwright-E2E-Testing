import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1:has-text("Discover Our Collection")');
    this.productCards = page.locator('.product-card');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async addToCartByIndex(index: number) {
    const card = this.productCards.nth(index);
    await card.locator('.add-to-cart-btn').click();
  }

  async getProductTitleByIndex(index: number): Promise<string> {
    const card = this.productCards.nth(index);
    return await card.locator('.product-title').innerText();
  }
}

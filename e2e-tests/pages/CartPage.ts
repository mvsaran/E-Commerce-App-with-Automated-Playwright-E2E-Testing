import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly emptyCartMessage: Locator;
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly clearCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyCartMessage = page.locator('h2:has-text("Your cart is empty")');
    this.cartItems = page.locator('.cart-item');
    this.proceedToCheckoutButton = page.locator('button:has-text("Proceed to Checkout")');
    this.clearCartButton = page.locator('button:has-text("Clear Cart")');
  }

  async navigate() {
    await this.page.goto('/cart');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async clearCart() {
    await this.clearCartButton.click();
  }
}

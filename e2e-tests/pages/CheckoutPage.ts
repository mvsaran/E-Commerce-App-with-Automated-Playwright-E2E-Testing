import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.addressInput = page.locator('#address');
    this.cityInput = page.locator('#city');
    this.zipCodeInput = page.locator('#zipCode');
    this.cardNumberInput = page.locator('#cardNumber');
    this.expiryInput = page.locator('#expiry');
    this.cvvInput = page.locator('#cvv');
    this.submitButton = page.locator('button:has-text("Confirm & Pay")');
    this.successMessage = page.locator('h2:has-text("Payment Successful!")');
  }

  async fillShippingDetails(details: any = {}) {
    await this.firstNameInput.fill(details.firstName || 'John');
    await this.lastNameInput.fill(details.lastName || 'Doe');
    await this.addressInput.fill(details.address || '123 Main St');
    await this.cityInput.fill(details.city || 'Anytown');
    await this.zipCodeInput.fill(details.zipCode || '12345');
  }

  async fillPaymentDetails(details: any = {}) {
    await this.cardNumberInput.fill(details.cardNumber || '1111222233334444');
    await this.expiryInput.fill(details.expiry || '12/25');
    await this.cvvInput.fill(details.cvv || '123');
  }

  async submitOrder() {
    await this.submitButton.click();
  }
}

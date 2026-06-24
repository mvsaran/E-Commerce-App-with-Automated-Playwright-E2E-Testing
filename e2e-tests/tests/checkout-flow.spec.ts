import { test, expect } from '../fixtures/testFixtures';
import { mockProductsApi } from '../utils/mockApi';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockProductsApi(page);
  });

  test('should complete the entire checkout flow successfully', async ({ page, productsPage, cartPage, checkoutPage, loginPage }) => {
    // 1. Add item to cart
    await productsPage.navigate();
    await productsPage.addToCartByIndex(0);

    // 2. Go to cart and proceed to checkout
    await productsPage.navigateToCart();
    await cartPage.proceedToCheckout();

    // 3. Expected to be redirected to login (not authenticated)
    await expect(page).toHaveURL(/.*\/login/);
    await loginPage.login('buyer@example.com');

    // 4. After login, we are at root (based on our app logic). So we navigate back to checkout.
    // Wait for the redirect to finish
    await expect(page).toHaveURL('/');
    await productsPage.navigateToCart();
    await cartPage.proceedToCheckout();

    // 5. Fill checkout form
    await checkoutPage.fillShippingDetails();
    await checkoutPage.fillPaymentDetails();
    
    // 6. Submit order
    await checkoutPage.submitOrder();

    // 7. Verify success
    await expect(checkoutPage.successMessage).toBeVisible({ timeout: 5000 });
  });
});

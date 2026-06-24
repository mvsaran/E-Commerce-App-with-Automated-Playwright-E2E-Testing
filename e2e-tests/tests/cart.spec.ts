import { test, expect } from '../fixtures/testFixtures';
import { mockProductsApi } from '../utils/mockApi';

test.describe('Cart interactions', () => {
  test.beforeEach(async ({ page }) => {
    await mockProductsApi(page);
  });

  test('should allow adding items to cart', async ({ productsPage, cartPage }) => {
    await productsPage.navigate();
    
    // Add the first product to cart
    await productsPage.addToCartByIndex(0);
    
    // Check badge count
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);

    // Navigate to cart and check item
    await productsPage.navigateToCart();
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(1);
  });

  test('should clear the cart', async ({ productsPage, cartPage }) => {
    await productsPage.navigate();
    await productsPage.addToCart(0);
    await expect(productsPage.cartBadge).toHaveText('1');
    await productsPage.navigateToCart();
    await expect(cartPage.emptyCartMessage).not.toBeVisible();
    
    await cartPage.clearCart();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});

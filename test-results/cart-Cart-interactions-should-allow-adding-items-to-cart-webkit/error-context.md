# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> Cart interactions >> should allow adding items to cart
- Location: e2e-tests\tests\cart.spec.ts:9:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "LuxeCart" [ref=e5]:
        - /url: /
        - img [ref=e6]
        - generic [ref=e9]: LuxeCart
      - generic [ref=e10]:
        - link "Products" [ref=e11]:
          - /url: /
        - link "Login" [ref=e12]:
          - /url: /login
          - button "Login" [ref=e13] [cursor=pointer]:
            - img [ref=e14]
            - text: Login
        - link "1" [ref=e17]:
          - /url: /cart
          - generic [ref=e18]:
            - img [ref=e19]
            - generic [ref=e22]: "1"
      - generic [ref=e23]:
        - link "1" [ref=e24]:
          - /url: /cart
          - generic [ref=e25]:
            - img [ref=e26]
            - generic [ref=e29]: "1"
        - button [ref=e30] [cursor=pointer]:
          - img [ref=e31]
  - generic [ref=e32]:
    - heading "Shopping Cart" [level=1] [ref=e33]
    - generic [ref=e34]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: Product
          - generic [ref=e38]: Quantity
          - generic [ref=e39]: Total
        - generic [ref=e41]:
          - generic [ref=e42]:
            - img "Fjallraven - Foldsack No. 1 Backpack" [ref=e44]
            - generic [ref=e45]:
              - heading "Fjallraven - Foldsack No. 1 Backpack" [level=4] [ref=e46]
              - paragraph [ref=e47]: $109.95
          - generic [ref=e48]:
            - button [ref=e49] [cursor=pointer]:
              - img [ref=e50]
            - generic [ref=e51]: "1"
            - button [ref=e52] [cursor=pointer]:
              - img [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]: $109.95
            - button "Remove item" [ref=e56] [cursor=pointer]:
              - img [ref=e57]
        - generic [ref=e60]:
          - button "Clear Cart" [ref=e61] [cursor=pointer]
          - link "Continue Shopping" [ref=e62]:
            - /url: /
            - button "Continue Shopping" [ref=e63] [cursor=pointer]
      - generic [ref=e65]:
        - heading "Order Summary" [level=3] [ref=e66]
        - generic [ref=e67]:
          - generic [ref=e68]: Subtotal
          - generic [ref=e69]: $109.95
        - generic [ref=e70]:
          - generic [ref=e71]: Shipping
          - generic [ref=e72]: Free
        - generic [ref=e73]:
          - generic [ref=e74]: Tax
          - generic [ref=e75]: $11.00
        - generic [ref=e76]:
          - generic [ref=e77]: Total
          - generic [ref=e78]: $120.95
        - button "Proceed to Checkout" [ref=e79] [cursor=pointer]:
          - text: Proceed to Checkout
          - img [ref=e80]
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/testFixtures';
  2  | import { mockProductsApi } from '../utils/mockApi';
  3  | 
  4  | test.describe('Cart interactions', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await mockProductsApi(page);
  7  |   });
  8  | 
  9  |   test('should allow adding items to cart', async ({ productsPage, cartPage }) => {
  10 |     await productsPage.navigate();
  11 |     
  12 |     // Add the first product to cart
  13 |     await productsPage.addToCartByIndex(0);
  14 |     
  15 |     // Check badge count
  16 |     const badgeCount = await productsPage.getCartBadgeCount();
  17 |     expect(badgeCount).toBe(1);
  18 | 
  19 |     // Navigate to cart and check item
  20 |     await productsPage.navigateToCart();
  21 |     const count = await cartPage.getCartItemsCount();
> 22 |     expect(count).toBe(1);
     |                   ^ Error: expect(received).toBe(expected) // Object.is equality
  23 |   });
  24 | 
  25 |   test('should clear the cart', async ({ productsPage, cartPage }) => {
  26 |     await productsPage.navigate();
  27 |     await productsPage.addToCartByIndex(0);
  28 |     
  29 |     await productsPage.navigateToCart();
  30 |     await expect(cartPage.emptyCartMessage).not.toBeVisible();
  31 |     
  32 |     await cartPage.clearCart();
  33 |     await expect(cartPage.emptyCartMessage).toBeVisible();
  34 |   });
  35 | });
  36 | 
```
import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/inventoryPage';
import { CartPage } from '../../../pages/cartPage';

test('adding a product to the cart updates the badge', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  expect(await inventoryPage.getCartBadgeCount()).toBe(1);
});

test('removing a product from the cart updates the badge and the summary', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  expect(await inventoryPage.getCartBadgeCount()).toBe(2);

  await inventoryPage.goToCart();
  const cartPage = new CartPage(loggedInPage);
  await cartPage.removeItem('Sauce Labs Backpack');

  const remainingItems = await cartPage.getItemNames();
  expect(remainingItems).toEqual(['Sauce Labs Bike Light']);
});

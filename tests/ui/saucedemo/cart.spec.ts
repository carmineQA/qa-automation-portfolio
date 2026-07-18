import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/inventoryPage';
import { CartPage } from '../../../pages/cartPage';

test('aggiunta di un prodotto al carrello aggiorna il badge', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  expect(await inventoryPage.getCartBadgeCount()).toBe(1);
});

test('rimozione di un prodotto dal carrello aggiorna badge e riepilogo', async ({ loggedInPage }) => {
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

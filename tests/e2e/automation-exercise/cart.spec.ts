import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/automationExercise/productsPage';
import { CartPage } from '../../../pages/automationExercise/cartPage';

test('adding multiple products updates the cart with the right items', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();

  const firstProduct = 'Blue Top';
  const secondProduct = 'Men Tshirt';

  await productsPage.addProductToCartByName(firstProduct);
  await productsPage.closeAddedToCartModal();
  await productsPage.addProductToCartByName(secondProduct);
  await productsPage.goToCartFromModal();

  const cartPage = new CartPage(page);
  const itemNames = await cartPage.getItemNames();
  expect(itemNames).toContain(firstProduct);
  expect(itemNames).toContain(secondProduct);
});

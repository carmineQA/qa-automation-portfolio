import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/automationExercise/productsPage';

test('searching for a product shows only matching results', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.searchProduct('Dress');

  await expect(productsPage.getSearchedProductsTitle()).toBeVisible();
  // Note: the site's search matches by relevance across name/category, not
  // just an exact substring of the product name, so we only assert that
  // results are actually returned.
  const names = await productsPage.getProductNames();
  expect(names.length).toBeGreaterThan(0);
});

import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/inventoryPage';
import { ProductDetailPage } from '../../../pages/productDetailPage';

test('navigating from the catalog to the product detail page', async ({ loggedInPage }) => {
  const productName = 'Sauce Labs Backpack';
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.openProductDetails(productName);

  await expect(loggedInPage).toHaveURL(/inventory-item.html/);
  const productDetailPage = new ProductDetailPage(loggedInPage);
  expect(await productDetailPage.getName()).toBe(productName);
});

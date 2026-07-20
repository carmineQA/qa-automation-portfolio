import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/saucedemo/inventoryPage';

test('@regression sorting products by price ascending', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('lohi');
  const prices = await inventoryPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test('@regression sorting products by price descending', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('hilo');
  const prices = await inventoryPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

test('@regression sorting products by name A-Z', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('az');
  const names = await inventoryPage.getProductNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

test('@regression sorting products by name Z-A', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('za');
  const names = await inventoryPage.getProductNames();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

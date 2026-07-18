import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/inventoryPage';

test('ordinamento prodotti per prezzo crescente', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('lohi');
  const prices = await inventoryPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test('ordinamento prodotti per prezzo decrescente', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('hilo');
  const prices = await inventoryPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

test('ordinamento prodotti per nome A-Z', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('az');
  const names = await inventoryPage.getProductNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

test('ordinamento prodotti per nome Z-A', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.sortBy('za');
  const names = await inventoryPage.getProductNames();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

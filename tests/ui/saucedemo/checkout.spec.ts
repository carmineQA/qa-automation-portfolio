import { test, expect } from '../../../fixtures/base';
import { InventoryPage } from '../../../pages/saucedemo/inventoryPage';
import { CartPage } from '../../../pages/saucedemo/cartPage';
import { CheckoutInfoPage } from '../../../pages/saucedemo/checkoutInfoPage';
import { CheckoutOverviewPage } from '../../../pages/saucedemo/checkoutOverviewPage';
import { CheckoutCompletePage } from '../../../pages/saucedemo/checkoutCompletePage';

test('@smoke @regression a full checkout with valid data reaches the confirmation page', async ({
  loggedInPage,
}) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();

  const cartPage = new CartPage(loggedInPage);
  await cartPage.checkout();

  const checkoutInfoPage = new CheckoutInfoPage(loggedInPage);
  await checkoutInfoPage.fillInfo('Mario', 'Rossi', '00100');
  await checkoutInfoPage.continueToOverview();

  const checkoutOverviewPage = new CheckoutOverviewPage(loggedInPage);
  expect(await checkoutOverviewPage.getItemNames()).toContain('Sauce Labs Backpack');
  await checkoutOverviewPage.finish();

  const checkoutCompletePage = new CheckoutCompletePage(loggedInPage);
  expect(await checkoutCompletePage.getConfirmationMessage()).toContain('Thank you for your order');
});

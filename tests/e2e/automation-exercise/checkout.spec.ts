import { test, expect } from '../../../fixtures/automationExercise';
import { ProductsPage } from '../../../pages/automationExercise/productsPage';
import { CartPage } from '../../../pages/automationExercise/cartPage';
import { CheckoutPage } from '../../../pages/automationExercise/checkoutPage';
import { PaymentPage } from '../../../pages/automationExercise/paymentPage';

test('@regression a full checkout with payment reaches the order confirmation message', async ({
  authenticatedPage,
  testAccount,
}) => {
  const productsPage = new ProductsPage(authenticatedPage);
  await productsPage.goto();
  await productsPage.addProductToCartByName('Blue Top');
  await productsPage.goToCartFromModal();

  const cartPage = new CartPage(authenticatedPage);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(authenticatedPage);
  await checkoutPage.addComment('Please deliver in the morning.');
  await checkoutPage.placeOrder();

  const paymentPage = new PaymentPage(authenticatedPage);
  await paymentPage.fillPaymentDetails(`${testAccount.firstName} ${testAccount.lastName}`);
  await paymentPage.confirmPayment();

  await expect(paymentPage.getSuccessMessage()).toBeVisible();
});

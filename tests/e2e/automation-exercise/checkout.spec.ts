import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../../pages/automationExercise/signupLoginPage';
import { AccountInfoPage } from '../../../pages/automationExercise/accountInfoPage';
import { AccountPage } from '../../../pages/automationExercise/accountPage';
import { ProductsPage } from '../../../pages/automationExercise/productsPage';
import { CartPage } from '../../../pages/automationExercise/cartPage';
import { CheckoutPage } from '../../../pages/automationExercise/checkoutPage';
import { PaymentPage } from '../../../pages/automationExercise/paymentPage';
import { createRandomCustomer, createRandomAccountDetails } from '../../../test-data/factories';

test('a full checkout with payment reaches the order confirmation message', async ({ page }) => {
  const customer = createRandomCustomer();
  const accountDetails = createRandomAccountDetails();

  // Checkout on Automation Exercise requires a logged-in account, so we
  // register one just for this test and delete it again at the end.
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.goto();
  await signupLoginPage.signup(`${customer.firstName} ${customer.lastName}`, customer.email);

  const accountInfoPage = new AccountInfoPage(page);
  await accountInfoPage.fillAccountDetails(customer.firstName, customer.lastName, {
    password: customer.password,
    ...accountDetails,
  });
  await accountInfoPage.createAccount();
  await accountInfoPage.continueToHome();

  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.addProductToCartByName('Blue Top');
  await productsPage.goToCartFromModal();

  const cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.addComment('Please deliver in the morning.');
  await checkoutPage.placeOrder();

  const paymentPage = new PaymentPage(page);
  await paymentPage.fillPaymentDetails(`${customer.firstName} ${customer.lastName}`);
  await paymentPage.confirmPayment();

  await expect(paymentPage.getSuccessMessage()).toBeVisible();

  const accountPage = new AccountPage(page);
  await accountPage.deleteAccount();
  await expect(accountPage.getAccountDeletedHeading()).toBeVisible();
});

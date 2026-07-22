import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../../pages/automationExercise/signupLoginPage';
import { AccountInfoPage } from '../../../pages/automationExercise/accountInfoPage';
import { AccountPage } from '../../../pages/automationExercise/accountPage';
import { createRandomCustomer, createRandomAccountDetails } from '../../../test-data/factories';

test('@regression registering a new user succeeds and logs them in automatically', async ({
  page,
}) => {
  const customer = createRandomCustomer();
  const accountDetails = createRandomAccountDetails();

  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.goto();
  await signupLoginPage.signup(`${customer.firstName} ${customer.lastName}`, customer.email);

  const accountInfoPage = new AccountInfoPage(page);
  await accountInfoPage.fillAccountDetails(customer.firstName, customer.lastName, {
    password: customer.password,
    ...accountDetails,
  });
  await accountInfoPage.createAccount();

  await expect(accountInfoPage.getAccountCreatedHeading()).toBeVisible();
  await accountInfoPage.continueToHome();

  const accountPage = new AccountPage(page);
  await expect(accountPage.getLoggedInAsText()).toContainText(customer.firstName);

  // Clean up: this is a shared public demo environment, so every account we
  // create must be deleted at the end of the test that created it.
  await accountPage.deleteAccount();
  await expect(accountPage.getAccountDeletedHeading()).toBeVisible();
});

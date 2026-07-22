import { test as base, Page } from '@playwright/test';
import { SignupLoginPage } from '../pages/automationExercise/signupLoginPage';
import { AccountApiClient } from '../api/automationExercise/accountApiClient';
import { createRandomCustomer, createRandomAccountDetails } from '../test-data/factories';

type TestAccount = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Fixtures = {
  testAccount: TestAccount;
  authenticatedPage: Page;
};

// Automation Exercise exposes a public REST API (documented on the site itself
// under "APIs List") for account creation/deletion. Tests that only need an
// authenticated account as a precondition (e.g. checkout) seed it through this
// API instead of repeating the full multi-step UI signup wizard, which is
// already covered end-to-end by tests/e2e/automation-exercise/registration.spec.ts.
// See docs/decisions.md for the full reasoning.
export const test = base.extend<Fixtures>({
  testAccount: async ({ request }, use) => {
    const customer = createRandomCustomer();
    const accountDetails = createRandomAccountDetails();
    const apiClient = new AccountApiClient(request);

    await apiClient.createAccount({
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      password: customer.password,
      title: 'Mr',
      birthDate: '10',
      birthMonth: '5',
      birthYear: '1990',
      firstName: customer.firstName,
      lastName: customer.lastName,
      company: accountDetails.company,
      address1: accountDetails.address,
      address2: accountDetails.address2,
      country: 'India',
      zipcode: accountDetails.zipcode,
      state: accountDetails.state,
      city: accountDetails.city,
      mobileNumber: accountDetails.mobileNumber,
    });

    await use(customer);

    await apiClient.deleteAccount(customer.email, customer.password);
  },

  authenticatedPage: async ({ page, testAccount }, use) => {
    const signupLoginPage = new SignupLoginPage(page);
    await signupLoginPage.goto();
    await signupLoginPage.login(testAccount.email, testAccount.password);

    await use(page);
  },
});
export { expect } from '@playwright/test';

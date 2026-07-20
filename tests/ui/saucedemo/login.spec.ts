import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/loginPage';
import { users } from '../../../test-data/users';

test('@smoke @regression login with standard_user succeeds', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory.html/);
});

test('@smoke @regression login with locked_out_user shows a lockout message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(loginPage.getErrorMessage()).toBeVisible();
});

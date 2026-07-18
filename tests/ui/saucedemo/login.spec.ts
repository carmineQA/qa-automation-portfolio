import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { users } from '../../../test-data/users';

test('login con standard_user ha successo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory.html/);
});

test('login con locked_out_user mostra messaggio di blocco', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(loginPage.getErrorMessage()).toBeVisible();
});

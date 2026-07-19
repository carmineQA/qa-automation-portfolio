import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../../pages/automationExercise/signupLoginPage';

test('login with a non-existent account shows an error message', async ({ page }) => {
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.goto();
  await signupLoginPage.login('does-not-exist@example.com', 'wrongPassword123');

  await expect(signupLoginPage.getLoginErrorMessage()).toBeVisible();
});

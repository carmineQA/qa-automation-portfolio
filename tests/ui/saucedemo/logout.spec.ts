import { test, expect } from '../../../fixtures/base';
import { NavigationMenu } from '../../../components/saucedemo/navigationMenu';

test('logout redirects back to the login page', async ({ loggedInPage }) => {
  const navigationMenu = new NavigationMenu(loggedInPage);
  await navigationMenu.logout();
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
});

import { test, expect } from '../../../fixtures/base';
import { NavigationMenu } from '../../../components/navigationMenu';

test('logout riporta alla pagina di login', async ({ loggedInPage }) => {
  const navigationMenu = new NavigationMenu(loggedInPage);
  await navigationMenu.logout();
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
});

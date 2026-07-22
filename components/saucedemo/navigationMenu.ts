import { Page, Locator } from '@playwright/test';

export class NavigationMenu {
  private menuButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

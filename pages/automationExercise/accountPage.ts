import { Page, Locator } from '@playwright/test';

export class AccountPage {
  private page: Page;
  private loggedInAsText: Locator;
  private deleteAccountLink: Locator;
  private accountDeletedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
  }

  getLoggedInAsText() {
    return this.loggedInAsText;
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  getAccountDeletedHeading() {
    return this.accountDeletedHeading;
  }
}

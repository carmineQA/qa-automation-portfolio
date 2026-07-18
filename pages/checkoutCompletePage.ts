import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;
  private completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }
}

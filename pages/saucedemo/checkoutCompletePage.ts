import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private completeHeader: Locator;

  constructor(page: Page) {
    this.completeHeader = page.locator('.complete-header');
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }
}

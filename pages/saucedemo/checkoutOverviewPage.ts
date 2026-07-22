import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  private itemNames: Locator;
  private finishButton: Locator;

  constructor(page: Page) {
    this.itemNames = page.locator('.inventory_item_name');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async finish() {
    await this.finishButton.click();
  }
}

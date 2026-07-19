import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private commentTextarea: Locator;
  private placeOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.locator('a:has-text("Place Order")');
  }

  async addComment(comment: string) {
    await this.commentTextarea.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderLink.click();
  }
}

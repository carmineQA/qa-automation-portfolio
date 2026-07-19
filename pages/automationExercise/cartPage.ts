import { Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  private cartRows: Locator;
  private proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('#cart_info tbody tr');
    this.proceedToCheckoutButton = page.locator('a.check_out');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async getItemNames(): Promise<string[]> {
    await this.cartRows.first().waitFor();
    return this.cartRows.locator('.cart_description h4 a').allTextContents();
  }

  async getItemQuantity(productName: string): Promise<string> {
    const row = this.cartRows.filter({ hasText: productName });
    return (await row.locator('.cart_quantity button').textContent()) ?? '';
  }

  async removeItem(productName: string) {
    const row = this.cartRows.filter({ hasText: productName });
    await row.locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  private page: Page;
  private itemName: Locator;
  private itemPrice: Locator;
  private addToCartButton: Locator;
  private backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('.inventory_details_name');
    this.itemPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getName(): Promise<string> {
    return (await this.itemName.textContent()) ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.itemPrice.textContent()) ?? '';
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async backToProducts() {
    await this.backButton.click();
  }
}

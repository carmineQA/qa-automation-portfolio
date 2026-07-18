import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private sortDropdown: Locator;
  private productNames: Locator;
  private productPrices: Locator;
  private cartBadge: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.productPrices.allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace('$', '')));
  }

  async addProductToCart(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartBadgeCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text, 10) : 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openProductDetails(productName: string) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }
}

import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private page: Page;
  private searchInput: Locator;
  private searchButton: Locator;
  private searchedProductsTitle: Locator;
  private productItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('h2.title:has-text("Searched Products")');
    this.productItems = page.locator('.product-image-wrapper');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  getSearchedProductsTitle() {
    return this.searchedProductsTitle;
  }

  async getProductNames(): Promise<string[]> {
    return this.productItems.locator('.productinfo p').allTextContents();
  }

  async addProductToCartByName(name: string) {
    const item = this.productItems.filter({ hasText: name });
    await item.hover();
    await item.locator('.productinfo .add-to-cart').first().click();
  }

  async closeAddedToCartModal() {
    await this.page.locator('.modal-content button:has-text("Continue Shopping")').click();
  }

  async goToCartFromModal() {
    await this.page.locator('.modal-content a:has-text("View Cart")').click();
  }
}

import { Page, Locator } from '@playwright/test';

export class PaymentPage {
  private page: Page;
  private nameOnCardInput: Locator;
  private cardNumberInput: Locator;
  private cvcInput: Locator;
  private expiryMonthInput: Locator;
  private expiryYearInput: Locator;
  private payButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
    this.successMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
  }

  async fillPaymentDetails(nameOnCard: string) {
    await this.nameOnCardInput.fill(nameOnCard);
    await this.cardNumberInput.fill('4111111111111111');
    await this.cvcInput.fill('123');
    await this.expiryMonthInput.fill('12');
    await this.expiryYearInput.fill('2030');
  }

  async confirmPayment() {
    await this.payButton.click();
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}

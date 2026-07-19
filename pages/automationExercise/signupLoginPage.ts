import { Page, Locator } from '@playwright/test';

export class SignupLoginPage {
  private page: Page;
  private signupNameInput: Locator;
  private signupEmailInput: Locator;
  private signupButton: Locator;
  private loginEmailInput: Locator;
  private loginPasswordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  getLoginErrorMessage() {
    return this.loginErrorMessage;
  }
}

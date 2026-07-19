import { Page, Locator } from '@playwright/test';

export type AccountDetails = {
  password: string;
  company: string;
  address: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class AccountInfoPage {
  private page: Page;
  private passwordInput: Locator;
  private daySelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private addressInput: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipcodeInput: Locator;
  private mobileNumberInput: Locator;
  private createAccountButton: Locator;
  private accountCreatedHeading: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.addressInput = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async fillAccountDetails(firstName: string, lastName: string, details: AccountDetails) {
    await this.passwordInput.fill(details.password);
    await this.daySelect.selectOption('10');
    await this.monthSelect.selectOption('5');
    await this.yearSelect.selectOption('1990');
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption('India');
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }

  getAccountCreatedHeading() {
    return this.accountCreatedHeading;
  }

  async continueToHome() {
    await this.continueButton.click();
  }
}

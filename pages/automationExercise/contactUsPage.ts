import { Page, Locator } from '@playwright/test';

export class ContactUsPage {
  private page: Page;
  private nameInput: Locator;
  private emailInput: Locator;
  private subjectInput: Locator;
  private messageTextarea: Locator;
  private uploadFileInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextarea = page.locator('textarea[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert-success');
  }

  async goto() {
    await this.page.goto('/contact_us');
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async submit() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}

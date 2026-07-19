import { test, expect } from '@playwright/test';
import path from 'path';
import { ContactUsPage } from '../../../pages/automationExercise/contactUsPage';
import { createRandomCustomer } from '../../../test-data/factories';

test('submitting the contact form with a file attachment shows a success message', async ({ page }) => {
  const customer = createRandomCustomer();
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage.goto();

  await contactUsPage.fillForm(
    `${customer.firstName} ${customer.lastName}`,
    customer.email,
    'Question about an order',
    'Could you confirm the delivery time for my last order? Thanks!'
  );
  await contactUsPage.uploadFile(path.resolve(__dirname, '../../../test-data/fixtures/sample-upload.txt'));
  await contactUsPage.submit();

  await expect(contactUsPage.getSuccessMessage()).toContainText('Success! Your details have been submitted successfully.');
});

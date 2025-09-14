
import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../pages/file-upload';
import { USERNAME, PASSWORD } from '../playwright.config';

test('Automate form creation with upload flow', async ({ page }) => {
  const formPage = new FileUploadPage(page);

  await formPage.loginToTheApplication(USERNAME, PASSWORD);
  await formPage.navigateToAutomation();
  await formPage.selectForm();
  await formPage.fillMandatoryDetails();
  await formPage.addTextboxAndFileUpload();
  await formPage.interactWithElements();
  await formPage.saveForm();
  const successMessage = await formPage.verifyUploadSuccess();
  expect(successMessage).toBeTruthy();
});
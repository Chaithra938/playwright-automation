
import { test, expect } from '@playwright/test';
import { MessageBoxPage } from '../pages/message-box';
import { USERNAME, PASSWORD } from '../playwright.config';

test('Automate message box task creation', async ({ page }) => {
  const messageBoxPage = new MessageBoxPage(page);

  await messageBoxPage.navigateToApp('https://example.com'); 
  await messageBoxPage.loginToTheApplication(USERNAME, PASSWORD);
  await messageBoxPage.navigateToAutomation();
  await messageBoxPage.createTaskBot();
  await messageBoxPage.fillMandatoryDetails();
  await messageBoxPage.addMessageBox();
  await messageBoxPage.verifyUIElements();
  const confirmationMessage = await messageBoxPage.saveConfiguration();
  // Assertions
  expect(confirmationMessage).toBeTruthy();
});

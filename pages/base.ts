import { Page } from '@playwright/test';
import { USERNAME, PASSWORD } from '../playwright.config';

export class BasePage {
  constructor(protected page: Page) {}

  async loginToTheApplication(username: string = USERNAME, password: string = PASSWORD) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}

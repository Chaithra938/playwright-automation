
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class FileUploadPage extends BasePage {
  readonly rightPanelTitle: Locator;
  readonly rightPanelInput: Locator;
  readonly rightPanelSaveButton: Locator;
  readonly createDropdown: Locator;
  readonly formSelect: Locator;
  readonly automationNav: Locator;
  readonly formNameInput: Locator;
  readonly createButton: Locator;
  readonly textbox: Locator;
  readonly selectFile: Locator;
  readonly canvas: Locator;
  readonly leftPanel: Locator;
  readonly textboxInput: Locator;
  readonly fileUploadInput: Locator;
  readonly saveButton: Locator;
  readonly uploadSuccessMessage: Locator;
  readonly descriptionInput: Locator;
  readonly categorySelect: Locator;
  readonly ownerInput: Locator;

  constructor(page: Page) {
    super(page);
    this.createDropdown = page.locator('#create-dropdown');
    this.formSelect = page.locator('#form-select');
    this.automationNav = page.getByText('Automation');
    this.formNameInput = page.locator('#form-name');
    this.descriptionInput = page.locator('#form-description');
    this.categorySelect = page.locator('#form-category');
    this.ownerInput = page.locator('#form-owner');
    this.createButton = page.locator('#create-button');
    this.textbox = page.getByText('Textbox');
    this.selectFile = page.getByText('Select File');
    this.canvas = page.locator('#canvas');
    this.leftPanel = page.locator('#left-panel');
    this.textboxInput = page.locator('#textbox');
    this.fileUploadInput = page.locator('#file-upload');
    this.saveButton = page.locator('#save-button');
    this.uploadSuccessMessage = page.locator('#upload-success-message');
    this.rightPanelTitle = page.locator('#right-panel-title');
    this.rightPanelInput = page.locator('#right-panel-input');
    this.rightPanelSaveButton = page.locator('#right-panel-save');
  }

  async navigateToAutomation() {
    await this.automationNav.click();
  }

  async selectForm() {
    await this.createDropdown.click();
    await this.formSelect.selectOption({ label: 'Form' });
  }

  async fillMandatoryDetails() {
    await this.formNameInput.fill('Sample Form');
    await this.descriptionInput.fill('This is a sample form for upload flow.');
    await this.categorySelect.selectOption({ label: 'General' });
    await this.ownerInput.fill('Automation Owner');
    // Add more fields as needed
    await this.createButton.click();
  }

  async addTextboxAndFileUpload() {
    await this.leftPanel.click();
    await this.textbox.dragTo(this.canvas);
    await this.selectFile.dragTo(this.canvas);
  }

  async verifyRightPanelInteractions() {
    // Click Textbox element on canvas and verify right panel
    await this.rightPanelTitle.waitFor({ state: 'visible' });
    await this.rightPanelInput.waitFor({ state: 'visible' });
    await this.rightPanelSaveButton.waitFor({ state: 'visible' });
    if (!(await this.rightPanelInput.isEnabled())) {
      throw new Error('Right panel input for Textbox is not enabled');
    }
    if (!(await this.rightPanelSaveButton.isEnabled())) {
      throw new Error('Right panel save button for Textbox is not enabled');
    }
  }
    
  async interactWithElements() {
    await this.textboxInput.fill('Sample Text');
    await this.fileUploadInput.click();
    await this.fileUploadInput.setInputFiles('path/to/your/document.pdf');
  }

  async saveForm() {
    await this.saveButton.click();
  }

  async verifyUploadSuccess() {
   const successMessage = await this.uploadSuccessMessage.waitFor();
   return successMessage;
  }
}

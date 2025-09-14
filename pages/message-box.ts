import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class MessageBoxPage extends BasePage {
  readonly automationNav: Locator;
  readonly createDropdown: Locator;
  readonly taskBot: Locator;
  readonly taskNameInput: Locator;
  readonly descriptionInput: Locator;
  readonly prioritySelect: Locator;
  readonly createButton: Locator;
  readonly actionsPanel: Locator;
  readonly rowFilter: Locator;
  readonly messageBox: Locator;
  readonly confirmationMessage: Locator;
  readonly rightPanelTitle: Locator;
  readonly rightPanelInput: Locator;
  readonly rightPanelSaveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.automationNav = page.getByText('Automation');
    this.createDropdown = page.locator('#create-dropdown');
    this.taskBot = page.getByText('Task Bot');
    this.taskNameInput = page.locator('#task-name');
    this.createButton = page.locator('#create-button');
    this.descriptionInput = page.locator('#description');
    this.prioritySelect = page.locator('#priority');
    this.actionsPanel = page.locator('#actions-panel');
    this.rowFilter = page.locator('#row-filter');
    this.messageBox = page.getByText('Message Box');
    this.confirmationMessage = page.locator('#confirmation-message');
    this.rightPanelTitle = page.locator('#right-panel-title');
    this.rightPanelInput = page.locator('#right-panel-input');
    this.rightPanelSaveButton = page.locator('#right-panel-save');
  }

  async navigateToAutomation() {
    await this.automationNav.click();
  }

  async createTaskBot() {
    await this.createDropdown.click();
    await this.taskBot.waitFor({'state': 'visible'});
    await this.taskBot.click();
  }

  async fillMandatoryDetails() {
    await this.taskNameInput.fill('Sample Task');
    await this.descriptionInput.fill('This is a sample task bot for automation.');
    await this.prioritySelect.selectOption('High');
    // Add more mandatory fields as needed
    await this.createButton.click();
  }

  async addMessageBox() {
    await this.actionsPanel.click();
    await this.rowFilter.fill('Message Box');
    await this.messageBox.waitFor({'state': 'visible'});
    await this.messageBox.dblclick();
  }

  async verifyUIElements(expected = {
    taskName: 'Sample Task',
    description: 'This is a sample task bot for automation.',
    priority: 'High'
  }) {
    // Generic checks for right panel elements
    await this.rightPanelTitle.waitFor({ state: 'visible' });
    await this.rightPanelInput.waitFor({ state: 'visible' });
    await this.rightPanelSaveButton.waitFor({ state: 'visible' });

    // Check if elements are enabled
    if (!(await this.rightPanelInput.isEnabled())) {
      throw new Error('Right panel input is not enabled');
    }
    if (!(await this.rightPanelSaveButton.isEnabled())) {
      throw new Error('Right panel save button is not enabled');
    }

    // Verify mandatory details
    const actualTaskName = await this.taskNameInput.inputValue();
    if (actualTaskName.trim() !== expected.taskName) {
      throw new Error(`Task name mismatch: expected '${expected.taskName}', got '${actualTaskName}'`);
    }
    const actualDescription = await this.descriptionInput.inputValue();
    if (actualDescription.trim() !== expected.description) {
      throw new Error(`Description mismatch: expected '${expected.description}', got '${actualDescription}'`);
    }
    const actualPriority = await this.prioritySelect.inputValue();
    if (actualPriority.trim() !== expected.priority) {
      throw new Error(`Priority mismatch: expected '${expected.priority}', got '${actualPriority}'`);
    }
  }
    
    async saveConfiguration() {
      await this.rightPanelSaveButton.click();
      const message = await this.confirmationMessage.textContent();
      return message?.trim() || '';
    }  
}

# Playwright Automation Project

## Project Overview
This repository contains UI and API automation for an application using Playwright and TypeScript. It demonstrates best practices for page object modeling, environment variable management, and API validation.

## Initial Setup

1. **Clone the repository**
	```sh
	git clone https://github.com/Chaithra938/playwright-automation.git
	cd playwright-automation
	```

2. **Install dependencies**
	```sh
	npm install
	```

3. **Configure environment variables**
	- Create a `.env` file in the project root:
	  ```env
	  USERNAME=your_username
	  PASSWORD=your_password
	  ```

4. **Project Structure**
	- `pages/`: Page Object Model classes for UI automation
	- `tests/`: Test specs for UI and API automation
	- `base/`: Base page class for shared login and navigation logic
	- `playwright.config.ts`: Playwright configuration and environment variable loading

## Available Scripts

- **Run all tests**
  ```sh
  npm run test:all
  ```
- **Run UI Tests**
  ```sh
  npx playwright test
  ```

- **Run API Tests**
  ```sh
  npx playwright test tests/api-instance.spec.ts
  ```

## Key Features
- Page Object Model for maintainable UI automation
- Secure credential management using `.env` and `playwright.config.ts`
- API automation with response validation and cleanup
- Drag-and-drop and right panel UI verification
- Modular and extensible test structure

## Customization
- Update selectors and test data in page classes as per your application
- Extend API tests for additional endpoints and validations

## Troubleshooting
- Ensure Node.js and npm are installed and available in your PATH
- If environment variables are not loaded, check `.env` and `playwright.config.ts` setup
- For selector issues, inspect the application DOM and update locators accordingly

For any questions, contact Chaithra C (`cchaithra252@gmail.com`).

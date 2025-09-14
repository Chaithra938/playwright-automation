import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export const USERNAME = process.env.USERNAME || '';
export const PASSWORD = process.env.PASSWORD || '';

export default defineConfig({
    timeout: 60000,
    use:{
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'on-first-retry',
    },
    reporter: [['list'], ['html', {outputFolder: 'playwright-report', open: 'never'}]],
});
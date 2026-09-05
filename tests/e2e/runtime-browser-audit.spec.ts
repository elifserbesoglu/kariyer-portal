import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('PHASE QA-12: Runtime Browser Audit Evidence', () => {

  const consoleLogPath = path.resolve(process.cwd(), 'qa/runtime/console.log');
  const networkLogPath = path.resolve(process.cwd(), 'qa/runtime/network.log');

  test.beforeAll(() => {
    fs.writeFileSync(consoleLogPath, `=== RUNTIME CONSOLE AUDIT LOG [${new Date().toISOString()}] ===\n`);
    fs.writeFileSync(networkLogPath, `=== RUNTIME NETWORK AUDIT LOG [${new Date().toISOString()}] ===\n`);
  });

  const routes = [
    '/',
    '/jobs',
    '/companies',
    '/events',
    '/announcements',
    '/about',
    '/mission',
    '/vision',
    '/counselors',
    '/management',
    '/contact',
    '/kvkk',
  ];

  for (const route of routes) {
    test(`Runtime Browser Audit for Route: ${route}`, async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        const logEntry = `[${new Date().toISOString()}] [CONSOLE ${msg.type().toUpperCase()}] ${route} -> ${msg.text()}\n`;
        fs.appendFileSync(consoleLogPath, logEntry);
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('response', (response) => {
        const netEntry = `[${new Date().toISOString()}] [NETWORK ${response.status()}] ${route} -> ${response.url()}\n`;
        fs.appendFileSync(networkLogPath, netEntry);
      });

      await page.goto(route);

      const bodyText = await page.innerText('body');
      expect(bodyText.trim().length).toBeGreaterThan(20);
      expect(consoleErrors).toEqual([]);
    });
  }

});

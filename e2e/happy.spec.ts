import {expect, test} from '@playwright/test';

test.describe('User flow tests', async () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByPlaceholder('Enter role, title, or').click();
    await page.getByPlaceholder('Enter role, title, or').fill('Software Engineer');
    await page.getByLabel('Toggle analytical preference').click();
    await page.getByLabel('Toggle structural preference').click();
    await page.getByLabel('Second third of expressiveness').click();
    await page.getByLabel('Third third of assertiveness').click();
    await page.getByLabel('Go to next step').click();
    await page.getByPlaceholder('Enter role, title, or').click();
    await page.getByPlaceholder('Enter role, title, or').fill('DevOps Engineer');
    await page.getByLabel('Toggle structural preference').click();
    await page.getByLabel('Toggle conceptual preference').click();
    await page.getByLabel('Second third of expressiveness').click();
    await page.getByLabel('Third third of flexibility').click();
    await page.getByLabel('Generate prompt').click();
  })

  test('Test 1: Prompt generation functionality', async ({page}) => {
    const textarea = page.locator('textarea');
    await expect(textarea).toContainText('analytical');
  })

  test('Test 2: Clipboard functionality', async ({page}) => {
    // Check if something was copied to clipboard
    await page.getByRole('button', {name: 'Copy me!'}).click();
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).not.toBe('');
    expect(clipboardContent).toContain('analytical'); // Assuming the copied content should contain 'analytical'
  })

});

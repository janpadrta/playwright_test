import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button').click();
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});

test('login problem_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('problem_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button').click();
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});

test('login performance_glitch_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button').click();
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});

test('login error_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('error_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button').click();
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});
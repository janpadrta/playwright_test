import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await expect(page).toHaveTitle(/Swag Labs/);
});

// login
test('login standard_user', async ({ page }) => {
  prihlaseni(page, 'standard_user', 'secret_sauce');
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});

test('login problem_user', async ({ page }) => {
  prihlaseni(page, 'problem_user', 'secret_sauce');
  
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
  prihlaseni(page, 'error_user', 'secret_sauce');
  
  await expect(page.locator('[data-test="inventory-container"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
});

// picture visibility
test('picture visibility for standard_user', async ({ page }) => {
  await prihlaseni(page, 'standard_user', 'secret_sauce');
	
  await page.locator('text=Sauce Labs Fleece Jacket').click();
	
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Back to products');
  await expect(page.locator('[data-test="item-sauce-labs-fleece-jacket-img"]')).toBeVisible();
});

test('picture visibility for problem_user', async ({ page }) => {
  await prihlaseni(page, 'problem_user', 'secret_sauce');
	
  await page.locator('text=Sauce Labs Fleece Jacket').click();
	
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('ITEM NOT FOUND');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Back to products');
  //await expect(page.locator('[data-test="item-sauce-labs-fleece-jacket-img"]')).toBeVisible();
});

test('picture visibility for performance_glitch_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button').click();
  
  await page.locator('text=Sauce Labs Fleece Jacket').click();
	
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Back to products');
  await expect(page.locator('[data-test="item-sauce-labs-fleece-jacket-img"]')).toBeVisible();
});

test('picture visibility for error_user', async ({ page }) => {
  await prihlaseni(page, 'error_user', 'secret_sauce');
	
  await page.locator('text=Sauce Labs Fleece Jacket').click();
	
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('Back to products');
  await expect(page.locator('[data-test="item-sauce-labs-fleece-jacket-img"]')).toBeVisible();
});

// full test run
test('full test for standard_user', async ({ page }) => {
  await prihlaseni(page, 'standard_user', 'secret_sauce');
  
  await page.locator('text=Sauce Labs Fleece Jacket').click();
  
  const price = await page.locator('[data-test="inventory-item-price"]').textContent()
  
  await expect(price).toBe("$49.99");
  
  await page.locator('text=Add To Cart').click();
});


// FUNKCE
async function prihlaseni(page, uzivatelskeJmeno, heslo) {
  await page.goto('https://www.saucedemo.com');
  
  await page.getByPlaceholder('Username').fill(uzivatelskeJmeno);
  await page.getByPlaceholder('Password').fill(heslo);
  await page.getByRole('button').click();
}

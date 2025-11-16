import { test, expect } from '@playwright/test';

test('User logs in, adds product, verifies cart item, and logs out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  const productName = 'Sauce Labs Backpack';
  const cartItem = await page.locator('.inventory_item_name').textContent();
  await expect(cartItem).toContain(productName);

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

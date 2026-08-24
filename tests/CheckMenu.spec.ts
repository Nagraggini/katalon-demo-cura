import { test, expect } from '../fixtures/BaseTest';

test('Main menu buttons check', async ({ page, landingPage, loginPage }) => {
  await landingPage.navigate();

  await landingPage.openMenu();
  await expect(landingPage.home).toBeVisible();
  await landingPage.home.click();

  await expect(page).toHaveURL(/katalon-demo-cura\.herokuapp\.com\/$/);
  await expect(landingPage.heading).toBeVisible();

  await landingPage.openMenu();
  await expect(landingPage.login).toBeVisible();
  await landingPage.login.click();

  await expect(page).toHaveURL(/profile\.php#login$/);
  await expect(loginPage.loginHeading).toBeVisible();
  await expect(loginPage.loginMessage).toBeVisible();
});
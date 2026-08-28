import { test, expect } from "../fixtures/BaseTest";

test("Main menu buttons check", async ({ page, landingPage, loginPage }) => {
    await landingPage.navigate();

    await test.step("Check home in main menu", async () => {
        await landingPage.openMenu();
        await expect(landingPage.home).toBeVisible();
        await landingPage.home.click();
        await expect(landingPage.page).toHaveURL(
            /katalon-demo-cura\.herokuapp\.com\/$/,
        );
        await expect(landingPage.heading).toBeVisible();
    });

    await test.step("Check login in main menu", async () => {
        await landingPage.openMenu();
        await expect(landingPage.login).toBeVisible();
        await landingPage.login.click();
        await expect(landingPage.page).toHaveURL(/profile\.php#login$/);
        await expect(loginPage.loginHeading).toBeVisible();
        await expect(loginPage.loginMessage).toBeVisible();
    });
});

import { test, expect } from "../fixtures/BaseTest";

test("Landing page visual test", async ({ page, landingPage }) => {
    await landingPage.navigate();

    await expect(landingPage.h1).toHaveText("CURA Healthcare Service");

    await expect(page).toHaveScreenshot("landing-page.png");
});

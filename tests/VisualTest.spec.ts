import { test, expect } from "../fixtures/BaseTest";

test("Landing page visual test", async ({ page, landingPage }, testInfo) => {
    // Mark a test with tags or dynamic description.
    testInfo.annotations.push({
        type: "category",
        description: "regression-test",
    });

    // Attach a screenshot in case of an error or at a specific point.
    const screenshot = await page.screenshot();
    await testInfo.attach("appointment-screen", {
        body: screenshot,
        contentType: "image/png",
    });
    await landingPage.navigate();

    await expect(landingPage.h1).toHaveText("CURA Healthcare Service");

    await expect(page).toHaveScreenshot("landing-page.png");
});

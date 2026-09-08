import { test, expect } from "../fixtures/BaseTest";
test("Login", async ({
    page,
    loginPage,
    landingPage,
    makeAppointmentPage,
    summaryPage,
    sideMenuPage,
}, testInfo) => {
    // Mark a test with tags or dynamic description.
    testInfo.annotations.push({
        type: "category",
        description: "smoke-test",
    });

    // Attach a screenshot in case of an error or at a specific point.
    const screenshot = await page.screenshot();
    await testInfo.attach("appointment-screen", {
        body: screenshot,
        contentType: "image/png",
    });

    await loginPage.navigate();
    await loginPage.login();
    await expect(landingPage.h2).toHaveText("Make Appointment");

    await expect(sideMenuPage.logout).toBeVisible();
});

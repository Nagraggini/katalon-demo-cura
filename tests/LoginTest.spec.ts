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

    await loginPage.navigate();
    await loginPage.login();
    await expect(landingPage.h2).toHaveText("Make Appointment");

    await expect(sideMenuPage.logout).toBeVisible();
});

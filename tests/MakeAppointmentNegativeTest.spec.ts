import { test, expect } from "../fixtures/BaseTest";

test("Make appointment negative test with login", async ({
    page,
    loginPage,
    makeAppointmentPage,
    summaryPage,
    sideMenuPage,
    historyPage,
}) => {
    await test.step("Login", async () => {
        await loginPage.navigate();
        await loginPage.login();
    });
    let visitDate: string = "";

    await test.step("Make an Appointment", async () => {
        await expect(makeAppointmentPage.page).toHaveURL(/#appointment$/);
        await expect(makeAppointmentPage.heading).toBeVisible();

        await makeAppointmentPage.createAppointment({
            facility: "Seoul CURA Healthcare Center",
            hospitalReadmission: false,
            program: "Medicare",
            visitDate: visitDate,
            comment: "Christmas annual check-up.",
        });
        await expect(makeAppointmentPage.page).toHaveURL(/#appointment$/);
    });

    await test.step("Check history.", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.history.click();

        // Check empty object.
        await expect(await historyPage.getAppointments()).toEqual([]);

        // Check length.
        expect(Object.keys(await historyPage.getAppointments())).toHaveLength(
            0,
        );

        // Check "No appointment." sentence is in the body.
        expect(historyPage.body).toContainText("No appointment.");
    });

    await test.step("Logout and check it.", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.logout.click();
        await expect(sideMenuPage.login).toBeVisible();
    });
});

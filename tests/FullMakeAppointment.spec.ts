import { test, expect } from "../fixtures/BaseTest";
import { Appointment } from "../models/Appointment";

test("Full appointment workflow with login", async ({
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
    let visitDate: string = "20/12/2026";

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
    });

    await test.step("Check Appointment on SummaryPage", async () => {
        await expect(summaryPage.page).toHaveURL(/#summary$/);
        await expect(summaryPage.heading).toBeVisible();
        await expect(summaryPage.facilityValue).toHaveText(
            "Seoul CURA Healthcare Center",
        );
        await expect(summaryPage.readmissionValue).toHaveText("No");
        await expect(summaryPage.healthcareProgramValue).toHaveText("Medicare");
        await expect(summaryPage.visitDateValue).toHaveText(visitDate);
        await expect(summaryPage.commentValue).toHaveText(
            "Christmas annual check-up.",
        );

        await expect(summaryPage.goToHomePageButton).toHaveAttribute(
            "href",
            "https://katalon-demo-cura.herokuapp.com/",
        );
    });

    await test.step("Check Appointment in History", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.history.click();
        await expect(sideMenuPage.page).toHaveURL(/history\.php#history$/);
        await expect(historyPage.h2).toBeVisible();

        const historyItems: Appointment[] = await historyPage.getAppointments();

        // Check the history isn't empty.
        await expect(historyItems.length).toBeGreaterThan(0);

        await expect(historyItems[0].visitDate).toBe(visitDate);
        await expect(historyItems[0].facility).toBe(
            "Seoul CURA Healthcare Center",
        );
        await expect(historyItems[0].hospitalReadmission).toBe(false);
        await expect(await historyItems[0].healthcareProgram).toBe("Medicare");
        await expect(historyItems[0].comment).toBe(
            "Christmas annual check-up.",
        );

        await expect(summaryPage.goToHomePageButton).toHaveAttribute(
            "href",
            "https://katalon-demo-cura.herokuapp.com/",
        );
    });

    await test.step("Logout and check it.", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.logout.click();
        await expect(sideMenuPage.login).toBeVisible();
    });
});

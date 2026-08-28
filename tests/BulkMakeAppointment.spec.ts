import { test, expect } from "../fixtures/BaseTest";
import { Appointment } from "../models/Appointment";
import { ExcelReader } from "../utils/ExcelReader";

test("Bulk make appointment workflow with login", async ({
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
    let appointmentList: Appointment[];

    await test.step("Make an Appointment", async () => {
        // Each row in the Excel file is converted into a separate Appointment object.
        appointmentList = ExcelReader.readAppointments(
            "data/cura_bulk_appointments.xlsx",
            "Appointments",
        );

        for (const appointment of appointmentList) {
            await makeAppointmentPage.createAppointment({
                facility: appointment.facility,
                hospitalReadmission:
                    String(appointment.hospitalReadmission)
                        .trim()
                        .toLowerCase() === "true",

                program: appointment.healthcareProgram,
                visitDate: appointment.visitDate,
                comment: appointment.comment,
            });

            // Check Appointment on SummaryPage
            await expect(summaryPage.facilityValue).toHaveText(
                appointment.facility,
            );
            await expect(summaryPage.readmissionValue).toHaveText(
                // Ternary operator.
                appointment.hospitalReadmission ? "Yes" : "No",
            );
            await expect(summaryPage.healthcareProgramValue).toHaveText(
                appointment.healthcareProgram,
            );
            await expect(summaryPage.visitDateValue).toHaveText(
                appointment.visitDate,
            );
            await expect(summaryPage.commentValue).toHaveText(
                appointment.comment,
            );

            await expect(summaryPage.goToHomePageButton).toHaveAttribute(
                "href",
                "https://katalon-demo-cura.herokuapp.com/",
            );
            // Back to make an appointment.
            await summaryPage.goToHomePageButton.click();
        }
    });

    await test.step("Check Appointment on HistoryPage", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.history.click();
        await expect(historyPage.page).toHaveURL(/history\.php#history$/);
        await expect(historyPage.h2).toBeVisible();
        console.log("appointmentList");
        console.log(appointmentList);

        console.log("await historyPage.getAppointments()");
        console.log(await historyPage.getAppointments());

        await expect(appointmentList).toStrictEqual(
            await historyPage.getAppointments(),
        );
    });

    await test.step("Logout and check it.", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.logout.click();
        await expect(sideMenuPage.login).toBeVisible();
    });
});

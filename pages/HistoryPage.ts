import { expect, Locator, Page } from "@playwright/test";
import { Appointment } from "../models/Appointment";
export class HistoryPage {
    readonly page: Page;
    readonly h2: Locator;
    readonly body: Locator;
    readonly appointments: Locator;

    constructor(page: Page) {
        this.page = page;
        this.h2 = page.locator("//h2");
        this.body = page.locator("//body");
        this.appointments = page.locator("div.panel.panel-info");
    }

    async getAppointments(): Promise<Appointment[]> {
        // Create an empty list to store the extracted history items.
        const appointmentList: Appointment[] = [];
        const count = await this.appointments.count();

        for (let index = 0; index < count; index++) {
            // Select the current panel by its zero-based index.
            const panel = this.appointments.nth(index);

            // Create a HistoryItem object using values extracted
            // from the current appointment panel.
            const appointment: Appointment = {
                visitDate: await panel.locator(".panel-heading").innerText(),
                facility: await panel.locator("#facility").innerText(),
                // If not true, the variable value will be false.
                hospitalReadmission:
                    String(
                        await panel
                            .locator("#hospital_readmission")
                            .innerText(),
                    ) === "Yes",
                // Trust me, the value coming from Excel can only be Medicare, Medicaid, or None.
                healthcareProgram: String(
                    await panel.locator("#program").innerText(),
                ) as "Medicare" | "Medicaid" | "None",
                comment: await panel.locator("#comment").innerText(),
            };

            appointmentList.push(appointment);
        }
        return appointmentList;
    }
}

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MakeAppointmentPage } from "../pages/MakeAppointmentPage";
import { SummaryPage } from "../pages/SummaryPage";

test("Teljes foglalási folyamat bejelentkezéssel", async ({ page, loginPage,makeAppointmentPage,SummaryPage }) => {

 
  // 1. Bejelentkezés fázis
  await loginPage.navigate();
  await loginPage.login('John Doe', 'ThisIsNotAPassword');

  // 2. Ellenőrizzük, hogy megérkeztünk-e a foglalási oldalra, és a főcím látható
  await expect(page).toHaveURL(/.*#appointment/);
  await expect(makeAppointmentPage.heading).toBeVisible();
 
  // 3. Időpontfoglalás fázis a TypeScript objektummal
  await makeAppointmentPage.createAppointment({
    facility: 'Seoul CURA Healthcare Center',
    hospitalReadmission: false,
    program: 'Medicare',
    visitDate: '20/12/2026',
    comment: 'Christmas annual check-up.'
  });

  // 4. Hitelesítjük a sikeres rögzítést (átirányít a confirmation aloldalra).
  await expect(page).toHaveURL(/.*#summary/);
  await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();

  await expect(page.facilityValue).toHaveText('Seoul CURA Healthcare Center');
await expect(page.readmissionValue).toHaveText('No');
await expect(page.healthcareProgramValue).toHaveText('Medicare');
await expect(page.visitDateValue).toHaveText('20/12/2026');
await expect(page.commentValue).toHaveText('Christmas annual check-up.');
});
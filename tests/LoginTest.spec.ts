import { test, expect } from "../fixtures/BaseTest";
test("Login", async ({
  page,
  loginPage,
  landingPage,
  makeAppointmentPage,
  summaryPage,
  sideMenuPage,
}) => {
  await loginPage.navigate();
  await loginPage.login();
  await expect(landingPage.h2).toHaveText("Make Appointment");

  await expect(sideMenuPage.logout).toBeVisible();
});

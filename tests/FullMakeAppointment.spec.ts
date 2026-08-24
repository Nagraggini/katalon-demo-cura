import { test, expect } from '../fixtures/BaseTest';

test('Full appointment workflow with login', async ({
  page,
  loginPage,
  makeAppointmentPage,
  summaryPage
}) => {
  await loginPage.navigate();
  await loginPage.login();

  await expect(page).toHaveURL(/#appointment$/);
  await expect(makeAppointmentPage.heading).toBeVisible();

  await makeAppointmentPage.createAppointment({
    facility: 'Seoul CURA Healthcare Center',
    hospitalReadmission: false,
    program: 'Medicare',
    visitDate: '20/12/2026',
    comment: 'Christmas annual check-up.'
  });

  await expect(page).toHaveURL(/#summary$/);
  await expect(summaryPage.heading).toBeVisible();
  await expect(summaryPage.facilityValue).toHaveText('Seoul CURA Healthcare Center');
  await expect(summaryPage.readmissionValue).toHaveText('No');
  await expect(summaryPage.healthcareProgramValue).toHaveText('Medicare');
  await expect(summaryPage.visitDateValue).toHaveText('20/12/2026');
  await expect(summaryPage.commentValue).toHaveText('Christmas annual check-up.');
});
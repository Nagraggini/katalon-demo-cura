import { test as base } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { MakeAppointmentPage } from '../pages/MakeAppointmentPage';
import { SummaryPage } from '../pages/SummaryPage';

type MyFixtures = {
  landingPage: LandingPage;
  loginPage: LoginPage;
  makeAppointmentPage: MakeAppointmentPage;
  summaryPage: SummaryPage;
};

export const test = base.extend<MyFixtures>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  makeAppointmentPage: async ({ page }, use) => {
    await use(new MakeAppointmentPage(page));
  },

  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
  }
});

export { expect } from '@playwright/test';

// Run after every tests.
test.afterEach(async ({ context }) => {
  await context.close();
});

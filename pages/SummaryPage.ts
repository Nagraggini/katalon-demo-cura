import { Locator, Page } from '@playwright/test';

export class SummaryPage {
  readonly heading: Locator;
  readonly facilityValue: Locator;
  readonly readmissionValue: Locator;
  readonly healthcareProgramValue: Locator;
  readonly visitDateValue: Locator;
  readonly commentValue: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Appointment Confirmation' });
    this.facilityValue = page.locator('#facility');
    this.readmissionValue = page.locator('#hospital_readmission');
    this.healthcareProgramValue = page.locator('#program');
    this.visitDateValue = page.locator('#visit_date');
    this.commentValue = page.locator('#comment');
  }
}
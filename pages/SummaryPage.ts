import { Locator, Page } from "@playwright/test";

export class SummaryPage {
  readonly page: Page;

  readonly facilityValue: Locator;
  readonly readmissionValue: Locator;
  readonly healthcareProgramValue: Locator;
  readonly visitDateValue: Locator;
  readonly commentValue: Locator;

  constructor(page: Page) {
    this.page = page;

    this.facilityValue = this.page.locator('#facility');
    this.readmissionValue = this.page.locator('#hospital_readmission');
    this.healthcareProgramValue = this.page.locator('#program');
    this.visitDateValue = this.page.locator('#visit_date');
    this.commentValue = this.page.locator('#comment');
  }
}
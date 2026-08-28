import { expect, Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly h2: Locator;
  readonly body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h2 = page.locator("//h2");
    this.body = page.locator("//body");
  }
}

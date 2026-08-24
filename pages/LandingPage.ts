import { expect, Locator, Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly menu: Locator;
  readonly sidebar: Locator;
  readonly home: Locator;
  readonly login: Locator;
  readonly heading: Locator;
  readonly makeAppointmentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator('#menu-toggle');
    this.sidebar = page.locator('#sidebar-wrapper');
    this.home = this.sidebar.getByRole('link', { name: 'Home', exact: true });
    this.login = this.sidebar.getByRole('link', { name: 'Login', exact: true });
    this.heading = page.getByRole('heading', {
      name: 'CURA Healthcare Service',
      level: 1
    });
    this.makeAppointmentButton = page.locator('#btn-make-appointment');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async openMenu(): Promise<void> {
    if (!(await this.sidebar.getAttribute('class'))?.includes('active')) {
      await this.menu.click();
    }

    await expect(this.sidebar).toHaveClass(/active/);
  }
}
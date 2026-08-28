import { expect, Locator, Page } from "@playwright/test";

export class SideMenuPage {
  readonly page: Page;
  readonly menu: Locator;
  readonly sidebar: Locator;
  readonly home: Locator;
  readonly login: Locator;
  readonly history: Locator;
  readonly profile: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator("#menu-toggle");
    this.sidebar = page.locator("#sidebar-wrapper");
    this.home = this.sidebar.getByRole("link", {
      name: "Home",
      exact: true,
    });
    this.login = this.sidebar.getByRole("link", {
      name: "Login",
      exact: true,
    });
    this.history = this.sidebar.getByRole("link", {
      name: "History",
      exact: true,
    });
    this.profile = this.sidebar.getByRole("link", {
      name: "Profile",
      exact: true,
    });
    this.logout = this.sidebar.getByRole("link", {
      name: "Logout",
      exact: true,
    });
  }

  async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  async openMenu(): Promise<void> {
    if (!(await this.sidebar.getAttribute("class"))?.includes("active")) {
      await this.menu.click();
    }

    await expect(this.sidebar).toHaveClass(/active/);
  }
}

import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginHeading: Locator;
  readonly loginMessage: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.loginMessage = page.getByText('Please login to make appointment.');
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/profile.php#login');
  }

  async login(
    username = 'John Doe',
    password = 'ThisIsNotAPassword'
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
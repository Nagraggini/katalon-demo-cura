import { Locator, Page } from "@playwright/test";

export class LoginPage {
  // Deklaráljuk a változókat és a típusukat.
  readonly page: Page;
 
  readonly loginHeading:Locator;
  readonly loginMessage:Locator;
  readonly usernameInput:Locator;
  readonly passwordInput:Locator;
  readonly loginBtn:Locator;  

  constructor(page: Page) {
    this.page = page;
    
    this.loginHeading= page.getByRole('heading', { name: 'Login' });
    this.loginMessage=page.getByText('Please login to make appointment.');
    this.usernameInput=page.locator('#txt-username');   
    this.passwordInput=page.locator('#txt-password');  
    this.loginBtn=page.locator('#btn-login');  
  } 

   async navigate() {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
  }

  /**
   * Bejelentkezési folyamat végrehajtása
   * @param username Felhasználónév (alapértelmezetten a demo: 'John Doe')
   * @param password Jelszó (alapértelmezetten a demo: 'ThisIsNotAPassword')
   */
  async login(username: string = 'John Doe', password: string = 'ThisIsNotAPassword'): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}

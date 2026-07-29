import { Locator, Page } from "@playwright/test";

export class LandingPage {
  // Deklaráljuk a változókat és a típusukat.
  readonly page: Page;
 
  readonly menu:Locator;
  readonly home:Locator;
  readonly login:Locator;
  readonly h1:Locator;

  readonly makeAppointment:Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.menu=page.locator('#menu-toggle');   
    this.home=page.getByRole('link', { name: 'Home' });
    this.login=page.getByRole('link', { name: 'Login' });
    this.h1 = page.locator('h1');

    this.makeAppointment=page.locator('btn-make-appointment');
  }

  async navigate() {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/");
  }

  
}

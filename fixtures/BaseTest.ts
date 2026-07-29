// Playwright Fixture mintát követve mindent kitakarít a háttérben!
// fixtures/baseTest.ts
import { test as base, devices, BrowserContext, Page } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";

// 1. Lépés: Definiáljuk a fixture-ök típusait (milyen Page Objectjeink lesznek)
type MyFixtures = {
  context: BrowserContext;
  page: Page;
  landingPage: LandingPage;
  loginPage: LoginPage;
};

// 2. Lépés: Kiterjesztjük az alap 'test' objektumot
export const test = base.extend<MyFixtures>({
  // Minden fixture egy aszinkron függvény, ami megkapja a 'page' és a 'use' paramétert
  // Példányosítjuk az osztályt
  landingPage: async ({ page }, use) => {
    // Átadjuk a tesztnek használatra
    await use(new LandingPage(page));
  },
  loginPage: async ({ page }, use) => {    
    await use(new LoginPage(page));
  },

});

// 3. Lépés: Újraexportáljuk az 'expect' funkciót is, a kényelmesebb importálásért
export { expect } from "@playwright/test";

// Minden teszt után lefut.
test.afterEach(async ({ context }) => {
  await context.close();
});

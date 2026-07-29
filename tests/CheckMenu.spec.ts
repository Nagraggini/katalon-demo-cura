import { test, expect } from "../fixtures/BaseTest";
import { LandingPage} from "../pages/LandingPage";
import { LoginPage} from "../pages/LoginPage";


test('test', async ({ page , landingPage, loginPage }) => {

  landingPage.navigate(); 

  // Home oldal.
  await landingPage.menu.click();
  await landingPage.home.click();

  // Ellenőrizzük, hogy a főcím látható-e és az adott szöveget tartalmazza-e.  
  await expect(landingPage.h1).toBeVisible();
  await expect(landingPage.h1).toHaveText('CURA Healthcare Service');

  // Bejelentkezés felület.
  await landingPage.menu.click();
  await landingPage.login.click();

  // Ellenőrizzük, hogy az url cím tartalmazza-e az adott szöveget.
  await expect(page).toHaveURL("profile.php#login", { timeout: 10000 });

  // Login főcím jelenlétének és szövegének ellenőrzése. 
  await expect(loginPage.loginHeading).toBeVisible();

  // Ellenőrizzük, hogy látható-e az adott szöveg.  
  await expect(loginPage.loginMessage).toBeVisible();

  // Bejelentkezés
  await loginPage.usernameInput.fill('John Doe');
  await loginPage.passwordInput.fill('ThisIsNotAPassword');
  await loginPage.loginBtn.click();
  
  // assert -> Make Appointment
  await page.getByRole('heading', { name: 'Make Appointment' }).click();
});
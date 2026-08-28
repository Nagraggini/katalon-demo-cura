import { test, expect } from "../fixtures/BaseTest";
import { LandingPage } from "../pages/LandingPage";

test("Check menu after login", async ({
    page,
    loginPage,
    landingPage,
    makeAppointmentPage,
    summaryPage,
    sideMenuPage,
    historyPage,
    profilePage,
}) => {
    await loginPage.navigate();
    await sideMenuPage.openMenu();
    await sideMenuPage.login.click();

    await await expect(loginPage.page).toHaveURL(/profile\.php#login$/);

    await loginPage.login();

    await await expect(makeAppointmentPage.page).toHaveURL(/#appointment$/);

    await test.step("Check home in menu", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.home.click();
        await await expect(sideMenuPage.page).toHaveURL(
            "https://katalon-demo-cura.herokuapp.com/",
        );
    });

    await test.step("Check history in menu", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.history.click();
        await expect(sideMenuPage.page).toHaveURL(/history\.php#history$/);
        await expect(historyPage.h2).toHaveText("History");
        await expect(historyPage.body).toContainText("No appointment.");
    });

    await test.step("Check profile in menu", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.profile.click();
        await expect(sideMenuPage.page).toHaveURL(/profile\.php#profile$/);
        await expect(profilePage.h2).toHaveText("Profile");
        await expect(profilePage.body).toContainText("Under construction.");
    });

    await test.step("Check logout in menu", async () => {
        await sideMenuPage.openMenu();
        await sideMenuPage.logout.click();
        await await expect(sideMenuPage.page).toHaveURL(
            "https://katalon-demo-cura.herokuapp.com/",
        );
        await expect(landingPage.h1).toHaveText("CURA Healthcare Service");

        await sideMenuPage.openMenu();
        await expect(sideMenuPage.login).toBeVisible();
    });
});

import { test, expect } from "../fixtures/BaseTest";

test("Vizuális teszt", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await expect(page).toHaveScreenshot(`katalon-demo-cura.png`);

    await page.locator("#btn-make-appointment").click();

    await expect(page).toHaveScreenshot(`katalon-demo-cura.png`);
    await page.waitForTimeout(3000);
});

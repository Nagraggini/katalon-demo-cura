import { test, expect } from '../fixtures/BaseTest';

test.use({
    viewport: {
        width: 1280,
        height: 1000
    }
});

// TODO fixme
test('Landing and login page visual test', async ({
    page,
    landingPage
}) => {
    await landingPage.navigate();
    await expect(landingPage.heading).toBeVisible();

    /* await expect(page).toHaveScreenshot('landing-page.png', {
         animations: 'disabled'
     });
 */
    await landingPage.makeAppointmentButton.click();
    await expect(page).toHaveURL(/profile\.php#login$/);

    /* await expect(page).toHaveScreenshot('login-page.png', {
         animations: 'disabled'
     });*/
});
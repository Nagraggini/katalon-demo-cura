# Useful informations

If visual test are failed, you should update referenced pictures. Use this commant in terminal:
`npx playwright test tests/VisualTest.spec.ts \
  --project=chromium \
  --update-snapshots=all`

I installed these libraries to use excel file:
npm install xlsx
npm install --save-dev @types/node

# How to generate Allure Report

Run this command in terminal `npm install --save-dev allure-playwright allure-commandline`

Modify `playwright.config.ts` 
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ... other setting ...
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
});
```
After that run this command in terminal: `npx playwright test`

Now you can see the report, run this command in terminal: `npx allure serve allure-results`

# Ho to set Allure Report like a website

Preparation: Generating the Allure HTML folder:
Run this command in terminal: `npx allure generate allure-results -o allure-report --clean`

Auto-publish with GitHub Actions (Pro method):

Set new workflow (modify .github/workflows/playwright.yml file):
```yml
name: Playwright Tests & Allure Report

on:
    push:
        branches: [main, master]
    pull_request:
        branches: [main, master]

jobs:
    test:
        timeout-minutes: 60
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: lts/*

            - name: Install dependencies
              run: npm ci

            - name: Install Playwright Browsers
              run: npx playwright install --with-deps

            # Run the tests (the '|| true' is needed so that if a test fails,
            # the workflow does not stop immediately, but also generates the error report)
            - name: Run Playwright tests
              run: npx playwright test || true

            # 1. We also keep the traditional Playwright artifact.
            - uses: actions/upload-artifact@v4
              if: ${{ !cancelled() }}
              with:
                  name: playwright-report
                  path: playwright-report/
                  retention-days: 30

            # 2. Generate the Allure HTML report.
            - name: Generate Allure Report
              if: ${{ !cancelled() }}
              run: npx allure generate allure-results -o allure-report --clean

            # 3. Upload it to the gh-pages branch to make it a website.
            - name: Deploy to GitHub Pages
              if: ${{ !cancelled() }}
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./allure-report

```

Add the lines to your `.gitignore` file:
```.gitignore
# Allure
/allure-results/
/allure-report/
```

Go to Settings -> Pages in your GitHub repository.

In the Build and deployment section, under Source, select GitHub Actions instead of Deploy from a branch (if it is not already set).

After the above Action is completed, your beautiful Allure report will be immediately available on the GitHub Pages link!
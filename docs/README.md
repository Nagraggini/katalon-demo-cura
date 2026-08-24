You can find my detailed hungarian guide on using Playwright [here](https://nagraggini.github.io/my-awesome-book/playwright-hasznalata.html).

If visual test are failed, you should update referenced pictures. Use this commant in terminal: 
`npx playwright test tests/VisualTest.spec.ts \
  --project=chromium \
  --update-snapshots=all`
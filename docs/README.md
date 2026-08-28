If visual test are failed, you should update referenced pictures. Use this commant in terminal:
`npx playwright test tests/VisualTest.spec.ts \
  --project=chromium \
  --update-snapshots=all`

I installed these libraries to use excel file:
npm install xlsx
npm install --save-dev @types/node

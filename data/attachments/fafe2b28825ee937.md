# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: VisualTest.spec.ts >> Landing page visual test
- Location: tests/VisualTest.spec.ts:3:5

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/katalon-demo-cura/katalon-demo-cura/tests/VisualTest.spec.ts-snapshots/landing-page-webkit-linux.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "" [ref=e2] [cursor=pointer]:
    - /url: "#"
  - navigation [ref=e4]:
    - list [ref=e5]:
      - link "" [ref=e6] [cursor=pointer]:
        - /url: "#"
      - listitem [ref=e8]:
        - link "CURA Healthcare" [ref=e9]:
          - /url: ./
      - listitem [ref=e10]:
        - link "Home" [ref=e11]:
          - /url: ./
      - listitem [ref=e12]:
        - link "Login" [ref=e13]:
          - /url: profile.php#login
  - banner [ref=e14]:
    - generic [ref=e15]:
      - heading "CURA Healthcare Service" [level=1] [ref=e16]
      - heading "We Care About Your Health" [level=3] [ref=e17]
      - link "Make Appointment" [ref=e18] [cursor=pointer]:
        - /url: ./profile.php#login
  - contentinfo [ref=e19]:
    - generic [ref=e22]:
      - heading [level=4] [ref=e23]:
        - strong [ref=e24]: CURA Healthcare Service
      - paragraph [ref=e25]: Atlanta 550 Pharr Road NE Suite 525Atlanta, GA 30305
      - list [ref=e26]:
        - listitem [ref=e27]:
          - generic [ref=e28]: 
          - text: (678) 813-1KMS
        - listitem [ref=e29]:
          - generic [ref=e30]: 
          - link "info@katalon.com" [ref=e31]:
            - /url: mailto:info@katalon.com
      - list [ref=e32]:
        - listitem [ref=e33]:
          - link "" [ref=e34]:
            - /url: "#"
        - listitem [ref=e36]:
          - link "" [ref=e37]:
            - /url: "#"
        - listitem [ref=e39]:
          - link "" [ref=e40]:
            - /url: "#"
      - separator [ref=e42]
      - paragraph [ref=e43]: Copyright © CURA Healthcare Service 2026
    - text: 
```

# Test source

```ts
  1  | import { test, expect } from "../fixtures/BaseTest";
  2  | 
  3  | test("Landing page visual test", async ({ page, landingPage }, testInfo) => {
  4  |     // Mark a test with tags or dynamic description.
  5  |     testInfo.annotations.push({
  6  |         type: "category",
  7  |         description: "regression-test",
  8  |     });
  9  | 
  10 |     await landingPage.navigate();
  11 | 
  12 |     await expect(landingPage.h1).toHaveText("CURA Healthcare Service");
  13 | 
> 14 |     await expect(page).toHaveScreenshot("landing-page.png");
     |     ^ Error: A snapshot doesn't exist at /home/runner/work/katalon-demo-cura/katalon-demo-cura/tests/VisualTest.spec.ts-snapshots/landing-page-webkit-linux.png, writing actual.
  15 | });
  16 | 
```
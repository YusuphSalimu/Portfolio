import { expect, test } from "@playwright/test";

const routes = [
  "/en",
  "/sw",
  "/fr",
  "/en/projects",
  "/en/projects/hardware-stores",
];
const widths = [375, 390, 768, 1280];

for (const width of widths) {
  test.describe(`${width}px viewport`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of routes) {
      test(`${route} has no horizontal overflow and shows its heading`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator("h1").first()).toBeVisible();
        const dimensions = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }));
        expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
      });
    }
  });
}

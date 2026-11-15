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
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
          timeout: 90_000,
        });
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1").first()).toBeVisible();
        const dimensions = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }));
        expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);

        if (route === "/en") {
          await expect(page.locator("#projects .project-card h2")).toHaveText([
            "Zantan Company Website",
            "Zantan Mining Platform",
            "Ayaven Kids Events Hub",
            "Hardware Stores",
            "Tanzania Stock Price Prediction",
            "LeadPulse AI — B2B Lead Generation SaaS",
            "Farm Management System",
          ]);
          if (width < 760) {
            await expect(page.locator('input[name="email"]')).toHaveCSS("font-size", "16px");
            const toggle = page.locator(".mobile-menu-toggle");
            const menu = page.locator("#mobile-navigation");
            await toggle.click();
            await expect(toggle).toHaveAttribute("aria-expanded", "true");
            await expect(menu.locator("a").first()).toBeFocused();
            await expect(menu.locator(".language-trigger")).toBeVisible();
            await page.keyboard.press("Escape");
            await expect(toggle).toBeFocused();
            await expect(toggle).toHaveAttribute("aria-expanded", "false");
            await toggle.click();
            await page.locator(".mobile-navigation-backdrop").click({ position: { x: 10, y: 10 } });
            await expect(toggle).toHaveAttribute("aria-expanded", "false");
            await expect(toggle).toBeFocused();
          }
        }
      });
    }

    test("client gallery preserves the full screenshot and responsive columns", async ({ page }) => {
      await page.goto("/en/projects/zantan-company");
      const gallery = page.locator(".project-gallery");
      const columns = await gallery.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
      expect(columns).toBe(width <= 760 ? 1 : width <= 980 ? 2 : 3);
      await gallery.locator("button").first().click();
      await expect(page.locator(".lightbox__image img")).toHaveCSS("object-fit", "contain");
      await expect(page.getByRole("button", { name: "Close screenshot" })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(gallery.locator("button").first()).toBeFocused();
    });
  });
}

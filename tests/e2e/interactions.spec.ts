import { expect, test } from "@playwright/test";

test("all published projects can be filtered on the homepage", async ({ page }) => {
  await page.goto("/en");
  const projects = page.locator("#projects");
  await expect(projects.locator(".project-card")).toHaveCount(7);
  await projects.getByRole("button", { name: "Data & ML 1", exact: true }).click();
  await expect(projects.locator(".project-card h2")).toHaveText(["Tanzania Stock Price Prediction"]);
  await projects.getByRole("button", { name: "SaaS 1", exact: true }).click();
  await expect(projects.locator(".project-card")).toHaveCount(1);
  await projects.getByRole("button", { name: "All 7", exact: true }).click();
  await expect(projects.locator(".project-card")).toHaveCount(7);
  const heights = await projects.locator(".project-card").evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().height));
  expect(Math.max(...heights)).toBeLessThan(520);
});

test("service selector supports pointer and keyboard navigation", async ({ page }) => {
  await page.goto("/en");
  const tabs = page.getByRole("tab");
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Web platforms with authentication");
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Data cleaning");
  await page.keyboard.press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
});

for (const scheme of ["light", "dark"] as const) {
  test(`theme follows ${scheme} preference and preserves manual choice`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
    const other = scheme === "light" ? "dark" : "light";
    await page.getByRole("button", { name: `Switch to ${other} mode` }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", other);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", other);
    await page.emulateMedia({ colorScheme: scheme });
    await expect(page.locator("html")).toHaveAttribute("data-theme", other);
  });
}

test("theme follows system changes and still toggles when storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Storage blocked"); };
    Storage.prototype.setItem = () => { throw new Error("Storage blocked"); };
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("hero animates about its center and can be paused", async ({ page }) => {
  await page.goto("/en");
  const mark = page.locator(".hero-wordmark");
  await expect(mark).toHaveCSS("animation-name", "identity-turn");
  const firstTransform = await mark.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => mark.evaluate((element) => getComputedStyle(element).transform)).not.toBe(firstTransform);
  await page.getByRole("button", { name: "Pause hero animation" }).click();
  await expect(mark).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Resume hero animation" }).click();
  await expect(mark).toHaveCSS("animation-play-state", "running");
});

test("reduced motion disables automatic hero movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".hero-wordmark")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-gem")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".scene-control")).toBeDisabled();
});

test("command palette returns from a case study to a home section", async ({ page }) => {
  await page.goto("/en/projects/hardware-stores");
  await page.keyboard.press("Control+k");
  await page.getByRole("dialog").getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/en#about$/);
  await expect(page.locator("#about")).toBeInViewport();
});

test("Y favicons are discoverable and served in raster and vector formats", async ({ page, request }) => {
  await page.goto("/en");
  await expect(page.locator('link[rel="icon"][href="/favicon-96.png"]')).toHaveAttribute("sizes", "96x96");
  for (const path of ["/favicon.ico", "/favicon-96.png", "/apple-touch-icon.png", "/icon.svg"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeGreaterThan(100);
  }
});

for (const scheme of ["light", "dark"] as const) {
  test(`${scheme} text and form surfaces retain readable contrast`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/en");
    const ratios = await page.evaluate(() => {
      const luminance = (color: string) => {
        const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map((value) => {
          const channel = value / 255;
          return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      };
      return ["body", ".contact-form input", ".button--primary"].map((selector) => {
        const style = getComputedStyle(document.querySelector(selector)!);
        const fg = luminance(style.color), bg = luminance(style.backgroundColor);
        return (Math.max(fg, bg) + .05) / (Math.min(fg, bg) + .05);
      });
    });
    for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
}

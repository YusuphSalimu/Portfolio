import { expect, test } from "@playwright/test";

const pageErrors = new WeakMap<object, string[]>();
test("styled project dropdown validates, navigates and submits the selected value", async ({ page }) => {
  let submitted: Record<string, string> | undefined;
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({ json: { message: "Message received" } });
  });
  await page.goto("/en");
  const form = page.locator(".contact-form");
  await form.locator('[name="name"]').fill("Dropdown test");
  await form.locator('[name="email"]').fill("test@example.com");
  await form.locator('[name="message"]').fill("Testing the styled project dropdown without sending email.");
  const dropdown = form.getByRole("combobox", { name: "Project Type" });
  await form.locator('[type="submit"]').click();
  await expect(dropdown).toHaveAttribute("aria-invalid", "true");
  expect(submitted).toBeUndefined();
  await dropdown.press("ArrowDown");
  await dropdown.press("End");
  await dropdown.press("Enter");
  await expect(dropdown).toContainText("Other");
  await dropdown.click();
  await dropdown.press("Escape");
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
  await dropdown.click();
  await form.getByRole("option", { name: "Website", exact: true }).click();
  await expect(dropdown).toContainText("Website");
  await form.locator('[type="submit"]').click();
  await expect(form.getByRole("status")).toContainText("Message received");
  expect(submitted?.projectType).toBe("website");
  await expect(dropdown).toContainText("Choose a project type");
});

test("language picker supports dismissal and preserves the current page", async ({ page }) => {
  await page.goto("/en/projects?view=all#main-content");
  const picker = page.locator(".site-header .language-switcher");
  const trigger = picker.getByRole("button");
  await trigger.click();
  await expect(picker.getByRole("link", { name: "FR Français" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator("h1").click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await picker.getByRole("link", { name: "SW Kiswahili" }).click();
  await expect(page).toHaveURL(/\/sw\/projects\?view=all#main-content$/);
  await expect(page.locator(".site-header .language-trigger")).toContainText("SW");
});

test("service icons animate together and can be paused", async ({ page }) => {
  await page.goto("/en");
  const icons = page.locator(".service-tab__icon svg");
  await expect(icons).toHaveCount(4);
  for (const icon of await icons.all()) await expect(icon).toHaveCSS("animation-name", "service-turn");
  for (const tab of await page.getByRole("tab").all()) {
    await tab.click();
    await expect(page.getByRole("tabpanel").locator(".service-icon-plinth")).toHaveCSS("animation-name", "service-turn");
  }
  await page.getByRole("button", { name: "Pause icon animation" }).click();
  for (const icon of await icons.all()) await expect(icon).toHaveCSS("animation-play-state", "paused");
});

test("process plays in view, wraps manually and stops offscreen", async ({ page }) => {
  await page.goto("/en");
  const journey = page.locator(".process-journey");
  await journey.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(journey).toHaveAttribute("data-playing", "true");
  await expect(journey).toHaveAttribute("data-step", "build", { timeout: 8000 });
  await journey.getByRole("button", { name: "4. Support", exact: true }).click();
  await expect(journey).toHaveAttribute("data-playing", "false");
  await journey.getByRole("button", { name: "Next step" }).click();
  await expect(journey).toHaveAttribute("data-step", "discover");
  await journey.getByRole("button", { name: "Previous step" }).click();
  await expect(journey).toHaveAttribute("data-step", "support");
  await journey.getByRole("button", { name: "Play sequence" }).click();
  await expect(journey).toHaveAttribute("data-playing", "true");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(journey).toHaveAttribute("data-playing", "false");
});

test("reduced motion keeps the process manual and icons still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const journey = page.locator(".process-journey");
  await journey.scrollIntoViewIfNeeded();
  await expect(journey).toHaveAttribute("data-playing", "false");
  await expect(journey.locator(".motion-control")).toBeDisabled();
  await expect(page.locator(".services-explorer")).toHaveAttribute("data-paused", "true");
  await journey.getByRole("button", { name: "Next step" }).click();
  await expect(journey.getByRole("heading", { name: "Build", exact: true })).toBeVisible();
});

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page), "No runtime or hydration errors").toEqual([]);
});

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
    await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
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

test("hero animates without the removed pause button", async ({ page }) => {
  await page.goto("/en");
  const mark = page.locator(".hero-wordmark");
  await expect(mark).toHaveCSS("animation-name", "identity-turn");
  const firstTransform = await mark.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => mark.evaluate((element) => getComputedStyle(element).transform)).not.toBe(firstTransform);
  await expect(page.locator(".scene-control")).toHaveCount(0);
});

test("reduced motion disables automatic hero movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".hero-wordmark")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-gem")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".scene-control")).toHaveCount(0);
});

test("quick navigation is removed from case studies and homepage", async ({ page }) => {
  await page.goto("/en/projects/hardware-stores");
  await expect(page.locator(".palette-trigger, .command-dialog")).toHaveCount(0);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/en");
  await expect(page.locator(".palette-trigger, .command-dialog")).toHaveCount(0);
  await expect(page.locator(".contact-icon svg")).toHaveCount(4);
  await expect(page.locator(".service-tab__icon svg")).toHaveCount(4);
  await expect(page.locator("body")).not.toContainText("↗");
});

test("Y favicons are discoverable and served in raster and vector formats", async ({ page, request }) => {
  const documentResponse = await request.get("/en");
  const html = await documentResponse.text();
  expect(html.split("</head>")[0]).toContain('name="description"');
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

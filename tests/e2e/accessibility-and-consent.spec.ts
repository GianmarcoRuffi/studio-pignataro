import { expect, test, type Page } from "@playwright/test";

async function prepare(
  page: Page,
  status: "accepted" | "declined" | null = "declined",
  daysOld = 0
) {
  await page.addInitScript(
    ({ status, daysOld }) => {
      sessionStorage.setItem("splash-shown", "true");
      sessionStorage.setItem("siteVisited", "true");
      localStorage.clear();
      if (status) {
        localStorage.setItem("cookie-consent", status);
        localStorage.setItem(
          "cookie-consent-date",
          new Date(Date.now() - daysOld * 86400000).toISOString()
        );
      }
    },
    { status, daysOld }
  );
}

async function expectFocusInside(
  page: Page,
  dialog: ReturnType<Page["getByRole"]>
) {
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement))
      )
      .toBe(true);
  }
}

test("map requires consent and is removed when consent is revoked", async ({
  page,
}) => {
  await prepare(page);
  const mapRequests: string[] = [];
  await page.route("https://www.google.com/maps/**", (route) => {
    mapRequests.push(route.request().url());
    return route.fulfill({
      contentType: "text/html",
      body: "<html><body>Map</body></html>",
    });
  });
  await page.goto("/contacts");
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(mapRequests).toHaveLength(0);
  const preferences = page.getByRole("button", {
    name: "Preferenze cookie",
    exact: true,
  });
  await preferences.click();
  const dialog = page.getByRole("dialog", { name: "Utilizzo dei Cookie" });
  await expect(dialog).toBeVisible();
  await expectFocusInside(page, dialog);
  await dialog
    .getByRole("button", { name: "Accetta servizi facoltativi" })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(preferences).toBeFocused();
  await expect(page.locator("iframe")).toHaveCount(1);
  await page.locator("iframe").scrollIntoViewIfNeeded();
  await expect.poll(() => mapRequests.length).toBeGreaterThan(0);
  await preferences.click();
  await dialog
    .getByRole("button", { name: "Solo necessari", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(
    await page.evaluate(() => localStorage.getItem("cookie-consent"))
  ).toBe("declined");
});

test("expired consent does not load the map and requests a new choice", async ({
  page,
}) => {
  await prepare(page, "accepted", 366);
  await page.goto("/contacts");
  await expect(
    page.getByRole("dialog", { name: "Utilizzo dei Cookie" })
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(
    await page.evaluate(() => localStorage.getItem("cookie-consent"))
  ).toBe("declined");
});

test("clearing consent in another tab removes the map", async ({ page }) => {
  await prepare(page, "accepted");
  await page.route("https://www.google.com/maps/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "Map" })
  );
  await page.goto("/contacts");
  await expect(page.locator("iframe")).toHaveCount(1);
  const other = await page.context().newPage();
  await other.goto("/bio");
  await other.evaluate(() => localStorage.clear());
  await expect(page.locator("iframe")).toHaveCount(0);
  await other.close();
});

test("lightbox traps focus, locks internal scrolling and restores the trigger", async ({
  page,
}) => {
  await prepare(page);
  await page.goto("/projects/Via-Eroi-d-Italia");
  const trigger = page.getByRole("button", {
    name: "Visualizza immagine 1",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Visualizzatore immagini" });
  await expect(
    dialog.getByRole("button", { name: "Chiudi lightbox" })
  ).toBeFocused();
  await expectFocusInside(page, dialog);
  const container = page.locator("main.layout-content");
  await expect(container).toHaveCSS("overflow", "hidden");
  const scrollTop = await container.evaluate((element) => element.scrollTop);
  await dialog.hover();
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(200);
  expect(await container.evaluate((element) => element.scrollTop)).toBe(
    scrollTop
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(container).not.toHaveCSS("overflow", "hidden");
});

test("header reacts to the page container and navigation rebinds scrolling", async ({
  page,
}) => {
  await prepare(page);
  await page.goto("/");
  await expect(
    page.getByRole("region", { name: "Slider progetti" })
  ).toBeVisible();
  const mobile = (page.viewportSize()?.width ?? 1440) <= 1024;
  if (mobile) {
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await page
      .getByRole("dialog", { name: "Menu di navigazione" })
      .getByRole("link", { name: "Progetti", exact: true })
      .click();
  } else {
    await page
      .locator("header")
      .getByRole("link", { name: "Progetti", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/projects$/);
  const container = page.locator("main.layout-content");
  await expect(page.locator("article")).toHaveCount(6);
  await container.evaluate((element) => {
    element.scrollTop = 500;
  });
  await expect(page.locator("header")).toHaveClass(/scrolled/);
  await expect(
    page.getByRole("button", { name: "Preferenze cookie", exact: true })
  ).toBeVisible();
});

test("mobile menu supports focus trapping, Escape and link navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepare(page);
  await page.goto("/bio");
  const toggle = page.getByRole("button", { name: "Toggle menu" });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Menu di navigazione" });
  await expect(
    dialog.getByRole("button", { name: "Chiudi menu" })
  ).toBeFocused();
  await expectFocusInside(page, dialog);
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(dialog).not.toBeVisible();
  await toggle.click();
  await dialog.getByRole("link", { name: "Contatti", exact: true }).click();
  await expect(page).toHaveURL(/\/contacts$/);
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Contatti" })
  ).toBeVisible();
});

test("site works with localStorage and sessionStorage disabled", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const name of ["getItem", "setItem", "removeItem"]) {
      Object.defineProperty(Storage.prototype, name, {
        value() {
          throw new DOMException("Storage disabled", "SecurityError");
        },
      });
    }
  });
  await page.goto("/contacts");
  const dialog = page.getByRole("dialog", { name: "Utilizzo dei Cookie" });
  await expect(dialog).toBeVisible({ timeout: 15000 });
  await dialog
    .getByRole("button", { name: "Solo necessari", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Contatti", exact: true })
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Preferenze cookie", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("policy dates are editorial and contact addresses are consistent", async ({
  page,
}) => {
  await prepare(page);
  for (const path of ["/privacy-policy", "/cookie-policy"]) {
    await page.goto(path);
    await expect(page.locator("time")).toHaveAttribute(
      "datetime",
      "2026-10-23"
    );
    await expect(
      page.locator("main a[href='mailto:info@archpignataro.it']")
    ).toHaveCount(0);
    await expect(
      page.locator("main a[href='mailto:glpignataro@yahoo.it']").first()
    ).toBeVisible();
  }
});

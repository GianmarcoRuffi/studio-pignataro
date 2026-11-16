import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
});

for (const modal of ["lightbox", "menu"]) {
  test(`consent waits for the ${modal} to close`, async ({ page }) => {
    if (modal === "menu")
      await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/projects/Via-Asti");
    if (modal === "menu") {
      await page.getByRole("button", { name: "Toggle menu" }).click();
    } else {
      await page
        .getByRole("button", { name: "Visualizza immagine 1", exact: true })
        .click();
    }
    const active = page.getByRole("dialog", {
      name:
        modal === "menu" ? "Menu di navigazione" : "Visualizzatore immagini",
    });
    await expect(active).toBeVisible();
    await page.evaluate(() => {
      localStorage.clear();
      window.dispatchEvent(new StorageEvent("storage", { key: null }));
    });
    await page.waitForTimeout(700);
    await expect(page.locator("#cookie-consent-title")).toHaveCount(0);
    expect(await active.evaluate((e) => !!e.closest("[inert]"))).toBe(false);
    await page.keyboard.press("Escape");
    const consent = page.getByRole("dialog", { name: "Utilizzo dei Cookie" });
    await expect(consent).toBeVisible();
    expect(
      await consent.evaluate((e) => e.contains(document.activeElement))
    ).toBe(true);
    await page
      .getByRole("button", { name: "Solo necessari", exact: true })
      .click();
    await expect(consent).toHaveCount(0);
    await expect(page.locator("main")).not.toHaveCSS("overflow", "hidden");
  });
}

for (const path of ["bio", "contacts"]) {
  test(`${path} renders without downloading the original photograph`, async ({
    page,
  }) => {
    const originals: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.startsWith(`/site/${path}/`))
        originals.push(request.url());
    });
    await page.goto(`/${path}`);
    const photo = page.locator("main img").first();
    await expect(photo).toHaveCSS("opacity", "1");
    expect(
      await photo.evaluate(
        (e: HTMLImageElement) => e.complete && e.naturalWidth > 0
      )
    ).toBe(true);
    expect(originals).toEqual([]);
  });
}

test("a stalled cover does not block the next project batch", async ({
  page,
}) => {
  await page.route("**/_next/image?**", async (route) => {
    const source = new URL(route.request().url()).searchParams.get("url") ?? "";
    if (source.includes("/vico-v-via-san-giovanni/"))
      await new Promise(() => {});
    else await route.continue();
  });
  await page.goto("/projects");
  await expect(page.locator("main article")).toHaveCount(6);
  await page.locator("main").evaluate((e) => (e.scrollTop = e.scrollHeight));
  await expect(page.locator("main article")).toHaveCount(12, { timeout: 9000 });
});

test("lightbox keeps the previous photograph behind its loading message", async ({
  page,
}) => {
  await page.route("**/projects/via-asti/gallery/1.webp", async () => {
    await new Promise(() => {});
  });
  await page.goto("/projects/Via-Asti");
  await page
    .getByRole("button", { name: "Visualizza immagine 1", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Visualizzatore immagini" });
  await expect(dialog.locator("img").last()).toHaveCSS("opacity", "1");
  await page
    .getByRole("button", { name: "Immagine successiva", exact: true })
    .click();
  await expect(dialog.getByRole("status")).toBeVisible();
  await expect(dialog.getByRole("status")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)"
  );
  await expect(dialog.locator('img[aria-hidden="true"]')).toBeVisible();
});

test("publication filter ignores completion of the previous batch", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 600 });
  let release!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/_next/image?**", async (route) => {
    const source = new URL(route.request().url()).searchParams.get("url") ?? "";
    if (
      source.includes("youtrade-cover-1") ||
      source.includes("bravacasa-cover")
    )
      await held;
    await route.continue();
  });
  await page.goto("/presses");
  await expect(page.locator("main article")).toHaveCount(6);
  await page.locator("main").evaluate((e) => (e.scrollTop = e.scrollHeight));
  await expect(
    page.getByText("Caricamento pubblicazioni...", { exact: true })
  ).toBeVisible();
  await page.getByRole("button", { name: "2023", exact: true }).click();
  await expect(page.locator("main article")).toHaveCount(1);
  await page.getByRole("button", { name: "Tutti", exact: true }).click();
  await page.locator("main").evaluate((e) => (e.scrollTop = 0));
  await expect(page.locator("main article")).toHaveCount(6);
  release();
  await page.waitForTimeout(700);
  await expect(page.locator("main article")).toHaveCount(6);
});

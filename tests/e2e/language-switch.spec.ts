import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    sessionStorage.setItem("splash-shown", "true");
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
});

for (const width of [1440, 390]) {
  test(`flag switches the same project and English navigation persists at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/Quartiere-Vanchiglia");
    if (width <= 1024)
      await page.getByRole("button", { name: "Toggle menu" }).click();
    const english = page.locator('header a[hreflang="en"]:visible');
    await expect(english).toHaveAttribute(
      "href",
      "/en/projects/Quartiere-Vanchiglia"
    );
    await english.hover();
    await expect(
      page.getByRole("tooltip", { name: "English Version" })
    ).toBeVisible();
    await english.click();
    await expect(page).toHaveURL("/en/projects/Quartiere-Vanchiglia");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://archpignataro.it/en/projects/Quartiere-Vanchiglia"
    );
    await expect(page.locator('link[hreflang="it"]')).toHaveAttribute(
      "href",
      "https://archpignataro.it/projects/Quartiere-Vanchiglia"
    );
    await expect(
      page.getByRole("button", { name: "View image 1", exact: true })
    ).toBeVisible();
    await page
      .getByRole("button", { name: "View image 1", exact: true })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Image viewer" })
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await page.locator("main.layout-content").evaluate((el) => {
      el.scrollTop = 0;
    });
    if (width <= 1024)
      await page.getByRole("button", { name: "Toggle menu" }).click();
    const italian = page.locator('header a[hreflang="it"]:visible');
    await italian.hover();
    await expect(
      page.getByRole("tooltip", { name: "Versione Italiana" })
    ).toBeVisible();
    await italian.click();
    await expect(page).toHaveURL("/projects/Quartiere-Vanchiglia");
    await expect(page.locator("html")).toHaveAttribute("lang", "it");
  });
}

test("English pages retain language through links and isolate simultaneous locale requests", async ({
  page,
  request,
}) => {
  const [it, en] = await Promise.all([
    request.get("/contacts"),
    request.get("/en/contacts"),
  ]);
  expect(await it.text()).toContain('lang="it"');
  expect(await en.text()).toContain('lang="en"');
  await page.goto("/en/contacts");
  await expect(
    page.getByRole("heading", { level: 1, name: "Contacts", exact: true })
  ).toBeVisible();
  await page
    .locator("footer")
    .getByRole("link", { name: "Privacy Policy" })
    .click();
  await expect(page).toHaveURL("/en/privacy-policy");
  await expect(
    page.getByText("Information on the processing of personal data", {
      exact: true,
    })
  ).toBeVisible();
  await page.goto("/en/presses");
  await expect(
    page.getByRole("heading", { name: "Publications", exact: true })
  ).toBeVisible();
  await page.getByRole("button", { name: "2022", exact: true }).click();
  await expect(page.locator("main article")).toHaveCount(1);
  await page.goto("/en/no-such-page");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("main a").first()).toHaveAttribute("href", "/en");
});

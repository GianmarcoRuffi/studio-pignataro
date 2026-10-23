import { expect, test } from "@playwright/test";
import projects from "../../src/data/projectsData";

const prepareStorage = async (page: import("@playwright/test").Page) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("splash-shown", "true");
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
  });
};

test("internal pages publish their own canonical URL", async ({ request }) => {
  for (const path of [
    "/bio",
    "/contacts",
    "/projects",
    "/presses",
    "/privacy-policy",
    "/cookie-policy",
    "/projects/TangexCorp",
  ]) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    const html = await response.text();
    expect(html).toContain(
      `<link rel="canonical" href="https://archpignataro.it${path}"`
    );
    expect(html).toContain(
      `<meta property="og:url" content="https://archpignataro.it${path}"`
    );
  }
});

test("sitemap includes every generated project with its original slug", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  for (const project of projects) {
    expect(xml).toContain(
      `<loc>https://archpignataro.it/projects/${project.slug}</loc>`
    );
  }
  expect(xml.match(/<loc>/g)).toHaveLength(projects.length + 7);
});

test("reduced motion disables slider autoplay and hides inactive links from focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await prepareStorage(page);
  await page.goto("/");
  const active = page.locator("[class*='slide'][class*='active']").first();
  const link = active.locator("a");
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  await page.waitForTimeout(3500);
  await expect(active.locator("a")).toHaveAttribute("href", href!);
  await expect(page.locator("[inert] a")).toHaveCount(projects.length - 1);
  await page.getByRole("button", { name: "Slide successivo" }).click();
  await expect(active.locator("a")).not.toHaveAttribute("href", href!);
});

test("lightbox can retry an image after a temporary failure", async ({
  page,
}) => {
  await prepareStorage(page);
  let failImage = true;
  await page.route(
    "**/projects/via-vittorio-amedeo-ii/gallery/1.webp",
    (route) => (failImage ? route.abort() : route.continue())
  );
  await page.goto("/projects/Via-Vittorio-Amedeo-II");
  await page
    .getByRole("button", { name: "Visualizza immagine 1", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Immagine non disponibile")).toBeVisible();
  failImage = false;
  await dialog
    .getByRole("button", { name: "Riprova a caricare l'immagine" })
    .click();
  await expect(dialog.locator("img")).toBeVisible();
  await expect
    .poll(() =>
      dialog
        .locator("img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth)
    )
    .toBeGreaterThan(0);
});

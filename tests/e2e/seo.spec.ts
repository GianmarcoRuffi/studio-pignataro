import { expect, test } from "@playwright/test";
import projects from "../../src/data/projectsData";

for (const prefix of ["", "/en"]) {
  test(`SEO server content and reciprocal alternates ${prefix || "it"}`, async ({
    request,
  }) => {
    const titles = new Set<string>();
    for (const path of [
      "",
      "/bio",
      "/contacts",
      "/presses",
      "/projects",
      ...projects.map((p) => `/projects/${p.slug}`),
    ]) {
      const response = await request.get(`${prefix}${path}` || "/");
      expect(response.status()).toBe(200);
      const html = await response.text();
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      expect(canonical?.[1].replace(/\/$/, "")).toBe(
        `https://archpignataro.it${prefix}${path}`
      );
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
      expect(title).toBeTruthy();
      expect(titles.has(title!)).toBe(false);
      titles.add(title!);
      expect(html).toMatch(/hreflang="en"/i);
      expect(html).toContain('name="description"');
      expect(html).not.toContain('name="keywords"');
      const scripts = [
        ...html.matchAll(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
        ),
      ];
      expect(scripts.length).toBeGreaterThan(0);
      for (const script of scripts)
        expect(JSON.parse(script[1])["@context"]).toBe("https://schema.org");
    }
  });
  test(`complete indexes work without JavaScript ${prefix || "it"}`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
    });
    const page = await context.newPage();
    await page.goto(`${prefix}/projects`);
    await expect(page.locator("h1")).toBeVisible();
    await page.locator("details summary").click();
    for (const project of projects.filter((p) => !p.invisible)) {
      await expect(
        page.locator(`details a[href="${prefix}/projects/${project.slug}"]`)
      ).toBeVisible();
    }
    await page.goto(`${prefix}/presses`);
    await expect(page.locator("#monograph")).toBeVisible();
    await page.locator("details summary").click();
    await expect(page.locator("details li")).toHaveCount(8);
    await context.close();
  });
}

test("sitemap exposes images and no build timestamps", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const xml = await response.text();
  expect(response.status()).toBe(200);
  expect(xml.match(/<loc>/g)).toHaveLength((projects.length + 7) * 2);
  expect(xml).toContain("<image:loc>");
  expect(xml).not.toContain("<lastmod>");
  expect(xml).not.toContain("<priority>");
  expect(xml).toContain('hreflang="x-default"');
});

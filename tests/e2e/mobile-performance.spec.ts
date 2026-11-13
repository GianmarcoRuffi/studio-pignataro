import { expect, test } from "@playwright/test";
import { statSync } from "node:fs";
import path from "node:path";

test("slider loads only adjacent responsive covers and reduces mobile image bytes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    sessionStorage.setItem("splash-shown", "true");
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
  const downloads = new Map<
    string,
    Promise<{ source: string; bytes: number }>
  >();
  const rawCovers: string[] = [];
  page.on("request", (request) => {
    if (/\/projects\/.*\/cover\.webp$/.test(request.url()))
      rawCovers.push(request.url());
  });
  page.on("response", (response) => {
    const url = new URL(response.url());
    const source = url.searchParams.get("url");
    if (url.pathname === "/_next/image" && source?.endsWith("/cover.webp")) {
      downloads.set(
        source,
        response.body().then((body) => ({ source, bytes: body.byteLength }))
      );
    }
  });
  await page.goto("/");
  const slider = page.getByRole("region", { name: "Slider progetti" });
  await expect
    .poll(() =>
      slider
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0
          )
        )
    )
    .toBe(true);
  const results = await Promise.all(downloads.values());
  expect(results.length).toBeGreaterThan(0);
  expect(results.length).toBeLessThanOrEqual(3);
  expect(rawCovers).toHaveLength(0);
  const originalBytes = results.reduce(
    (sum, result) =>
      sum + statSync(path.join(process.cwd(), "public", result.source)).size,
    0
  );
  const optimizedBytes = results.reduce((sum, result) => sum + result.bytes, 0);
  expect(optimizedBytes).toBeLessThan(originalBytes);
  test.info().annotations.push({
    type: "mobile-image-bytes",
    description: JSON.stringify({
      originalBytes,
      optimizedBytes,
      covers: results.length,
    }),
  });
  await page.getByRole("button", { name: "Slide successivo" }).click();
  await expect(
    page.locator("[class*='slide'][class*='active'] a")
  ).toHaveAttribute("href", "/projects/Via-Venturoli");
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`touch carousel follows the finger and preserves taps with ${reducedMotion}`, async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion });
    await page.addInitScript(() => {
      sessionStorage.setItem("splash-shown", "true");
      sessionStorage.setItem("siteVisited", "true");
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("cookie-consent-date", new Date().toISOString());
    });
    await page.goto("/");
    const active = page.locator("[class*='slide'][class*='active'] a");
    await expect(active).toBeVisible();
    const original = await active.getAttribute("href");
    const client = await context.newCDPSession(page);
    const touch = async (
      type: "touchStart" | "touchMove" | "touchEnd",
      x = 0
    ) => {
      await client.send("Input.dispatchTouchEvent", {
        type,
        touchPoints: type === "touchEnd" ? [] : [{ x, y: 350 }],
      });
    };
    await touch("touchStart", 300);
    await touch("touchMove", 260);
    await touch("touchMove", 120);
    await expect
      .poll(() => active.evaluate((el) => el.getBoundingClientRect().x))
      .toBeLessThan(-100);
    await touch("touchEnd");
    await expect(active).toHaveAttribute("href", "/projects/Via-Venturoli");
    await expect(page).toHaveURL(/\/$/);
    await touch("touchStart", 120);
    await touch("touchMove", 160);
    await touch("touchMove", 300);
    await touch("touchEnd");
    await expect(active).toHaveAttribute("href", original!);
    await touch("touchStart", 200);
    await touch("touchMove", 220);
    await touch("touchEnd");
    await expect(active).toHaveAttribute("href", original!);
    await expect
      .poll(() =>
        active.evaluate((el) => Math.round(el.getBoundingClientRect().x))
      )
      .toBe(0);
    await active.click();
    await expect(page).toHaveURL(original!);
  });
}

test("carousel autoplay slides horizontally and theme stays light", async ({
  page,
}) => {
  await page.emulateMedia({
    reducedMotion: "no-preference",
    colorScheme: "dark",
  });
  await page.addInitScript(() => {
    sessionStorage.setItem("splash-shown", "true");
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light only");
  const first = page.locator("[class*='slide'][class*='active']");
  await expect(first.locator("a")).toHaveAttribute(
    "href",
    "/projects/Quartiere-Vanchiglia"
  );
  await expect
    .poll(() => first.evaluate((el) => el.getBoundingClientRect().x), {
      intervals: [25],
      timeout: 10000,
    })
    .toBeLessThan(-5);
  await expect(first.locator("a")).toHaveAttribute(
    "href",
    "/projects/Via-Venturoli"
  );
});

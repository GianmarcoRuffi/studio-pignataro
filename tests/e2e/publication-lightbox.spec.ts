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
  for (const locale of ["it", "en"]) {
    test(`publication opens and zooms in the page at ${width}px in ${locale}`, async ({
      page,
      context,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale === "it" ? "/presses" : "/en/presses");
      const trigger = page.locator("main article button").first();
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveCSS("touch-action", "auto");
      const image = dialog.locator("img");
      const increase = dialog.getByRole("button", {
        name: locale === "it" ? "Ingrandisci" : "Zoom in",
        exact: true,
      });
      await expect(increase).toBeEnabled();
      const before = await image.boundingBox();
      const original = await image.evaluate((el: HTMLImageElement) => ({
        width: el.naturalWidth,
        height: el.naturalHeight,
        src: el.getAttribute("src"),
      }));
      expect(before!.width / before!.height).toBeCloseTo(
        original.width / original.height,
        2
      );
      expect(before!.width).toBeLessThanOrEqual(original.width + 1);
      await expect(image).toHaveCSS("image-rendering", "auto");
      await expect(image).toHaveCSS("filter", "none");
      expect(new URL(original.src!, page.url()).pathname).toMatch(
        /^\/publications\/covers\//
      );
      // Click the image itself to display the original at its native resolution.
      await image.click();
      const after = await image.boundingBox();
      expect(after!.width).toBeGreaterThan(before!.width);
      expect(after!.width).toBeCloseTo(original.width, 0);
      expect(after!.height).toBeCloseTo(original.height, 0);
      const viewport = dialog.getByRole("region");
      expect(await viewport.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
      expect(
        await viewport.evaluate(
          (el) =>
            el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
        )
      ).toBe(true);
      await viewport.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        el.scrollLeft = el.scrollWidth;
      });
      const decrease = dialog.getByRole("button", {
        name: locale === "it" ? "Riduci" : "Zoom out",
        exact: true,
      });
      await decrease.press("Space");
      await expect(
        dialog.getByRole("button", {
          name: locale === "it" ? "Ingrandisci" : "Zoom in",
          exact: true,
        })
      ).toBeVisible();
      const restored = await image.boundingBox();
      expect(restored!.width).toBeCloseTo(before!.width, 0);
      expect(context.pages()).toHaveLength(1);
      await dialog
        .getByRole("button", {
          name: locale === "it" ? "Chiudi lightbox" : "Close lightbox",
          exact: true,
        })
        .click();
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      await trigger.click();
      await expect(
        page.getByRole("dialog").getByRole("button", {
          name: locale === "it" ? "Ingrandisci" : "Zoom in",
          exact: true,
        })
      ).toHaveAttribute("aria-pressed", "false");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(trigger).toBeFocused();
      // External article links retain their separate action.
      await page.getByRole("button", { name: "2022", exact: true }).click();
      await expect(page.locator("main article a").first()).toHaveAttribute(
        "target",
        "_blank"
      );
    });
  }
}

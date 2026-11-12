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
      const image = dialog.locator("img");
      const increase = dialog.getByRole("button", {
        name: locale === "it" ? "Ingrandisci" : "Zoom in",
        exact: true,
      });
      const decrease = dialog.getByRole("button", {
        name: locale === "it" ? "Riduci" : "Zoom out",
        exact: true,
      });
      await expect(increase).toBeEnabled();
      const before = await image.boundingBox();
      for (let i = 0; i < 4; i++) await increase.click();
      await expect(dialog.locator("output")).toHaveText("300%");
      await expect(increase).toBeDisabled();
      const after = await image.boundingBox();
      expect(after!.width).toBeGreaterThan(before!.width * 2.9);
      const viewport = dialog.getByRole("region");
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
      for (let i = 0; i < 4; i++) await decrease.click();
      await expect(decrease).toBeDisabled();
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
      await expect(page.getByRole("dialog").locator("output")).toHaveText(
        "100%"
      );
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

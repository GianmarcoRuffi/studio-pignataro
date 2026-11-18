import { devices, expect, test } from "@playwright/test";

test.use({ ...devices["Pixel 7"], reducedMotion: "reduce" });

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.addInitScript(() => {
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
});

for (const { name, path, trigger } of [
  {
    name: "project photograph",
    path: "/projects/Via-Asti",
    trigger: "gallery",
  },
  { name: "publication cover", path: "/presses", trigger: "publication" },
]) {
  test(`mobile ${name} fills the available width and supports tap and pinch zoom`, async ({
    page,
    context,
  }) => {
    await page.goto(path);
    const thumbnail =
      trigger === "gallery"
        ? page.getByRole("button", {
            name: "Visualizza immagine 1",
            exact: true,
          })
        : page.locator("main article button").first();
    await thumbnail.tap();
    const dialog = page.getByRole("dialog");
    const image = dialog.getByRole("img");
    const zoomIn = dialog.getByRole("button", {
      name: "Ingrandisci",
      exact: true,
    });
    const zoomOut = dialog.getByRole("button", { name: "Riduci", exact: true });
    const viewport = dialog.getByRole("region");
    const close = dialog.getByRole("button", { name: "Chiudi lightbox" });

    await expect(zoomIn).toBeEnabled();
    const fitted = (await image.boundingBox())!;
    const aspectRatio = await image.evaluate(
      (el: HTMLImageElement) => el.naturalWidth / el.naturalHeight
    );
    expect(fitted.width).toBeGreaterThan(370);
    expect(fitted.width / fitted.height).toBeCloseTo(aspectRatio, 2);

    // Spread two real touch points without zooming the page or moving the controls.
    const client = await context.newCDPSession(page);
    const centerX = fitted.x + fitted.width / 2;
    const centerY = fitted.y + fitted.height / 2;
    const fingers = (radius: number) => [
      { id: 0, x: centerX - radius, y: centerY },
      { id: 1, x: centerX + radius, y: centerY },
    ];
    const closePosition = await close.boundingBox();
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: fingers(30),
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: fingers(60),
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect(zoomOut).toBeEnabled();
    await expect
      .poll(async () => (await image.boundingBox())!.width)
      .toBeCloseTo(fitted.width * 2, 0);
    expect(await viewport.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    expect(await page.evaluate(() => visualViewport?.scale)).toBe(1);
    expect(await close.boundingBox()).toEqual(closePosition);

    // A single-finger drag pans the enlarged photo, then tapping restores the fit.
    const scrollBefore = await viewport.evaluate((el) => el.scrollLeft);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: centerX, y: centerY }],
    });
    for (const offset of [30, 60, 90]) {
      await client.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: centerX - offset, y: centerY }],
      });
    }
    await client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect
      .poll(() => viewport.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(scrollBefore);
    await image.tap();
    await expect(zoomIn).toBeEnabled();
    expect((await image.boundingBox())!.width).toBeCloseTo(fitted.width, 0);

    await image.tap();
    await expect(zoomOut).toBeEnabled();
    if (trigger === "gallery") {
      await dialog.getByRole("button", { name: "Immagine successiva" }).tap();
      await expect(zoomIn).toBeEnabled();
      await expect(image).toHaveAttribute("src", /\/gallery\/1\.webp$/);
    }

    await close.tap();
    await expect(dialog).toHaveCount(0);
    await expect(thumbnail).toBeFocused();
  });
}

test("mobile landscape fits the full photograph between the controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/projects/Via-Asti");
  await page
    .getByRole("button", { name: "Visualizza immagine 1", exact: true })
    .tap();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("button", { name: "Ingrandisci", exact: true })
  ).toBeEnabled();
  const image = (await dialog.getByRole("img").boundingBox())!;
  const close = (await dialog
    .getByRole("button", { name: "Chiudi lightbox" })
    .boundingBox())!;
  const next = (await dialog
    .getByRole("button", { name: "Immagine successiva" })
    .boundingBox())!;
  expect(image.height).toBeGreaterThan(260);
  expect(image.y).toBeGreaterThanOrEqual(close.y + close.height);
  expect(image.y + image.height).toBeLessThanOrEqual(next.y);
});

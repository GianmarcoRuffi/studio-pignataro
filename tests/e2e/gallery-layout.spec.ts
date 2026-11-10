import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    sessionStorage.setItem("splash-shown", "true");
    sessionStorage.setItem("siteVisited", "true");
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
  });
});

const imageButtons = (page: Page) =>
  page.getByRole("button", { name: /^Visualizza immagine \d+$/ });

async function galleryGeometry(page: Page) {
  return page.locator("[class*='masonryContainer']").evaluate((container) => {
    const origin = container.getBoundingClientRect();
    return {
      width: origin.width,
      frames: Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          "button[aria-label^='Visualizza immagine ']"
        )
      )
        .slice(0, 6)
        .map((button) => {
          const box = button.getBoundingClientRect();
          const image = button.querySelector("img")!;
          return {
            left: box.left - origin.left,
            top: box.top - origin.top,
            width: box.width,
            height: box.height,
            naturalRatio: image.naturalWidth / image.naturalHeight,
            ready: image.complete && image.naturalWidth > 0,
          };
        }),
    };
  });
}

async function expectAlignedGallery(page: Page, mobile: boolean) {
  await expect(async () => {
    const { width, frames } = await galleryGeometry(page);
    expect(frames).toHaveLength(6);
    const rows: (typeof frames)[] = [];
    for (const frame of frames) {
      expect(frame.ready).toBe(true);
      expect(frame.width).toBeGreaterThan(0);
      expect(frame.height).toBeGreaterThan(0);
      expect(
        Math.abs(frame.width / frame.height - frame.naturalRatio)
      ).toBeLessThan(0.02);
      const previousRow = rows.at(-1);
      if (previousRow && Math.abs(previousRow[0].top - frame.top) < 2) {
        previousRow.push(frame);
      } else {
        rows.push([frame]);
      }
    }
    for (const [rowIndex, row] of rows.entries()) {
      expect(Math.abs(row[0].left)).toBeLessThan(2);
      for (const [index, frame] of row.entries()) {
        expect(Math.abs(frame.height - row[0].height)).toBeLessThan(2);
        expect(frame.left + frame.width).toBeLessThanOrEqual(width + 2);
        if (index > 0) {
          const previous = row[index - 1];
          expect(
            Math.abs(frame.left - previous.left - previous.width - 16)
          ).toBeLessThan(2);
        }
      }
      if (rowIndex > 0) {
        const previous = rows[rowIndex - 1][0];
        expect(
          Math.abs(row[0].top - previous.top - previous.height - 16)
        ).toBeLessThan(2);
      }
      if (mobile) {
        expect(row).toHaveLength(1);
        expect(Math.abs(row[0].width - width)).toBeLessThan(2);
      } else {
        // These six frames precede further batches, so every row must be full.
        const rowEnd = row.at(-1)!;
        expect(Math.abs(rowEnd.left + rowEnd.width - width)).toBeLessThan(2);
      }
    }
    if (!mobile) {
      expect(rows.some((row) => row.length > 1)).toBe(true);
      const firstRowEnd = rows[0].at(-1)!;
      expect(
        Math.abs(firstRowEnd.left + firstRowEnd.width - width)
      ).toBeLessThan(2);
    }
  }).toPass({ timeout: 10_000 });
}

for (const width of [1440, 900, 390]) {
  test(`gallery aligns complete photographs at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 700 });
    await page.goto("/projects/Via-Asti");
    await expect(imageButtons(page).first()).toBeVisible();
    await expectAlignedGallery(page, width <= 768);
  });
}

test("gallery keeps previous frames stable when another batch loads and adapts on resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/projects/Quartiere-Vanchiglia");
  await expect(imageButtons(page)).toHaveCount(6);
  await expectAlignedGallery(page, false);
  const before = await galleryGeometry(page);
  await page.locator("main.layout-content").evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect.poll(() => imageButtons(page).count()).toBeGreaterThan(6);
  const loadedCount = await imageButtons(page).count();
  const after = await galleryGeometry(page);
  for (const [index, frame] of before.frames.entries()) {
    for (const key of ["left", "top", "width", "height"] as const) {
      expect(Math.abs(after.frames[index][key] - frame[key])).toBeLessThan(2);
    }
  }
  await page.setViewportSize({ width: 900, height: 700 });
  await expectAlignedGallery(page, false);
  // Resizing near the sentinel may legitimately reveal another batch.
  await expect
    .poll(() => imageButtons(page).count())
    .toBeGreaterThanOrEqual(loadedCount);
  await page.setViewportSize({ width: 390, height: 700 });
  await expectAlignedGallery(page, true);
  await expect
    .poll(() => imageButtons(page).count())
    .toBeGreaterThanOrEqual(loadedCount);
});

for (const width of [1440, 390]) {
  test(`publications share image and text alignment at ${width}px including after filtering`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/presses");
    await expect(page.locator("main article").first()).toBeVisible();
    await expect
      .poll(async () => {
        await page.locator("main.layout-content").evaluate((element) => {
          element.scrollTop = element.scrollHeight;
        });
        return page.locator("main article").count();
      })
      .toBe(8);
    const frames = await page.locator("main article").evaluateAll((articles) =>
      articles.map((article) => {
        const origin = article.getBoundingClientRect();
        const button = article.querySelector("button")!;
        const image = button.querySelector("img")!;
        const box = button.getBoundingClientRect();
        const title = article.querySelector("h3")!.getBoundingClientRect();
        return {
          left: box.left - origin.left,
          top: box.top - origin.top,
          width: box.width,
          height: box.height,
          titleLeft: title.left - origin.left,
          titleTop: title.top - origin.top,
          fit: getComputedStyle(image).objectFit,
        };
      })
    );
    for (const frame of frames) {
      expect(frame.fit).toBe("contain");
      expect(Math.abs(frame.width / frame.height - 16 / 9)).toBeLessThan(0.01);
      for (const key of [
        "left",
        "top",
        "width",
        "height",
        "titleLeft",
        "titleTop",
      ] as const) {
        expect(Math.abs(frame[key] - frames[0][key])).toBeLessThan(2);
      }
      if (width <= 768) {
        expect(frame.titleTop).toBeGreaterThan(frame.height);
      } else {
        expect(frame.titleLeft).toBeGreaterThan(frame.width);
      }
    }
    await page.getByRole("button", { name: "2022", exact: true }).click();
    await expect(page.locator("main article")).toHaveCount(1);
    const filteredFrame = await page
      .locator("main article button")
      .boundingBox();
    expect(filteredFrame).not.toBeNull();
    expect(Math.abs(filteredFrame!.width - frames[0].width)).toBeLessThan(2);
    expect(Math.abs(filteredFrame!.height - frames[0].height)).toBeLessThan(2);
  });
}

test("the odd final gallery image preserves the animated GIF source", async ({
  page,
}) => {
  await page.goto("/projects/Glisbo");
  await expect(imageButtons(page)).toHaveCount(5);
  const image = page
    .getByRole("button", { name: "Visualizza immagine 5", exact: true })
    .locator("img");
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveJSProperty(
    "src",
    new URL("/projects/glisbo/gallery/render.gif", page.url()).href
  );
  await expect
    .poll(() =>
      image.evaluate((element) => (element as HTMLImageElement).naturalWidth)
    )
    .toBeGreaterThan(0);
});

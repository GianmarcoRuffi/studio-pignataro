import { expect, test, type Page, type Route } from "@playwright/test";

const IMAGE_DELAY_MS = 700;

const slowImageResponses = async (page: Page) => {
  await page.route(
    /(_next\/image|\.(?:webp|jpg|jpeg|png|avif))(?:\?.*)?$/i,
    async (route: Route) => {
      if (route.request().url().includes("/branding/logo")) {
        await route.continue();
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, IMAGE_DELAY_MS));
      await route.continue();
    }
  );
};

const openPageWithoutIntroOverlays = async (page: Page, path: string) => {
  await page.goto(path, { waitUntil: "domcontentloaded" });

  await page.evaluate(() => {
    window.sessionStorage.setItem("splash-shown", "true");
    window.sessionStorage.setItem("siteVisited", "true");
    window.localStorage.setItem("cookie-consent", "accepted");
    window.localStorage.setItem(
      "cookie-consent-date",
      new Date().toISOString()
    );
  });

  await page.reload({ waitUntil: "domcontentloaded" });
};

test.describe("smooth scrolling and skeleton loading", () => {
  test("single project gallery shows visible skeletons without abrupt card pop-in", async ({
    page,
  }) => {
    await slowImageResponses(page);
    await openPageWithoutIntroOverlays(page, "/projects/Via-Eroi-d-Italia");

    const initialSkeleton = page
      .locator("[class*='galleryGrid'] [class*='imageSkeleton']")
      .first();
    await expect(initialSkeleton).toBeVisible({ timeout: 10_000 });

    const initialOpacity = await initialSkeleton.evaluate(
      (element) => Number(window.getComputedStyle(element).opacity)
    );
    expect(initialOpacity).toBeGreaterThan(0.95);

    await expect(
      page.locator("[class*='masonryContainer'] [class*='imageWrapper']")
    ).toHaveCount(6, { timeout: 15_000 });

    const container = page.locator("main.layout-content");
    await container.evaluate((element) => {
      const node = element as HTMLElement;
      node.scrollTop = node.scrollHeight;
    });

    const sawMasonrySkeleton = await page.evaluate(async () => {
      const selector = "[class*='masonryContainer'] [class*='imageSkeleton']";
      const deadline = window.performance.now() + 4000;

      while (window.performance.now() < deadline) {
        const skeleton = document.querySelector(selector);

        if (skeleton instanceof HTMLElement) {
          const styles = window.getComputedStyle(skeleton);
          const isVisible =
            styles.display !== "none" &&
            styles.visibility !== "hidden" &&
            Number(styles.opacity) > 0.1;

          if (isVisible) {
            return true;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      return false;
    });

    expect(sawMasonrySkeleton).toBe(true);

    await expect(
      page.locator("[class*='masonryContainer'] [class*='imageWrapper']")
    ).toHaveCount(8, { timeout: 10_000 });
  });

  test("homepage keeps the hero slider visible", async ({ page }) => {
    await openPageWithoutIntroOverlays(page, "/");

    const slider = page.locator("[class*='slider']").first();
    await expect(slider).toBeVisible();

    const sliderHeight = await slider.evaluate(
      (element) => (element as HTMLElement).clientHeight
    );
    expect(sliderHeight).toBeGreaterThan(300);

    await expect(
      page.locator("[class*='slide'][class*='active'] img").first()
    ).toBeVisible();
  });

  test("internal pages smooth-scroll the layout container", async ({ page }) => {
    await openPageWithoutIntroOverlays(page, "/projects");

    const container = page.locator("main.layout-content");
    await expect(container).toBeVisible();

    await expect.poll(async () => {
      const className = await container.getAttribute("class");
      return className?.includes("lenis") ?? false;
    }).toBe(true);

    await container.hover();
    await page.mouse.wheel(0, 1600);

    const immediateScrollTop = await container.evaluate(
      (element) => (element as HTMLElement).scrollTop
    );

    await page.waitForTimeout(180);

    const animatedScrollTop = await container.evaluate(
      (element) => (element as HTMLElement).scrollTop
    );

    expect(immediateScrollTop).toBeGreaterThanOrEqual(0);
    expect(animatedScrollTop).toBeGreaterThan(immediateScrollTop);
  });

  test("projects keep skeletons visible before cards resolve", async ({ page }) => {
    await slowImageResponses(page);
    await openPageWithoutIntroOverlays(page, "/projects");

    const batchSkeleton = page.locator("[class*='cardSkeleton']").first();
    await expect(batchSkeleton).toBeVisible();

    const batchOpacity = await batchSkeleton.evaluate(
      (element) => Number(window.getComputedStyle(element).opacity)
    );

    expect(batchOpacity).toBeGreaterThan(0.95);

    const firstCard = page.locator("article[class*='projectCard']").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    const imageSkeleton = firstCard.locator("[class*='imageSkeleton']");
    await expect(imageSkeleton).toBeVisible();

    const skeletonOpacity = await imageSkeleton.evaluate(
      (element) => Number(window.getComputedStyle(element).opacity)
    );

    expect(skeletonOpacity).toBeGreaterThan(0.95);

    await page.waitForTimeout(120);

    const opacityDuringMinimumWindow = await imageSkeleton.evaluate(
      (element) => Number(window.getComputedStyle(element).opacity)
    );

    expect(opacityDuringMinimumWindow).toBeGreaterThan(0.1);
  });

  test("scroll load-more shows visible project skeletons", async ({ page }) => {
    await slowImageResponses(page);
    await openPageWithoutIntroOverlays(page, "/projects");

    const container = page.locator("main.layout-content");
    await expect(
      page.locator("article[class*='projectCard']")
    ).toHaveCount(6, { timeout: 15_000 });

    await container.evaluate((element) => {
      const node = element as HTMLElement;
      node.scrollTop = node.scrollHeight;
    });

    const sawLoadMoreSkeleton = await page.evaluate(async () => {
      const selector =
        "[class*='loadMoreSection'] [class*='skeletonPlaceholder']";
      const deadline = window.performance.now() + 4000;

      while (window.performance.now() < deadline) {
        const skeleton = document.querySelector(selector);

        if (skeleton instanceof HTMLElement) {
          const styles = window.getComputedStyle(skeleton);
          const isVisible =
            styles.display !== "none" &&
            styles.visibility !== "hidden" &&
            Number(styles.opacity) > 0.1;

          if (isVisible) {
            return true;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      return false;
    });

    expect(sawLoadMoreSkeleton).toBe(true);

    await expect.poll(async () => {
      return page.locator("article[class*='projectCard']").count();
    }).toBeGreaterThan(6);
  });

  test("scroll-up button resets the page container", async ({ page }) => {
    await openPageWithoutIntroOverlays(page, "/projects");

    const container = page.locator("main.layout-content");
    await expect(container).toBeVisible();

    await container.evaluate((element) => {
      (element as HTMLElement).scrollTop = 1600;
    });

    const scrollUpButton = page.getByRole("button", {
      name: "Scroll to top",
    });
    await expect(scrollUpButton).toBeVisible();

    await scrollUpButton.click();

    await expect.poll(async () => {
      return container.evaluate((element) =>
        Math.round((element as HTMLElement).scrollTop)
      );
    }).toBeLessThan(20);

    const windowScrollTop = await page.evaluate(() => window.scrollY);
    expect(windowScrollTop).toBe(0);
  });
});
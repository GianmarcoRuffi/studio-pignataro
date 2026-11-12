import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import projects from "../../src/data/projectsData";
import { sharedContactsData } from "../../src/data/contactsData";

test("all project photographs are included and the carousel cover opens each gallery", () => {
  const digest = (source: string) =>
    createHash("sha256")
      .update(readFileSync(path.join(process.cwd(), "public", source)))
      .digest("hex");

  for (const project of projects) {
    const galleryHashes = project.images.map(digest);
    expect(galleryHashes[0], project.slug).toBe(digest(project.imgSrc));
    expect(new Set(galleryHashes).size, project.slug).toBe(
      project.images.length
    );
    const folder = path.posix.join(
      path.posix.dirname(project.imgSrc),
      "gallery"
    );
    for (const filename of readdirSync(path.join("public", folder))) {
      if (!/\.(webp|gif|png|jpe?g)$/i.test(filename)) continue;
      expect(galleryHashes, `${project.slug}: ${filename}`).toContain(
        digest(path.posix.join(folder, filename))
      );
    }
  }
});

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
  test(`homepage identifies the active project above the footer at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const slider = page.getByRole("region", { name: "Slider progetti" });
    for (const index of [0, 1]) {
      const project = projects[index];
      const caption = slider.locator("a").filter({
        hasText: project.projectName,
      });
      await expect(caption).toBeInViewport();
      await expect(caption).toHaveAttribute(
        "href",
        `/projects/${project.slug}`
      );
      await expect(
        slider.getByText(
          new RegExp(`^0?${index + 1}\\s*/\\s*${projects.length}$`)
        )
      ).toBeInViewport();
      const titleBox = await caption.boundingBox();
      const footerBox = await page.locator("footer").boundingBox();
      expect(titleBox).not.toBeNull();
      expect(footerBox).not.toBeNull();
      expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(footerBox!.y);
      if (index === 0) {
        await page.getByRole("button", { name: "Slide successivo" }).click();
      }
    }
    expect(
      await page.locator("main.layout-content").evaluate((element) => {
        return element.scrollHeight <= element.clientHeight + 1;
      })
    ).toBe(true);
  });

  test(`contact links are available without scrolling at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/contacts");
    const main = page.locator("main");
    await expect(
      main.locator(`a[href='${sharedContactsData.email.mailto}']`)
    ).toBeInViewport();
    for (const number of Object.values(sharedContactsData.phone)) {
      const phone = main.locator(`a[href^='tel:'][href$='${number}']`);
      await expect(phone).toBeInViewport();
    }
    await expect(page.locator("iframe")).toHaveCount(0);
  });
}

test("publication year filters include and exclude the monograph", async ({
  page,
}) => {
  await page.goto("/presses");
  const monograph = page.locator("main article").filter({
    hasText: "30 anni di inconsuetudine",
  });
  await expect(monograph).toHaveCount(1);
  await page.getByRole("button", { name: "2022", exact: true }).click();
  await expect(monograph).toHaveCount(0);
  await expect(page.locator("main article")).toHaveCount(1);
  await expect(page.locator("main article")).toContainText("TUBES");
  await page.getByRole("button", { name: "2023", exact: true }).click();
  await expect(monograph).toHaveCount(1);
  await expect(page.locator("main article")).toHaveCount(1);
  await page.getByRole("button", { name: "Tutti", exact: true }).click();
  await expect(monograph).toHaveCount(1);
  await expect
    .poll(() => page.locator("main article").count())
    .toBeGreaterThan(1);
});

test("gallery reading order matches the image opened in the lightbox", async ({
  page,
}) => {
  const project = projects[0];
  await page.goto(`/projects/${project.slug}`);
  const triggers = page.getByRole("button", {
    name: /^Visualizza immagine \d+$/,
  });
  await expect(triggers).toHaveCount(6);
  expect(
    await triggers.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("aria-label"))
    )
  ).toEqual(
    Array.from({ length: 6 }, (_, index) => `Visualizza immagine ${index + 1}`)
  );
  const trigger = page.getByRole("button", {
    name: "Visualizza immagine 3",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Visualizzatore immagini" });
  const image = dialog.getByRole("img", {
    name: `Immagine 3 di ${project.images.length}`,
    exact: true,
  });
  await expect(image).toHaveJSProperty(
    "src",
    new URL(project.images[2], page.url()).href
  );
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

for (const width of [1440, 390]) {
  test(`project opens with a noninteractive photograph before its gallery at ${width}px`, async ({
    page,
  }) => {
    const project = projects[0];
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/projects/${project.slug}`);
    const hero = page.locator("[data-project-hero]");
    const image = hero.locator("img");
    await expect(image).toBeVisible();
    const previous = hero.getByRole("link", {
      name: `Progetto precedente: ${projects.at(-1)!.projectName}`,
    });
    const next = hero.getByRole("link", {
      name: `Progetto successivo: ${projects[1].projectName}`,
    });
    await expect(previous).toBeInViewport();
    await expect(previous).toHaveAttribute(
      "href",
      `/projects/${projects.at(-1)!.slug}`
    );
    await expect(next).toBeInViewport();
    await expect(next).toHaveAttribute("href", `/projects/${projects[1].slug}`);
    await expect(page.locator("[class*='breadcrumb']")).toHaveCount(0);
    await expect(
      previous.getByText("Precedente", { exact: true })
    ).toBeVisible();
    await expect(next.getByText("Successivo", { exact: true })).toBeVisible();
    const previousName = previous.getByText(projects.at(-1)!.projectName, {
      exact: true,
    });
    const nextName = next.getByText(projects[1].projectName, { exact: true });
    await expect(previousName).toBeHidden();
    await expect(nextName).toBeHidden();
    await previous.hover();
    await expect(previousName).toBeVisible();
    await expect(nextName).toBeHidden();
    await next.hover();
    await expect(nextName).toBeVisible();
    await expect(previousName).toBeHidden();
    await page.mouse.move(0, 0);
    await previous.focus();
    await page.keyboard.press("Tab");
    await expect(next).toBeFocused();
    await expect(nextName).toBeVisible();
    const heroBox = await hero.boundingBox();
    const headingBox = await page
      .getByRole("heading", { level: 1 })
      .boundingBox();
    const mainBox = await page.locator("main.layout-content").boundingBox();
    expect(heroBox!.y + heroBox!.height).toBeLessThanOrEqual(headingBox!.y);
    expect(headingBox!.y - heroBox!.y - heroBox!.height).toBeLessThanOrEqual(
      41
    );
    expect(Math.abs(heroBox!.x - mainBox!.x)).toBeLessThan(2);
    expect(Math.abs(heroBox!.width - mainBox!.width)).toBeLessThan(20);
    expect(
      new URL((await image.getAttribute("src"))!, page.url()).searchParams.get(
        "url"
      )
    ).toBe(project.images[0]);
    await image.click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    const firstTrigger = page.getByRole("button", {
      name: "Visualizza immagine 1",
      exact: true,
    });
    await firstTrigger.click();
    const dialog = page.getByRole("dialog", {
      name: "Visualizzatore immagini",
    });
    await expect(
      dialog.getByRole("img", {
        name: `Immagine 1 di ${project.images.length}`,
        exact: true,
      })
    ).toHaveJSProperty("src", new URL(project.images[0], page.url()).href);
    await page.keyboard.press("Escape");
    await previous.click();
    await expect(page).toHaveURL(`/projects/${projects.at(-1)!.slug}`);
    await page
      .locator("[data-project-hero]")
      .getByRole("link", {
        name: `Progetto successivo: ${project.projectName}`,
      })
      .click();
    await expect(page).toHaveURL(`/projects/${project.slug}`);
    await expect(hero).toBeInViewport();
  });
}

test("project opening photograph preserves contain for renders", async ({
  page,
}) => {
  await page.goto("/projects/Via-Eroi-d-Italia");
  await expect(page.locator("[data-project-hero] img")).toHaveCSS(
    "object-fit",
    "contain"
  );
});

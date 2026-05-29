import { expect, test, type Page } from "@playwright/test";

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

const fillContactForm = async (page: Page) => {
  await page.locator("#email").fill("cliente@example.com");
  await page.locator("#name").fill("Mario Rossi");
  await page.locator("#message").fill(
    "Buongiorno, vorrei richiedere maggiori informazioni sul vostro studio."
  );
  await page.locator("#acceptPrivacy").check();
};

test.describe("contact form", () => {
  test("shows API success feedback and resets fields after submit", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      const payload = route.request().postDataJSON();

      expect(payload).toMatchObject({
        email: "cliente@example.com",
        name: "Mario Rossi",
        message:
          "Buongiorno, vorrei richiedere maggiori informazioni sul vostro studio.",
        acceptPrivacy: true,
      });

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message:
            "Messaggio inviato con successo! Ti risponderemo al più presto.",
        }),
      });
    });

    await openPageWithoutIntroOverlays(page, "/contacts");
    await fillContactForm(page);

    await page.getByRole("button", { name: "Invia Messaggio" }).click();

    await expect(page.getByRole("status")).toContainText(
      "Messaggio inviato con successo! Ti risponderemo al più presto."
    );
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#message")).toHaveValue("");
    await expect(page.locator("#acceptPrivacy")).not.toBeChecked();
  });

  test("shows API error feedback returned by backend", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Troppe richieste. Riprova tra un minuto.",
        }),
      });
    });

    await openPageWithoutIntroOverlays(page, "/contacts");
    await fillContactForm(page);

    await page.getByRole("button", { name: "Invia Messaggio" }).click();

    await expect(
      page.getByRole("alert").filter({
        hasText: "Troppe richieste. Riprova tra un minuto.",
      })
    ).toBeVisible();
    await expect(page.locator("#email")).toHaveValue("cliente@example.com");
  });

  test("api rejects incomplete payload before email send", async ({
    request,
  }) => {
    const response = await request.post("/api/contact", {
      data: {
        email: "cliente@example.com",
        name: "   ",
        message: "",
        acceptPrivacy: true,
        honeypot: "",
      },
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({
      error: "Tutti i campi sono obbligatori",
    });
  });
});
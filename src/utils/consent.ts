export type ConsentStatus = "accepted" | "declined";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const CONSENT_CHANGE_EVENT = "cookie-consent-change";
export const CONSENT_OPEN_EVENT = "cookie-consent-open";

let temporaryOnly = false;
let temporaryConsent: { status: ConsentStatus; date: number } | null = null;

export function readConsent(): {
  status: ConsentStatus;
  expiresAt: number;
} | null {
  let status: string | null;
  let date: number;
  try {
    if (temporaryOnly) throw new Error("Persistence unavailable");
    status = localStorage.getItem("cookie-consent");
    date = Date.parse(localStorage.getItem("cookie-consent-date") ?? "");
  } catch {
    status = temporaryConsent?.status ?? null;
    date = temporaryConsent?.date ?? NaN;
  }
  const now = Date.now();
  if (
    (status !== "accepted" && status !== "declined") ||
    !Number.isFinite(date) ||
    date > now ||
    now - date >= CONSENT_MAX_AGE_MS
  ) {
    return null;
  }
  return { status, expiresAt: date + CONSENT_MAX_AGE_MS };
}

export function saveConsent(status: ConsentStatus): void {
  const date = Date.now();
  temporaryConsent = { status, date };
  try {
    localStorage.setItem("cookie-consent-date", new Date(date).toISOString());
    localStorage.setItem("cookie-consent", status);
    temporaryOnly = false;
  } catch {
    temporaryOnly = true;
    // The choice still applies to this visit when storage is unavailable.
  }
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { status } })
  );
}

export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

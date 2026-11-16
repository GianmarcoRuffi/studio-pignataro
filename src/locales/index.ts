import italian from "./it.json";

/** Italian compatibility export; rendered pages use the request locale provider. */
export const messages = italian;
export type Dictionary = typeof italian;

export function formatMessage(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(values, name) ? String(values[name]) : placeholder
  );
}

export type Locale = "it" | "en";

export function stripLocale(path: string): string {
  return path.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const bare = stripLocale(path);
  return locale === "en" ? `/en${bare === "/" ? "" : bare}` : bare;
}

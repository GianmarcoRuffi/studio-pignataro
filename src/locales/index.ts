import italian from "./it.json";

/** The public site remains Italian; English is prepared without shipping it. */
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

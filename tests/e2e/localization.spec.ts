import { expect, test } from "@playwright/test";
import italian from "../../src/locales/it.json";
import english from "../../src/locales/en.json";
import { formatMessage, type Dictionary } from "../../src/locales";

// Type-check English against the Italian catalogue without importing it at runtime.
const translated: Dictionary = english;

test("locales have identical structures and interpolation placeholders", () => {
  const compare = (it: unknown, en: unknown, key: string) => {
    if (typeof it === "string") {
      expect(typeof en, key).toBe("string");
      if (it.trim()) expect(String(en).trim(), key).not.toBe("");
      const tokens = (value: string) =>
        [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
      expect(tokens(String(en)), key).toEqual(tokens(it));
      return;
    }
    expect(Array.isArray(en), key).toBe(Array.isArray(it));
    expect(Object.keys(en as object).sort(), key).toEqual(
      Object.keys(it as object).sort()
    );
    for (const [child, value] of Object.entries(it as object)) {
      compare(value, (en as Record<string, unknown>)[child], `${key}.${child}`);
    }
  };
  compare(italian, translated, "messages");
  expect(
    formatMessage("{name}: {index}/{total}", {
      name: "Progetto",
      index: 1,
      total: 4,
    })
  ).toBe("Progetto: 1/4");
});

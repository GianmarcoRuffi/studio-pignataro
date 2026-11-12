import "server-only";
import { headers } from "next/headers";
import italian from "./it.json";
import english from "./en.json";
import { type Locale, type Dictionary } from ".";

export async function getServerLocale(): Promise<Locale> {
  return (await headers()).get("x-site-locale") === "en" ? "en" : "it";
}

export async function getServerMessages(): Promise<{
  locale: Locale;
  messages: Dictionary;
}> {
  const locale = await getServerLocale();
  return { locale, messages: locale === "en" ? english : italian };
}

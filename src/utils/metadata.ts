import type { Metadata } from "next";
import { localizedPath, type Locale } from "../locales";

interface PageMetadataOptions {
  locale?: Locale;
  title: string | { default: string; template: string };
  description: string;
  path: string;
}

/**
 * Generate consistent metadata for pages
 * Reduces duplication in layout.tsx files
 *
 * @param options - Page title and description
 * @returns Metadata object with OpenGraph and Twitter cards
 */
export function generatePageMetadata({
  title,
  description,
  path,
  locale = "it",
}: PageMetadataOptions): Metadata {
  const metadata: Metadata = {
    title: title as Metadata["title"],
    description,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        it: localizedPath(path, "it"),
        en: localizedPath(path, "en"),
        "x-default": localizedPath(path, "it"),
      },
    },
    openGraph: {
      url: localizedPath(path, locale),
      locale: locale === "en" ? "en_GB" : "it_IT",
      title: typeof title === "string" ? title : title.default,
      description,
    },
    twitter: {
      title: typeof title === "string" ? title : title.default,
      description,
    },
  };

  return metadata;
}

import type { MetadataRoute } from "next";
import projects from "../data/projectsData";
import { SITE_URL } from "../constants";
import { localizedPath } from "../locales";
import { getPressesData } from "./presses/data";
import { messages } from "../locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/projects",
    "/presses",
    "/bio",
    "/contacts",
    "/privacy-policy",
    "/cookie-policy",
  ];
  const entries = [
    ...pages.map((path) => ({
      path,
      images:
        path === "/presses"
          ? getPressesData(messages).map((p) => p.imageSource)
          : [],
      updatedAt: undefined as string | undefined,
    })),
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      images: [...new Set([p.imgSrc, ...p.images])],
      updatedAt: p.updatedAt,
    })),
  ];
  return entries.flatMap(({ path, images, updatedAt }) =>
    (["it", "en"] as const).map((locale) => ({
      url: new URL(localizedPath(path, locale), SITE_URL).href,
      ...(updatedAt ? { lastModified: updatedAt } : {}),
      alternates: {
        languages: {
          it: new URL(localizedPath(path, "it"), SITE_URL).href,
          en: new URL(localizedPath(path, "en"), SITE_URL).href,
          "x-default": new URL(path, SITE_URL).href,
        },
      },
      images: images.map((image) => new URL(image, SITE_URL).href),
    }))
  );
}

import { messages as italianMessages, type Dictionary } from "../locales";
export function getNotFoundContent(messages: Dictionary) {
  return {
    title: messages["editorial"]["notFound"]["title"],
    ctaLabel: messages["editorial"]["notFound"]["ctaLabel"],
    ctaHref: "/",
  } as const;
}

export const notFoundContent = getNotFoundContent(italianMessages);

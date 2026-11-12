import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/cookie-policy",
  title: messages.ui.common.cookies,
  description: messages.ui.metadata.cookieDescription,
});

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

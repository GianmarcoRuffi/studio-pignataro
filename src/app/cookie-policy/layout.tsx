import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/cookie-policy",
    title: messages.ui.common.cookies,
    description: messages.ui.metadata.cookieDescription,
  });
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

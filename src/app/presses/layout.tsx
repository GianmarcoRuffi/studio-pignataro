import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/presses",
    title: messages.ui.common.presses,
    description: messages.ui.metadata.pressesDescription,
  });
}

export default function PressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

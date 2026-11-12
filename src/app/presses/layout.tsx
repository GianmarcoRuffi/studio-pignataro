import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/presses",
  title: messages.ui.common.presses,
  description: messages.ui.metadata.pressesDescription,
});

export default function PressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

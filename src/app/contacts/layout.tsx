import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/contacts",
  title: messages.ui.common.contacts,
  description: messages.ui.metadata.contactsDescription,
});

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

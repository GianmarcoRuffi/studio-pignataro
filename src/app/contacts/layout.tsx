import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/contacts",
    title: messages.ui.common.contacts,
    description: messages.ui.metadata.contactsDescription,
  });
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

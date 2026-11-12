import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/privacy-policy",
    title: messages.ui.common.privacy,
    description: messages.ui.metadata.privacyDescription,
  });
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

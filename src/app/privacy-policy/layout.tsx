import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/privacy-policy",
  title: messages.ui.common.privacy,
  description: messages.ui.metadata.privacyDescription,
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

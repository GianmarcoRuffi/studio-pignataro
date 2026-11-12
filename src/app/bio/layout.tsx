import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/bio",
  title: messages.ui.common.bio,
  description: messages.ui.metadata.bioDescription,
});

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

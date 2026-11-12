import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/bio",
    title: messages.ui.common.bio,
    description: messages.ui.metadata.bioDescription,
  });
}

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

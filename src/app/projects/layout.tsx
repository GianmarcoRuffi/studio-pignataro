import { getServerMessages } from "../../locales/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return generatePageMetadata({
    locale,
    path: "/projects",
    title: {
      default: messages.ui.common.projects,
      template: messages.ui.metadata.titleTemplate,
    },
    description: messages.ui.metadata.projectsDescription,
  });
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

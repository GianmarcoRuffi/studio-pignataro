import { messages } from "../../locales";
import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

const projectsDescription = messages.ui.metadata.projectsDescription;

export const metadata: Metadata = generatePageMetadata({
  path: "/projects",
  title: {
    default: messages.ui.common.projects,
    template: messages.ui.metadata.titleTemplate,
  },
  description: projectsDescription,
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

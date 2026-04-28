import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

const projectsDescription =
  "Una selezione dei miei progetti di architettura e interior design, dalla ristrutturazione di edifici storici a soluzioni innovative per interni contemporanei.";

export const metadata: Metadata = generatePageMetadata({
  title: {
    default: "Progetti",
    template: "%s | Studio Architetto Gianluca Pignataro",
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

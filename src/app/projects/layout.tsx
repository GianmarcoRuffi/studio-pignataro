import type { Metadata } from "next";

const projectsDescription =
  "Una selezione dei miei progetti di architettura e interior design, dalla ristrutturazione di edifici storici a soluzioni innovative per interni contemporanei.";

export const metadata: Metadata = {
  title: {
    default: "Progetti",
    template: "%s | Studio Architetto Gianluca Pignataro",
  },
  description: projectsDescription,
  openGraph: {
    title: "Progetti",
    description: projectsDescription,
  },
  twitter: {
    title: "Progetti",
    description: projectsDescription,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

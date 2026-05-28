import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "../../../data/projectsData";
import Gallery from "../../../components/Gallery/Gallery";
import { Params, Project } from "../../../models/models";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p: Project) => p.slug === slug);

  if (!project) {
    return {};
  }

  const description = project.description.replace(/\s+/g, " ").trim();
  const title = project.projectName;
  const canonical = `/projects/${slug}`;
  const keywords = [
    "architetto",
    "cagliari",
    "studio di architettura",
    "interior design",
    "ristrutturazione",
    "progetti architettura",
    title,
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [
        {
          url: project.imgSrc,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.imgSrc],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((p: Project) => ({
    slug: p.slug,
  }));
}

export default async function Page({ params }: Params) {
  const { slug } = await params;

  const projectIndex = projects.findIndex((p: Project) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) notFound();

  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div>
      <Gallery
        images={project.images}
        galleryTitle={project.projectName}
        galleryDescription={project.description}
        galleryLinks={project.externalLink}
        imgCredits={project.imgCredits}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </div>
  );
}

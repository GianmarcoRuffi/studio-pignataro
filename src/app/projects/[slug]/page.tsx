import { notFound } from "next/navigation";
import projects from "../../../data/data";
import Gallery from "../../../components/Gallery/Gallery";
import { Params, Project } from "../../../models/models";

// Function to generate static paths for each project
export async function generateStaticParams() {
  return projects.map((p: Project) => ({
    slug: p.slug,
  }));
}

// Page component
export default function Page({ params }: Params) {
  const { slug } = params;

  // Find the project using the slug
  const projectIndex = projects.findIndex((p: Project) => p.slug === slug);
  const project = projects[projectIndex];

  // If project doesn't exist, return a 404
  if (!project) notFound();

  // Get the previous and next projects
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

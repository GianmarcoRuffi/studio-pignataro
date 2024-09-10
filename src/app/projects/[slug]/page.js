import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import projects from "../../../data/data";

export async function generateStaticParams() {
  // Crea i parametri per ogni percorso dinamico
  const paths = projects.map((project) => ({
    slug: project.slug,
  }));

  return paths;
}

export async function getProjectData(slug) {
  // Trova il progetto basato sullo slug
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];
  // se non esiste -> 404
  if (!project) notFound();

  // Trova il progetto precedente e successivo
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return { project, prevProject, nextProject };
}

export default async function Page({ params }) {
  const { slug } = params;
  const data = await getProjectData(slug);

  if (!data) {
    notFound();
  }

  const { project, prevProject, nextProject } = data;

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

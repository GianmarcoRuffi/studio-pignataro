import { notFound } from "next/navigation";
import projects from "../../../data/data";
import Gallery from "../../../components/Gallery/Gallery";

export async function generateStaticParams() {
  // Cicla l'oggetto projects e restituisce lo slug - per ciascuno verrà creata una rotta projects/[slug]
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default function Page({ params }) {
  const { slug } = params;

  // Prendi dall'oggetto projects il progetto giusto tramite slug
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  // Se non esiste -> 404
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

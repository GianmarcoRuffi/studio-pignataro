import { notFound } from "next/navigation";
import projects from "../../../data/data";
import Gallery from "../../../components/Gallery";

export async function generateStaticParams() {
  // cicla l'oggetto projects e restituisce lo slug - per ciascuno verrà creata una rotta projects/[slug] - deve chiamarsi esattamente come il segmento di rotta specificato
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

// params contiene il risultato ritornato da generateStaticParams
export default function Page({ params }) {
  const { slug } = params;

  // prendiamo dall'oggetto projects il progetto giusto tramite slug
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  // se non esiste -> 404
  if (!project) notFound();

  // Troviamo il progetto precedente e successivo
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div>
      <Gallery
        images={project.images}
        galleryTitle={project.projectName}
        galleryDescription={project.description}
        galleryLinks={project.externalLink}
        imgCredits={project.imgCredits}
        prevProject={prevProject} // Passiamo il progetto precedente
        nextProject={nextProject} // Passiamo il progetto successivo
      />
    </div>
  );
}

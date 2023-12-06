import { notFound } from "next/navigation";
import projects from "../../../data/data";
import Gallery from "../../../components/Gallery";

export async function generateStaticParams() {
  // cicla l'oggetto projects e ritorna lo slug - per ciascuno verrà creata una rotta projects/[slug] - deve chiamarsi esattamente come il segmento di rotta specificato
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

// params contiene il risultato ritornato da generateStaticParams
export default function Page({ params }) {
  const { slug } = params;

  // prendiamo dall'oggeto projects il progetto giusto tramite slug
  const project = projects.find((p) => {
    return p.slug == slug;
  });

  // se non esiste -> 404
  if (!project) notFound();

  return (
    <div>
      <Gallery
        images={project.images}
        galleryTitle={project.projectName}
        galleryDescription={project.description}
        galleryLinks={project.externalLink}
        imgCredits={project.imgCredits}
      />
    </div>
  );
}

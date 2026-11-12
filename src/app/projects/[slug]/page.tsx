import sharp from "sharp";
import path from "node:path";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "../../../data/projectsData";
import Gallery from "../../../components/Gallery/Gallery";
import { Params, Project } from "../../../models/models";
import styles from "./project.module.scss";

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

  const imageDimensions = await Promise.all(
    project.images.map(async (source) => {
      const metadata = await sharp(
        path.join(process.cwd(), "public", source)
      ).metadata();
      return {
        width: metadata.autoOrient.width,
        height: metadata.pageHeight ?? metadata.autoOrient.height,
      };
    })
  );

  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div>
      {project.images[0] && (
        <figure className={styles.projectHero} data-project-hero>
          <Image
            src={project.images[0]}
            alt={`Vista del progetto ${project.projectName}`}
            width={imageDimensions[0].width}
            height={imageDimensions[0].height}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            quality={85}
            unoptimized={project.images[0].endsWith(".gif")}
            className={styles.heroImage}
            style={{
              objectFit: project.imageFit ?? "cover",
              objectPosition: project.imagePosition ?? "center",
            }}
          />
          <nav aria-label="Navigazione progetti">
            <a
              href={`/projects/${prevProject.slug}`}
              className={`${styles.heroChevron} ${styles.previous}`}
              aria-label={`Progetto precedente: ${prevProject.projectName}`}
            >
              <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
              <span className={styles.heroCaption} aria-hidden="true">
                <span className={styles.heroDirection}>Precedente</span>
                <span className={styles.heroProjectName}>
                  {prevProject.projectName}
                </span>
              </span>
            </a>
            <a
              href={`/projects/${nextProject.slug}`}
              className={`${styles.heroChevron} ${styles.next}`}
              aria-label={`Progetto successivo: ${nextProject.projectName}`}
            >
              <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
              <span className={styles.heroCaption} aria-hidden="true">
                <span className={styles.heroDirection}>Successivo</span>
                <span className={styles.heroProjectName}>
                  {nextProject.projectName}
                </span>
              </span>
            </a>
          </nav>
        </figure>
      )}
      <Gallery
        images={project.images}
        imageDimensions={imageDimensions}
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

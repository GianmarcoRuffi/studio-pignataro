import { messages, formatMessage } from "../../../locales";
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
  const keywords = [...messages.ui.projects.metadataKeywords, title];

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
          <div className={styles.heroMedia}>
            {project.imageFit === "contain" && (
              <Image
                src={project.images[0]}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                quality={85}
                loading="eager"
                className={styles.heroBackdrop}
              />
            )}
            <Image
              src={project.images[0]}
              alt={formatMessage(messages.ui.projects.heroAlt, {
                name: project.projectName,
              })}
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
          </div>
          <nav aria-label={messages.ui.projects.navigation}>
            <a
              href={`/projects/${prevProject.slug}`}
              className={`${styles.heroChevron} ${styles.previous}`}
              aria-label={formatMessage(messages.ui.projects.previousLabel, {
                name: prevProject.projectName,
              })}
            >
              <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
              <span className={styles.heroCaption} aria-hidden="true">
                <span className={styles.heroDirection}>
                  {messages.ui.common.previous}
                </span>
                <span className={styles.heroProjectName}>
                  {prevProject.projectName}
                </span>
              </span>
            </a>
            <a
              href={`/projects/${nextProject.slug}`}
              className={`${styles.heroChevron} ${styles.next}`}
              aria-label={formatMessage(messages.ui.projects.nextLabel, {
                name: nextProject.projectName,
              })}
            >
              <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
              <span className={styles.heroCaption} aria-hidden="true">
                <span className={styles.heroDirection}>
                  {messages.ui.common.next}
                </span>
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

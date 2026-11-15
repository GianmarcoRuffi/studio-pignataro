import Link from "next/link";
import { getServerMessages } from "../../locales/server";
import { localizedPath } from "../../locales";
import { getProjects } from "../../data/projectsData";
import { getPressesData } from "../../app/presses/data";
import { SITE_URL } from "../../constants";
import JsonLd from "./JsonLd";
import styles from "./editorial-index.module.scss";

export default async function EditorialIndex({
  publications = false,
}: {
  publications?: boolean;
}) {
  const { locale, messages } = await getServerMessages();
  const projects = getProjects(messages).filter((p) => !p.invisible);
  const presses = getPressesData(messages);
  const path = publications ? "/presses" : "/projects";
  const plain = (text: string) =>
    text.replace(/<br\s*\/?\s*>/gi, " — ").replace(/<[^>]*>/g, "");
  return (
    <section className={styles.index}>
      <details>
        <summary>
          {publications
            ? messages.ui.seo.publicationIndex
            : messages.ui.seo.projectIndex}
        </summary>
        <ul>
          {publications
            ? presses.map((p, i) => (
                <li key={p.imageSource} id={`publication-${i}`}>
                  <p>
                    {p.date} — {plain(p.description)}
                  </p>
                  {projects
                    .filter((project) =>
                      project.externalLink?.some(
                        (link) => link.url === p.source
                      )
                    )
                    .map((project) => (
                      <p key={project.slug}>
                        <Link
                          href={localizedPath(
                            `/projects/${project.slug}`,
                            locale
                          )}
                        >
                          {project.projectName}
                        </Link>
                      </p>
                    ))}
                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {messages.ui.presses.article}
                    </a>
                  )}
                </li>
              ))
            : projects.map((p) => (
                <li key={p.slug}>
                  <Link href={localizedPath(`/projects/${p.slug}`, locale)}>
                    {p.projectName}
                  </Link>
                  <p>{p.description}</p>
                </li>
              ))}
        </ul>
      </details>
      {publications && (
        <section id="monograph">
          <h2>{messages.ui.seo.monographTitle}</h2>
          <p>{messages.ui.seo.monographIntro}</p>
        </section>
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}${localizedPath(path, locale)}`,
          name: publications
            ? messages.ui.common.presses
            : messages.ui.common.projects,
          inLanguage: locale,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: publications
              ? presses.map((p, i) => ({
                  "@type": "ListItem" as const,
                  position: i + 1,
                  item: {
                    "@type":
                      i === 0 ? ("Book" as const) : ("CreativeWork" as const),
                    name: plain(p.description),
                    url:
                      p.source ||
                      `${SITE_URL}${localizedPath(path, locale)}#${i === 0 ? "monograph" : `publication-${i}`}`,
                    image: `${SITE_URL}${p.imageSource}`,
                    ...(i === 0
                      ? {
                          datePublished: "2023-12",
                          editor: {
                            "@type": "Person" as const,
                            name: "Luigi Corda",
                          },
                          about: { "@id": `${SITE_URL}/#architect` },
                        }
                      : {}),
                  },
                }))
              : projects.map((p, i) => ({
                  "@type": "ListItem" as const,
                  position: i + 1,
                  url: `${SITE_URL}${localizedPath(`/projects/${p.slug}`, locale)}`,
                  name: p.projectName,
                })),
          },
        }}
      />
    </section>
  );
}

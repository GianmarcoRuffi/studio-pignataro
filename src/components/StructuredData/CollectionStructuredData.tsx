import { getServerMessages } from "../../locales/server";
import { localizedPath } from "../../locales";
import { getProjects } from "../../data/projectsData";
import { getPressesData } from "../../app/presses/data";
import { SITE_URL } from "../../constants";
import JsonLd from "./JsonLd";

export default async function CollectionStructuredData({
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
                  url: p.source || `${SITE_URL}${localizedPath(path, locale)}`,
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
  );
}

import type { Graph, Thing, WithContext } from "schema-dts";
export default function JsonLd({ data }: { data: Graph | WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

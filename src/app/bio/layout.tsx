import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Chi sono",
  description:
    "Profilo professionale dell'Architetto Gianluca Pignataro: trenta anni di esperienza in restauro, recupero dell'edilizia storica e progettazione architettonica a Cagliari e all'estero.",
});

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

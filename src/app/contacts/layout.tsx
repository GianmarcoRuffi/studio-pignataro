import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contatti",
  description:
    "Contatti dello Studio Architetto Gianluca Pignataro a Cagliari. Informazioni su indirizzo, email, telefono e canali social per le tue richieste di consulenza architettonica.",
});

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

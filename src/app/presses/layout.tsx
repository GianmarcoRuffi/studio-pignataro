import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Pubblicazioni",
  description:
    "Rassegna stampa e pubblicazioni dei lavori dell'Architetto Gianluca Pignataro su riviste specializzate di architettura e design.",
});

export default function PressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

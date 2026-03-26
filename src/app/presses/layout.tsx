import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pubblicazioni",
  description:
    "Rassegna stampa e pubblicazioni dei lavori dell'Architetto Gianluca Pignataro su riviste specializzate di architettura e design.",
  openGraph: {
    title: "Pubblicazioni",
    description:
      "Rassegna stampa e pubblicazioni dei lavori dell'Architetto Gianluca Pignataro su riviste specializzate di architettura e design.",
  },
  twitter: {
    title: "Pubblicazioni",
    description:
      "Rassegna stampa e pubblicazioni dei lavori dell'Architetto Gianluca Pignataro su riviste specializzate di architettura e design.",
  },
};

export default function PressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

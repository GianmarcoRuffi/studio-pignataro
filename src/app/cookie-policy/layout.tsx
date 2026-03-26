import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sull'utilizzo dei cookie nel sito dello Studio Architetto Gianluca Pignataro.",
  openGraph: {
    title: "Cookie Policy",
    description:
      "Informativa sull'utilizzo dei cookie nel sito dello Studio Architetto Gianluca Pignataro.",
  },
  twitter: {
    title: "Cookie Policy",
    description:
      "Informativa sull'utilizzo dei cookie nel sito dello Studio Architetto Gianluca Pignataro.",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

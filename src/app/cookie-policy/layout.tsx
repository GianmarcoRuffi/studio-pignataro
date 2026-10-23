import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/cookie-policy",
  title: "Cookie Policy",
  description:
    "Informativa sull'utilizzo dei cookie nel sito dello Studio Architetto Gianluca Pignataro.",
});

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

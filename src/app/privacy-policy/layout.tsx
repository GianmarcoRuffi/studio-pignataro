import type { Metadata } from "next";
import { generatePageMetadata } from "../../utils/metadata";

export const metadata: Metadata = generatePageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali dello Studio Architetto Gianluca Pignataro.",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

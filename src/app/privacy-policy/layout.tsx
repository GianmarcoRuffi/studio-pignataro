import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali dello Studio Architetto Gianluca Pignataro.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Informativa sul trattamento dei dati personali dello Studio Architetto Gianluca Pignataro.",
  },
  twitter: {
    title: "Privacy Policy",
    description:
      "Informativa sul trattamento dei dati personali dello Studio Architetto Gianluca Pignataro.",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

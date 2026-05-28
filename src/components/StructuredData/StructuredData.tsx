"use client";
import Script from "next/script";
import { BRANDING_LOGO_URL, SITE_URL } from "../../constants";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Studio Architetto Gianluca Pignataro",
    alternateName: "Architetto Pignataro",
    description:
      "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
    url: SITE_URL,
    logo: BRANDING_LOGO_URL,
    image: BRANDING_LOGO_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cagliari",
      addressCountry: "IT",
    },
    serviceType: "Architectural Services",
    areaServed: {
      "@type": "City",
      name: "Cagliari",
    },
    founder: {
      "@type": "Person",
      name: "Gianluca Pignataro",
      jobTitle: "Architetto",
    },
    sameAs: [SITE_URL],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;

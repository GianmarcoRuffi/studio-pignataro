"use client";
import Script from "next/script";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Studio Architetto Gianluca Pignataro",
    alternateName: "Architetto Pignataro",
    description:
      "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
    url: "https://archpignataro.it",
    logo: "https://archpignataro.it/logo.jpg",
    image: "https://archpignataro.it/logo.jpg",
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
    sameAs: ["https://archpignataro.it"],
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

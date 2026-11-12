"use client";
import { messages } from "../../locales";

import Script from "next/script";
import { BRANDING_LOGO_URL, SITE_URL } from "../../constants";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: messages.ui.common.brand,
    alternateName: messages.ui.common.shortBrand,
    description: messages.ui.structuredData.description,
    url: SITE_URL,
    logo: BRANDING_LOGO_URL,
    image: BRANDING_LOGO_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: messages.ui.common.city,
      addressCountry: "IT",
    },
    serviceType: messages.ui.structuredData.service,
    areaServed: {
      "@type": "City",
      name: messages.ui.common.city,
    },
    founder: {
      "@type": "Person",
      name: messages.ui.common.founder,
      jobTitle: messages.ui.common.architect,
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

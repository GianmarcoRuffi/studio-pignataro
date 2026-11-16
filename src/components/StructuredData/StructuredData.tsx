import { getServerMessages } from "../../locales/server";
import { localizedPath } from "../../locales";
import { BRANDING_LOGO_URL, SITE_URL } from "../../constants";
import { sharedContactsData } from "../../data/contactsData";
import { contactsPageOnlyData } from "../../app/contacts/data";
import JsonLd from "./JsonLd";

export default async function StructuredData() {
  const { locale, messages } = await getServerMessages();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#studio`,
            name: messages.ui.common.brand,
            url: SITE_URL,
            logo: BRANDING_LOGO_URL,
            image: `${SITE_URL}/site/contacts/studio.webp`,
            description: messages.ui.structuredData.description,
            telephone: `+39${sharedContactsData.phone.landline}`,
            email: sharedContactsData.email.address,
            address: {
              "@type": "PostalAddress",
              ...sharedContactsData.postalAddress,
            },
            founder: { "@id": `${SITE_URL}/#architect` },
            sameAs: [contactsPageOnlyData.social.facebook],
          },
          {
            "@type": "Person",
            "@id": `${SITE_URL}/#architect`,
            name: messages.ui.common.founder,
            jobTitle: messages.ui.common.architect,
            url: `${SITE_URL}${localizedPath("/bio", locale)}`,
            worksFor: { "@id": `${SITE_URL}/#studio` },
            sameAs: [contactsPageOnlyData.social.linkedin],
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: messages.ui.common.brand,
            inLanguage: ["it", "en"],
            publisher: { "@id": `${SITE_URL}/#studio` },
          },
        ],
      }}
    />
  );
}

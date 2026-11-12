import {
  messages as italianMessages,
  formatMessage,
  type Dictionary,
} from "../../locales";
import { sharedContactsData } from "../../data/contactsData";

export interface CookieTableRow {
  name: string;
  purpose: string;
  duration: string;
  type: string;
}

export interface PolicySection {
  id: string;
  title: string;
  content: string | string[];
  list?: {
    items: string[];
    type?: "ul" | "ol";
  };
  subsections?: Array<{
    title: string;
    content: string;
    list?: {
      items: string[];
      type?: "ul" | "ol";
    };
  }>;
  cookieTable?: CookieTableRow[];
  contactInfo?: {
    email: string;
    phone: string;
    mobile: string;
    address: string;
    vat: string;
  };
}

export const cookiePolicyUpdatedAt = "2026-10-23";

export function getCookiePolicyData(messages: Dictionary): PolicySection[] {
  return [
    {
      id: "cosa-sono",
      title: messages["editorial"]["cookiePolicy"]["cosa-sono"]["title"],
      content: messages["editorial"]["cookiePolicy"]["cosa-sono"]["content"],
    },
    {
      id: "tipologie",
      title: messages["editorial"]["cookiePolicy"]["tipologie"]["title"],
      content: messages["editorial"]["cookiePolicy"]["tipologie"]["content"],
    },
    {
      id: "terze-parti",
      title: messages["editorial"]["cookiePolicy"]["terze-parti"]["title"],
      content: [
        formatMessage(
          messages["editorial"]["cookiePolicy"]["terze-parti"]["content"]["0"],
          { googlePrivacyUrl: "https://policies.google.com/privacy" }
        ),
      ],
    },
    {
      id: "gestione",
      title: messages["editorial"]["cookiePolicy"]["gestione"]["title"],
      content: messages["editorial"]["cookiePolicy"]["gestione"]["content"],
    },
    {
      id: "consenso",
      title: messages["editorial"]["cookiePolicy"]["consenso"]["title"],
      content: messages["editorial"]["cookiePolicy"]["consenso"]["content"],
    },
    {
      id: "dettaglio",
      title: messages["editorial"]["cookiePolicy"]["dettaglio"]["title"],
      content: messages["editorial"]["cookiePolicy"]["dettaglio"]["content"],
      cookieTable: [
        {
          name: "cookie-consent",
          purpose:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "0"
            ]["purpose"],
          duration:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "0"
            ]["duration"],
          type: messages["editorial"]["cookiePolicy"]["dettaglio"][
            "cookieTable"
          ]["0"]["type"],
        },
        {
          name: "cookie-consent-date",
          purpose:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "1"
            ]["purpose"],
          duration:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "1"
            ]["duration"],
          type: messages["editorial"]["cookiePolicy"]["dettaglio"][
            "cookieTable"
          ]["1"]["type"],
        },
        {
          name: "splash-shown / siteVisited",
          purpose:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "2"
            ]["purpose"],
          duration:
            messages["editorial"]["cookiePolicy"]["dettaglio"]["cookieTable"][
              "2"
            ]["duration"],
          type: messages["editorial"]["cookiePolicy"]["dettaglio"][
            "cookieTable"
          ]["2"]["type"],
        },
      ],
    },
    {
      id: "contatti",
      title: messages["editorial"]["cookiePolicy"]["contatti"]["title"],
      content: messages["editorial"]["cookiePolicy"]["contatti"]["content"],
      contactInfo: {
        email: sharedContactsData.email.address,
        phone: sharedContactsData.phone.landline,
        mobile: sharedContactsData.phone.mobile,
        address: sharedContactsData.studio,
        vat: sharedContactsData.vatNumber,
      },
    },
  ];
}

export const cookiePolicyData = getCookiePolicyData(italianMessages);

export function getCookieDisclaimerNote(messages: Dictionary): string {
  return messages.editorial.cookieDisclaimerNote;
}

export const cookieDisclaimerNote = getCookieDisclaimerNote(italianMessages);

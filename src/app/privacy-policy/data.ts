import { messages, formatMessage } from "../../locales";
import { sharedContactsData } from "../../data/contactsData";

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
}

export const privacyPolicyData: PolicySection[] = [
  {
    id: "titolare",
    title: messages["editorial"]["privacyPolicy"]["titolare"]["title"],
    content: formatMessage(
      messages["editorial"]["privacyPolicy"]["titolare"]["content"],
      {
        studio: sharedContactsData.studio,
        vatNumber: sharedContactsData.vatNumber,
        email: sharedContactsData.email.address,
      }
    ),
  },
  {
    id: "tipologie",
    title: messages["editorial"]["privacyPolicy"]["tipologie"]["title"],
    content: messages["editorial"]["privacyPolicy"]["tipologie"]["content"],
    list: {
      items: [
        messages["editorial"]["privacyPolicy"]["tipologie"]["list"]["items"][
          "0"
        ],
        messages["editorial"]["privacyPolicy"]["tipologie"]["list"]["items"][
          "1"
        ],
        messages["editorial"]["privacyPolicy"]["tipologie"]["list"]["items"][
          "2"
        ],
        messages["editorial"]["privacyPolicy"]["tipologie"]["list"]["items"][
          "3"
        ],
      ],
    },
  },
  {
    id: "finalita",
    title: messages["editorial"]["privacyPolicy"]["finalita"]["title"],
    content: messages["editorial"]["privacyPolicy"]["finalita"]["content"],
    list: {
      items: [
        messages["editorial"]["privacyPolicy"]["finalita"]["list"]["items"][
          "0"
        ],
        messages["editorial"]["privacyPolicy"]["finalita"]["list"]["items"][
          "1"
        ],
        messages["editorial"]["privacyPolicy"]["finalita"]["list"]["items"][
          "2"
        ],
        messages["editorial"]["privacyPolicy"]["finalita"]["list"]["items"][
          "3"
        ],
        messages["editorial"]["privacyPolicy"]["finalita"]["list"]["items"][
          "4"
        ],
      ],
    },
  },
  {
    id: "base-giuridica",
    title: messages["editorial"]["privacyPolicy"]["base-giuridica"]["title"],
    content:
      messages["editorial"]["privacyPolicy"]["base-giuridica"]["content"],
  },
  {
    id: "conservazione",
    title: messages["editorial"]["privacyPolicy"]["conservazione"]["title"],
    content: messages["editorial"]["privacyPolicy"]["conservazione"]["content"],
    list: {
      items: [
        messages["editorial"]["privacyPolicy"]["conservazione"]["list"][
          "items"
        ]["0"],
        messages["editorial"]["privacyPolicy"]["conservazione"]["list"][
          "items"
        ]["1"],
        messages["editorial"]["privacyPolicy"]["conservazione"]["list"][
          "items"
        ]["2"],
      ],
    },
  },
  {
    id: "fornitori",
    title: messages["editorial"]["privacyPolicy"]["fornitori"]["title"],
    content: [
      formatMessage(
        messages["editorial"]["privacyPolicy"]["fornitori"]["content"]["0"],
        { vercelPrivacyUrl: "https://vercel.com/legal/privacy-policy" }
      ),
      formatMessage(
        messages["editorial"]["privacyPolicy"]["fornitori"]["content"]["1"],
        { googlePrivacyUrl: "https://policies.google.com/privacy" }
      ),
      messages["editorial"]["privacyPolicy"]["fornitori"]["content"]["2"],
    ],
  },
  {
    id: "diritti",
    title: messages["editorial"]["privacyPolicy"]["diritti"]["title"],
    content: messages["editorial"]["privacyPolicy"]["diritti"]["content"],
    list: {
      items: [
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["0"],
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["1"],
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["2"],
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["3"],
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["4"],
        messages["editorial"]["privacyPolicy"]["diritti"]["list"]["items"]["5"],
      ],
    },
  },
  {
    id: "reclami",
    title: messages["editorial"]["privacyPolicy"]["reclami"]["title"],
    content: messages["editorial"]["privacyPolicy"]["reclami"]["content"],
  },
  {
    id: "modifiche",
    title: messages["editorial"]["privacyPolicy"]["modifiche"]["title"],
    content: messages["editorial"]["privacyPolicy"]["modifiche"]["content"],
  },
];

export const privacyContactEmail = sharedContactsData.email.address;
export const privacyPolicyUpdatedAt = "2026-10-23";

import type {
  ContactsData,
  ContactsPageOnlyData,
  SharedContactsData,
} from "../models/models";

export const sharedContactsData: SharedContactsData = {
  studio: "Via Arrigo Solmi 36, 09129 Cagliari",
  email: {
    address: "glpignataro@yahoo.it",
    mailto: "mailto:glpignataro@yahoo.it",
  },
  phone: {
    landline: "070305880",
    mobile: "3485189797",
  },
  vatNumber: "02783940923",
};

export type { ContactsData, ContactsPageOnlyData };

import {
  sharedContactsData,
  type ContactsData,
  type ContactsPageOnlyData,
} from "../../data/contactsData";

export const contactsPageOnlyData: ContactsPageOnlyData = {
  image: "/Contacts/Studio.webp",
  embedData:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6182.5254326150525!2d9.128340576234216!3d39.21419867165822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f10!3m3!1m2!1s0x12e73476ee56d439%3A0x3a3de69e750e7b82!2sVia%20Arrigo%20Solmi%2C%2036%2C%2009129%20Cagliari%20CA!5e0!3m2!1sit!2sit!4v1726738775757!5m2!1sit!2sit",
  social: {
    linkedin: "https://it.linkedin.com/in/gianluca-pignataro-a6708558",
    facebook: "https://www.facebook.com/pignarch",
  },
};

export const contactsData: ContactsData = {
  ...sharedContactsData,
  ...contactsPageOnlyData,
};
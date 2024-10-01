interface Project {
  projectName: string;
  imgSrc: string;
  description: string;
  externalLink?: {
    name: string;
    url: string;
  }[];
  slug: string;
  imgCredits: string;
  images: string[];
}

interface HomeProps {
  projects: Project[];
}

interface Metadata {
  title: string;
  site_name: string;
  description: string;
  locale: string;
  url: string;
  keywords: string;
}

interface HeadProps {
  children?: React.ReactNode;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

interface Link {
  name: string;
  url: string;
}

interface ProjectBio {
  description: string;
  links?: Link[];
}

interface Experience {
  title: string;
  role: string;
  description: string;
  projects: (string | ProjectBio)[];
}

interface BioData {
  image: string;
  name: string;
  intro: string;
  professionalExperiencesTitle: string;
  experiences: Experience[];
}

 interface Email {
  mailto: string;
  address: string;
}

 interface Phone {
  landline: string;
  mobile: string;
}

 interface SocialLinks {
  linkedin: string;
  facebook: string;
}

 interface ContactsData {
  image: string;
  studio: string;
  embed_data: string;
  email: Email;
  phone: Phone;
  p_iva: string;
  social: SocialLinks;
 }

 interface PressesData {
  description: string;
  imageSource: string;
  source: string;
  date: string;
 }

 interface LinkButtonProps {
   href: string;
   children: any;
   target?: string;
   rel?: string;
 }



export type { Project };
export type { HomeProps };
export type { Metadata };
export type { HeadProps };
export type { RootLayoutProps };
export type { BioData };
export type { Link };
export type { ProjectBio };
export type { Experience };
export type { ContactsData };
export type { PressesData };
export type { LinkButtonProps };
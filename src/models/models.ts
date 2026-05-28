import type { ReactNode } from "react";

interface Project {
  projectName: string;
  imgSrc: string;
  description: string;
  externalLink?: ExternalLink[];
  slug: string;
  imgCredits: string;
  images: string[];
  invisible?: boolean;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
}

interface ExternalLink {
  name: string;
  url: string;
}

interface ProjectBio {
  description: string;
  links?: Link[];
}

interface ProjectCardProps {
  name: string;
  imageSource: string;
  description: string;
}

interface SliderProps {
  projects: Project[];
}

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

interface Link {
  name: string;
  url: string;
}

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}

interface RootLayoutProps {
  children: ReactNode;
}

interface HeaderHeightManagerProps {
  children: ReactNode;
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

interface SharedContactsData {
  studio: string;
  email: Email;
  phone: Phone;
  vatNumber: string;
}

interface ContactsPageOnlyData {
  image: string;
  embedData: string;
  social: SocialLinks;
}

type ContactsData = SharedContactsData & ContactsPageOnlyData;

interface GalleryLink {
  url: string;
  name: string;
}

interface GalleryProps {
  images: string[];
  galleryTitle: string;
  galleryDescription: string;
  galleryLinks?: GalleryLink[];
  imgCredits?: string;
  prevProject?: { slug: string; projectName: string };
  nextProject?: { slug: string; projectName: string };
}

interface PressesData {
  description: string;
  imageSource: string;
  source: string;
  date: string;
}

interface PressesCardProps {
  description: string;
  imageSource: string;
  source: ReactNode;
  date: string;
}

export type {
  Project,
  ExternalLink,
  ProjectBio,
  ProjectCardProps,
  SliderProps,
  Link,
  LinkButtonProps,
  RootLayoutProps,
  HeaderHeightManagerProps,
  Experience,
  BioData,
  Email,
  Phone,
  SocialLinks,
  SharedContactsData,
  ContactsPageOnlyData,
  ContactsData,
  GalleryLink,
  GalleryProps,
  PressesData,
  PressesCardProps,
  Params,
};
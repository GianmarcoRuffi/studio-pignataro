import type { ReactNode, ReactElement } from "react";

// Project
interface Project {
  projectName: string;
  imgSrc: string;
  description: string;
  externalLink?: ExternalLink[];
  slug: string;
  imgCredits: string;
  images: string[];
  invisible?: boolean;
}

interface ExternalLink {
  name: string;
  url: string;
}

interface HomeProps {
  projects: Project[];
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
  params: {
    slug: string;
  };
}

// Link
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

// Layout
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
  children: ReactNode;
}

interface HeaderHeightManagerProps {
  children: ReactNode;
}

interface HeaderProps {}

// Bio
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

// Contacts
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

// Gallery
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

// Presses
interface PressesData {
  description: string;
  imageSource: string;
  source: string;
  date: string;
}

interface PressesCardProps {
  description: string;
  imageSource: string;
  source: React.ReactNode;
  date: string;
}

export type {
  Project,
  ExternalLink,
  HomeProps,
  ProjectBio,
  ProjectCardProps,
  SliderProps,
  Link,
  LinkButtonProps,
  Metadata,
  HeadProps,
  RootLayoutProps,
  HeaderHeightManagerProps,
  Experience,
  BioData,
  Email,
  Phone,
  SocialLinks,
  ContactsData,
  GalleryLink,
  GalleryProps,
  PressesData,
  PressesCardProps,
  HeaderProps,
  Params,
};

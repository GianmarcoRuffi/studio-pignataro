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

export type { Project };
export type { HomeProps };
export type { Metadata };
export type { HeadProps };
export type { RootLayoutProps };

import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string | { default: string; template: string };
  description: string;
}

/**
 * Generate consistent metadata for pages
 * Reduces duplication in layout.tsx files
 * 
 * @param options - Page title and description
 * @returns Metadata object with OpenGraph and Twitter cards
 */
export function generatePageMetadata({
  title,
  description,
}: PageMetadataOptions): Metadata {
  const metadata: Metadata = {
    title: title as Metadata["title"],
    description,
    openGraph: {
      title: typeof title === "string" ? title : title.default,
      description,
    },
    twitter: {
      title: typeof title === "string" ? title : title.default,
      description,
    },
  };
  
  return metadata;
}

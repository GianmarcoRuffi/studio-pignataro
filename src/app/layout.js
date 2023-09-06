import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "Studio Pignataro",
  openGraph: {
    title: "Studio Pignataro",
    description: "Architetto Gianluca Pignataro",
    image: "/Bio_2.jpg",
  },
};

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import localFont from "next/font/local";

//components

import Header from "../components/Header";

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head>
        <title>{metadata.title}</title>
        {metadata.openGraph && (
          <>
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta property="og:image" content="/Bio_2.jpg" />
          </>
        )}
      </Head>

      <body>
        <div className="layout-wrapper">
          {" "}
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

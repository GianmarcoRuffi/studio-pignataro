<link rel="icon" href="/favicon.ico"></link>;
import "./globals.css";
import Head from "next/head";

// Font

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

import localFont from "next/font/local";

//Fontawesome

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

//Components

import Header from "../components/Header";
// import Footer from "../components/Footer";

// Metadata

export const metadata = {
  title: "Studio Architetto Gianluca Pignataro",
  description:
    "Studio professionale a Cagliari con trenta anni di esperienza in  architettura e design di interni, e ristrutturazione di edifici storici.",
  site_name: "Studio Professionale Gianluca Pignataro",
};

//Layout//

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head>
        <title>{metadata.title}</title>
        <description>{metadata.description}</description>
        <keywords>{metadata.keywords}</keywords>
        <site_name>{metadata.site_name}</site_name>
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

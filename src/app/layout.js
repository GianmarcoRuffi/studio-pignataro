<link rel="icon" href="/favicon.ico"></link>;
import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "Gianluca Pignataro Architetto",
  description:
    "Studio Gianluca Pignataro Architetto - Cagliari. Elenco dei progetti di Gianluca Pignataro, pubblicazioni e articoli, biografia e contatti dello studio.",
  // openGraph: {
  //   title: "Architetto Pignataro",
  //   description: "Architetto Gianluca Pignataro",
  //   image: "/Bio_2.jpg",
  // },
};

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import localFont from "next/font/local";

//components

import Header from "../components/Header";
// import Footer from "../components/Footer";

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="robots" content="noodp,noydir" />
        <description>{metadata.description}</description>
        {metadata.description}
        <meta
          name="description"
          content="Studio Gianluca Pignataro Architetto - Cagliari. Elenco dei progetti di Gianluca Pignataro, pubblicazioni e articoli, biografia e contatti dello studio."
        />

        {/* {metadata.openGraph && (
          <>
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta property="og:image" content="/Bio_2.jpg" />
          </>
        )} */}
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

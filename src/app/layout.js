"use client";
import "./styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useRef, useState } from "react";

config.autoAddCss = false;

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

const metadata = {
  title: "Studio Architetto Gianluca Pignataro",
  site_name: "Studio Architetto Gianluca Pignataro",
  description:
    "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
  locale: "it",
};

export default function RootLayout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // Calcolo dell'altezza dell'header all'inizializzazione e quando la finestra viene ridimensionata
    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);

    // Aggiornamento anche al caricamento della pagina
    window.addEventListener("load", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("load", updateHeaderHeight);
    };
  }, []);

  return (
    <html lang="en" className={myFont.className}>
      <Head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:site_name" content={metadata.site_name} />
        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:locale" content={metadata.locale} />
      </Head>
      <body>
        <div className="layout-wrapper">
          <Header ref={headerRef} />
          <div className="layout-content" style={{ marginTop: headerHeight }}>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

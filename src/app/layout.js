import "./globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

config.autoAddCss = false;

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

export const metadata = {
  title: "Studio Architetto Gianluca Pignataro",
  site_name: "Studio Architetto Gianluca Pignataro",
  description:
    "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
  locale: "it",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head>
        <title>{metadata.title}</title>
        <site_name>{metadata.site_name}</site_name>
        <description>{metadata.description}</description>
        <locale>{metadata.locale}</locale>
      </Head>
      <body>
        <div className="layout-wrapper">
          <Header />
          {children}
          <Footer /> {/* Aggiungi il Footer qui */}
        </div>
      </body>
    </html>
  );
}

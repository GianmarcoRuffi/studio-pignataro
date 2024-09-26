import "./styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ScrollToTop from "../hooks/useScrollToTop";
import HeaderHeightManager from "../components/HeaderHeightManager/HeaderHeightManager";
import Footer from "../components/Footer/Footer";
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
  locale: "it_IT",
  url: "https://archpignataro.it",
  keywords:
    "architetto, cagliari, studio, design, interni, ristrutturazione, edifici, storici",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head></Head>
      <body>
        <ScrollToTop />
        <div className="layout-wrapper">
          <HeaderHeightManager>{children}</HeaderHeightManager>
          <Footer />
        </div>
      </body>
    </html>
  );
}

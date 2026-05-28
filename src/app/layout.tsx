import { FC } from "react";
import "./styles/globals.scss";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import HeaderHeightManager from "../components/HeaderHeightManager/HeaderHeightManager";
import Footer from "../components/Footer/Footer";
import CookieConsent from "../components/CookieConsent/CookieConsent";
import OptionalScripts from "../components/OptionalScripts/OptionalScripts";
import StructuredData from "../components/StructuredData/StructuredData";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { RootLayoutProps } from "../models/models";
import { SplashProvider } from "../context/SplashContext";
import SplashWrapper from "../components/SplashWrapper/SplashWrapper";

config.autoAddCss = false;

const myFont = localFont({
  src: "./fonts/CenturyGothic.ttf",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Studio Architetto Gianluca Pignataro",
    template: "%s | Studio Architetto Gianluca Pignataro",
  },
  description:
    "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
  metadataBase: new URL("https://archpignataro.it"),
  keywords:
    "architetto, cagliari, studio, design, interni, ristrutturazione, edifici, storici",
  authors: [{ name: "Architetto Gianluca Pignataro" }],
  creator: "Architetto Gianluca Pignataro",
  publisher: "Architetto Pignataro",
  alternates: {
    canonical: "https://archpignataro.it",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Studio Architetto Gianluca Pignataro",
    description:
      "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
    locale: "it_IT",
    siteName: "Architetto Pignataro",
    url: "https://archpignataro.it",
    images: [
      {
        url: "https://archpignataro.it/branding/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Architetto Gianluca Pignataro - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Architetto Gianluca Pignataro",
    description:
      "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
    images: ["https://archpignataro.it/branding/logo.jpg"],
  },
  verification: {
    google: "google0b4aa7aff11718e8",
  },
  manifest: "/manifest.json",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="it" className={myFont.className} data-scroll-behavior="smooth">
      <body>
        <SplashProvider>
          <SplashWrapper>
            <StructuredData />
            <ScrollToTop />
            <div className="layout-wrapper">
              <HeaderHeightManager>{children}</HeaderHeightManager>
              <Footer />
            </div>
            <OptionalScripts />
            <CookieConsent />
          </SplashWrapper>
        </SplashProvider>
      </body>
    </html>
  );
};

export default RootLayout;

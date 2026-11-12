import type { Metadata } from "next";
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
import PageSmoothScroll from "../components/PageSmoothScroll/PageSmoothScroll";
import { RootLayoutProps } from "../models/models";
import { SplashProvider } from "../context/SplashContext";
import SplashWrapper from "../components/SplashWrapper/SplashWrapper";
import { BRANDING_LOGO_URL, SITE_URL } from "../constants";

import { localizedPath } from "../locales";
import { getServerMessages } from "../locales/server";
import { LocaleProvider } from "../locales/LocaleProvider";

config.autoAddCss = false;

const myFont = localFont({
  src: "./fonts/CenturyGothic.ttf",
  display: "swap",
  variable: "--font-sans",
});

const editorialFont = localFont({
  src: "./fonts/SourceSerif4-Roman.woff2",
  display: "swap",
  weight: "200 900",
  variable: "--font-editorial",
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getServerMessages();
  return {
    title: {
      default: messages.metadata.title,
      template: messages.metadata.template,
    },
    description: messages.metadata.description,
    metadataBase: new URL(SITE_URL),
    keywords: messages.metadata.keywords,
    authors: [{ name: messages.metadata.author }],
    creator: messages.metadata.author,
    publisher: messages.metadata.publisher,
    alternates: {
      canonical: localizedPath("/", locale),
      languages: { it: "/", en: "/en", "x-default": "/" },
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
      title: messages.metadata.title,
      description: messages.metadata.description,
      locale: locale === "en" ? "en_GB" : "it_IT",
      siteName: messages.metadata.publisher,
      url: localizedPath("/", locale),
      images: [
        {
          url: BRANDING_LOGO_URL,
          width: 1200,
          height: 630,
          alt: messages.metadata.logoAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: [BRANDING_LOGO_URL],
    },
    verification: {
      google: "google0b4aa7aff11718e8",
    },
    manifest: "/manifest.json",
  };
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const { locale, messages } = await getServerMessages();
  return (
    <html
      lang={locale}
      className={`${myFont.className} ${myFont.variable} ${editorialFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale} messages={messages}>
          <SplashProvider>
            <SplashWrapper>
              <StructuredData />
              <PageSmoothScroll />
              <ScrollToTop />
              <div className="layout-wrapper">
                <HeaderHeightManager>{children}</HeaderHeightManager>
                <Footer />
              </div>
              <OptionalScripts />
              <CookieConsent />
            </SplashWrapper>
          </SplashProvider>
        </LocaleProvider>
      </body>
    </html>
  );
};

export default RootLayout;

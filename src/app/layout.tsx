import "./styles/globals.scss";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ScrollToTop from "../hooks/useScrollToTop";
import HeaderHeightManager from "../components/HeaderHeightManager/HeaderHeightManager";
import Footer from "../components/Footer/Footer";
import { RootLayoutProps } from "../models/models";

config.autoAddCss = false;

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

export const metadata = {
  title: "Studio Architetto Gianluca Pignataro",
  description:
    "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
  keywords:
    "architetto, cagliari, studio, design, interni, ristrutturazione, edifici, storici",
  openGraph: {
    title: "Studio Architetto Gianluca Pignataro",
    description:
      "Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.",
    locale: "it_IT",
    sitename: "Studio Architetto Gianluca Pignataro",
    url: "https://archpignataro.it",
  },
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="it" className={myFont.className}>
      <body>
        <ScrollToTop />
        <div className="layout-wrapper">
          <HeaderHeightManager>{children}</HeaderHeightManager>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

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
    "Architetto Gianluca Pignataro, professionista con venti anni di esperienza in grado di ideare con creatività, gestire la complessità di un progetto e realizzarlo con competenza tecnica e senso artistico.",
};

//Layout//

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
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

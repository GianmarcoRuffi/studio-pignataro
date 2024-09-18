import "./styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import HeaderHeightManager from "../components/HeaderHeightManager/HeaderHeightManager";
import Footer from "../components/Footer/Footer";
config.autoAddCss = false;

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

export const metadata = {
  openGraph: {
    title: 'Studio Architetto Gianluca Pignataro',
    description: 'Studio professionale a Cagliari con trenta anni di esperienza in architettura, design di interni e ristrutturazione di edifici storici.',
    url: 'https://archpignataro.it',
    siteName: 'Studio Architetto Gianluca Pignataro',
    images: [
      {
        url: 'https://archpignataro.it/Bio.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://archpignataro.it/Bio.jpg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <Head>
        
      </Head>
      <body>
        <div className="layout-wrapper">
          <HeaderHeightManager>
            {children}
          </HeaderHeightManager>
          <Footer />
        </div>
      </body>
    </html>
  );
}

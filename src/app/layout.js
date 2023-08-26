import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import localFont from "next/font/local";

//components

import Header from "../components/Header";

export const metadata = {
  title: "Studio Pignataro",
  description: "Studio Pignataro",
};

const myFont = localFont({
  src: "/fonts/CenturyGothic.ttf",
  display: "swap",
});

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

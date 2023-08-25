import "./globals.css";
// import centuryGothic from '/fonts/CenturyGothic.ttf'
//  import centuryGothic from '../../public/fonts'

//  const myFont = centuryGothic({
//    src: '/fonts/CenturyGothic.ttf',
//    display: 'swap',
//  })

import { Inter } from "next/font/google";

//components

import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Studio Pignataro",
  description: "Studio Pignataro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={""}>
        <div className="layout-wrapper">
          {" "}
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

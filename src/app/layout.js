import "./globals.css";

import localFont from 'next/font/local'

//components

import Header from "../components/Header";


export const metadata = {
  title: "Studio Pignataro",
  description: "Studio Pignataro",
};

const myFont = localFont({
  src: '/fonts/CenturyGothic.ttf',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body >
        <div className="layout-wrapper">
          {" "}
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

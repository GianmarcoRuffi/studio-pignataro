"use client";
import { stripLocale } from "../../locales";

import { FC, ViewTransition } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import ClientPageWrapper from "../ClientPageWrapper/ClientPageWrapper";
import { HeaderHeightManagerProps } from "../../models/models";

const HeaderHeightManager: FC<HeaderHeightManagerProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomepage = stripLocale(pathname) === "/";

  return (
    <>
      <Header />
      <ViewTransition
        key={pathname}
        name="page-content"
        default="none"
        share="page-crossfade"
      >
        <main className={`layout-content ${isHomepage ? "homepage" : ""}`}>
          <div className="layout-scroll-content" data-scroll-content>
            <ClientPageWrapper>{children}</ClientPageWrapper>
          </div>
        </main>
      </ViewTransition>
    </>
  );
};

export default HeaderHeightManager;

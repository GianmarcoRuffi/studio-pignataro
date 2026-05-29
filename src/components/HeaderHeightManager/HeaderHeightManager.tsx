"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import ClientPageWrapper from "../ClientPageWrapper/ClientPageWrapper";
import { HeaderHeightManagerProps } from "../../models/models";

const HeaderHeightManager: FC<HeaderHeightManagerProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <>
      <Header />
      <main className={`layout-content ${isHomepage ? "homepage" : ""}`}>
        <div className="layout-scroll-content" data-scroll-content>
          <ClientPageWrapper>{children}</ClientPageWrapper>
        </div>
      </main>
    </>
  );
};

export default HeaderHeightManager;

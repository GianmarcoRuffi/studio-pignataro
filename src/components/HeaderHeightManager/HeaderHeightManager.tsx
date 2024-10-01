"use client";

import React from "react";
import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "../Header/Header";

interface HeaderHeightManagerProps {
  children: ReactNode;
}

const HeaderHeightManager: React.FC<HeaderHeightManagerProps> = ({
  children,
}) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // Calcolo dell'altezza dell'header all'inizializzazione e quando la finestra viene ridimensionata
    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("load", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("load", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <div className="layout-content" style={{ marginTop: headerHeight }}>
        {children}
      </div>
    </>
  );
};

export default HeaderHeightManager;

"use client"; 

import { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";

const HeaderHeightManager = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // Calcolo dell'altezza dell'header all'inizializzazione e quando la finestra viene ridimensionata
    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);

    // Aggiornamento anche al caricamento della pagina
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

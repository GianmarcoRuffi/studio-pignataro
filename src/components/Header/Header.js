"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

const Header = forwardRef((props, ref) => {
  const pathname = usePathname();
  const isActive = pathname === "/"; // Logica per rendere l'icona della casa attiva
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = 50;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      <div
        className={`${styles.navWrapper} flex justify-between max-lg:flex-col ${
          scrolled ? styles.scrolledNavWrapper : ""
        }`}
      >
        <div
          className={`${styles.logoContainer} ${
            scrolled ? styles.scrolledLogoContainer : ""
          }`}
        >
          <Link href="/">
            <img src="/logo.jpg" alt="Logo" layout="intrinsic" />
          </Link>
        </div>

        <div className={`${styles.homeIcon} ${isActive ? styles.active : ""}`}>
          <Link href="/">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </div>

        <div className={styles.navbar}>
          <ul className={`${styles.navList} uppercase text-sm`}>
            <li
              className={`${pathname === "/" ? styles.active : ""} ${
                styles.notMobile
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li className={pathname === "/projects" ? styles.active : ""}>
              <Link href="/projects">Progetti</Link>
            </li>
            <li className={pathname === "/presses" ? styles.active : ""}>
              <Link href="/presses">Pubblicazioni</Link>
            </li>
            <li className={pathname === "/bio" ? styles.active : ""}>
              <Link href="/bio">Bio</Link>
            </li>
            <li className={pathname === "/contacts" ? styles.active : ""}>
              <Link href="/contacts">Contatti</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;

"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.scss";

interface HeaderProps {}

const Header = forwardRef<HTMLHeadingElement, HeaderProps>((props, ref) => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLDivElement | null>(null);

  // Gestisce lo scroll per ridurre l'header
  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = 50;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chiude il menu quando si naviga su una nuova pagina
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Gestisce il clic fuori dal menu per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={ref}
      className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      <div
        className={`${styles.navWrapper} flex justify-between items-center ${
          scrolled ? styles.scrolledNavWrapper : ""
        }`}
      >
        {/* Logo */}
        <div
          className={`${styles.logoContainer} ${
            scrolled ? styles.scrolledLogoContainer : ""
          }`}
        >
          <Link href="/">
            <img src="/logo.jpg" alt="Logo" className={styles.logoImage} />
          </Link>
        </div>

        {/* Icona Home */}
        <div className={`${styles.homeIcon} ${isActive ? styles.active : ""}`}>
          <Link href="/">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </div>

        {/* Icona menu hamburger */}
        <div
          ref={menuIconRef}
          className={styles.menuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </div>

        {/* Navbar classica (Menu a tendina) */}
        <div
          ref={menuRef}
          className={`${styles.navbar} ${menuOpen ? styles.openMenu : ""}`}
        >
          <ul className={`${styles.navList} uppercase text-sm`}>
            <li className={pathname === "/" ? styles.active : ""}>
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

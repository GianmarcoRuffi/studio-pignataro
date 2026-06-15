"use client";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BRANDING_LOGO_PATH } from "../../constants";
import styles from "./header.module.scss";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Progetti" },
  { href: "/presses", label: "Pubblicazioni" },
  { href: "/bio", label: "Chi sono" },
  { href: "/contacts", label: "Contatti" },
] as const;

const Header: FC = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [suppressHomepageLogoChrome, setSuppressHomepageLogoChrome] =
    useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLButtonElement | null>(null);
  const updateScrolledState = () => {
    const threshold = 50;
    setScrolled(window.scrollY > threshold);
  };

  useEffect(() => {
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState);
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useLayoutEffect(() => {
    setMenuOpen(false);
    setSuppressHomepageLogoChrome(false);
    updateScrolledState();

    const frameId = window.requestAnimationFrame(updateScrolledState);
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  const handleNavigationStart = (href: string) => {
    if (pathname === "/" && href !== "/") {
      setSuppressHomepageLogoChrome(true);
    }

    setMenuOpen(false);
  };

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
      className={`${styles.headerContainer} ${
        isHomepage ? styles.homepage : ""
      } ${scrolled ? styles.scrolled : ""}`}
    >
      <div
        className={`${styles.navWrapper} ${
          scrolled ? styles.scrolledNavWrapper : ""
        }`}
      >
        <div
          className={`${styles.logoContainer} ${
            scrolled ? styles.scrolledLogoContainer : ""
          } ${
            suppressHomepageLogoChrome ? styles.suppressHomepageLogoChrome : ""
          }`}
        >
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoImageFrame}>
            <Image
              src={BRANDING_LOGO_PATH}
              alt="Logo Studio Architetto Pignataro"
              fill
              sizes="(max-width: 480px) 180px, (max-width: 768px) 195px, 180px"
              priority
              className={styles.logoImage}
            />
            </span>
          </Link>
        </div>

        <div className={`${styles.homeIcon} ${isActive ? styles.active : ""}`}>
          <Link href="/">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </div>

        <div className={styles.navbar}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className={pathname === item.href ? styles.active : ""}
              >
                <Link
                  href={item.href}
                  onClick={() => handleNavigationStart(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          ref={menuIconRef}
          className={`${styles.menuIcon} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className={styles.hamburgerLines}>
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
            <span className={styles.line3}></span>
          </div>
        </button>

        <div
          className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ""}`}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setMenuOpen(false)}
            aria-label="Chiudi menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <nav className={styles.fullscreenNav}>
            <ul className={styles.fullscreenNavList}>
              {NAV_ITEMS.map((item) => (
                <li
                  key={`mobile-${item.href}`}
                  className={`${styles.navItem} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                >
                  <Link href={item.href} className={styles.navLink}>
                    <span className={styles.navText}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

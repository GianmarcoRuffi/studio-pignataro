"use client";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BRANDING_LOGO_DIMENSIONS, BRANDING_LOGO_PATH } from "../../constants";
import { getScrollEventTarget, getScrollTop } from "../../utils/scroll";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";
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
  useModalAccessibility(menuOpen, menuRef, () => setMenuOpen(false));
  const updateScrolledState = () => {
    const threshold = 50;
    setScrolled(getScrollTop() > threshold);
  };

  useEffect(() => {
    updateScrolledState();
    const target = getScrollEventTarget();
    target?.addEventListener("scroll", updateScrolledState);
    return () => target?.removeEventListener("scroll", updateScrolledState);
  }, [pathname]);

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
            <picture className={styles.logoImageFrame}>
              <img
                src={BRANDING_LOGO_PATH}
                alt="Logo Studio Architetto Pignataro"
                width={BRANDING_LOGO_DIMENSIONS.width}
                height={BRANDING_LOGO_DIMENSIONS.height}
                className={styles.logoImage}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </Link>
        </div>

        <div className={`${styles.homeIcon} ${isActive ? styles.active : ""}`}>
          <Link href="/" aria-label="Home">
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
          aria-controls="mobile-navigation"
        >
          <div className={styles.hamburgerLines}>
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
            <span className={styles.line3}></span>
          </div>
        </button>

        <div
          id="mobile-navigation"
          ref={menuRef}
          role="dialog"
          aria-modal={menuOpen ? true : undefined}
          aria-label="Menu di navigazione"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          tabIndex={-1}
          data-lenis-prevent
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
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    onClick={() => handleNavigationStart(item.href)}
                  >
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

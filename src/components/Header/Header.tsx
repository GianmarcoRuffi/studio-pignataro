"use client";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { BRANDING_LOGO_DIMENSIONS, BRANDING_LOGO_PATH } from "../../constants";
import { getScrollEventTarget, getScrollTop } from "../../utils/scroll";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";
import styles from "./header.module.scss";
import { messages } from "../../locales";

const NAV_ITEMS = [
  { href: "/", label: messages.navigation.home },
  { href: "/projects", label: messages.navigation.projects },
  { href: "/presses", label: messages.navigation.presses },
  { href: "/bio", label: messages.navigation.bio },
  { href: "/contacts", label: messages.navigation.contacts },
] as const;

const Header: FC = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLButtonElement | null>(null);
  useModalAccessibility(menuOpen, menuRef, () => setMenuOpen(false));
  const updateScrolledState = useCallback(() => {
    const top = getScrollTop();
    setScrolled(
      (wasScrolled) => !isHomepage && (wasScrolled ? top >= 24 : top > 64)
    );
  }, [isHomepage]);

  useEffect(() => {
    updateScrolledState();
    const target = getScrollEventTarget();
    target?.addEventListener("scroll", updateScrolledState);
    return () => target?.removeEventListener("scroll", updateScrolledState);
  }, [pathname, updateScrolledState]);

  useLayoutEffect(() => {
    setMenuOpen(false);
    updateScrolledState();

    const frameId = window.requestAnimationFrame(updateScrolledState);
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, updateScrolledState]);

  useLayoutEffect(() => {
    document.documentElement.dataset.headerCompact = String(
      scrolled && !isHomepage
    );
    return () => {
      delete document.documentElement.dataset.headerCompact;
    };
  }, [scrolled, isHomepage]);

  const handleNavigationStart = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles.headerContainer} ${
        isHomepage ? styles.homepage : ""
      } ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.navWrapper}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <picture className={styles.logoImageFrame}>
              <img
                src={BRANDING_LOGO_PATH}
                alt={messages.navigation.logoAlt}
                width={BRANDING_LOGO_DIMENSIONS.width}
                height={BRANDING_LOGO_DIMENSIONS.height}
                className={styles.logoImage}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
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
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={handleNavigationStart}
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
          aria-label={messages.navigation.toggleMenu}
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
          aria-label={messages.navigation.menu}
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
            aria-label={messages.navigation.closeMenu}
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
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={styles.navLink}
                    onClick={handleNavigationStart}
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

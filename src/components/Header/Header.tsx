"use client";
import { stripLocale, localizedPath } from "../../locales";
import { useLocale } from "../../locales/LocaleProvider";
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

function Flag({ italian }: { italian: boolean }) {
  return (
    <svg
      viewBox="0 0 60 40"
      width="24"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      {italian ? (
        <>
          <path fill="#009246" d="M0 0h20v40H0z" />
          <path fill="#fff" d="M20 0h20v40H20z" />
          <path fill="#ce2b37" d="M40 0h20v40H40z" />
        </>
      ) : (
        <>
          <path fill="#012169" d="M0 0h60v40H0z" />
          <path stroke="#fff" strokeWidth="9" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#c8102e" strokeWidth="3" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#fff" strokeWidth="14" d="M30 0v40M0 20h60" />
          <path stroke="#c8102e" strokeWidth="8" d="M30 0v40M0 20h60" />
        </>
      )}
    </svg>
  );
}

const Header: FC = () => {
  const { messages, locale } = useLocale();
  const navItems = [
    { href: "/", label: messages.navigation.home },
    { href: "/projects", label: messages.navigation.projects },
    { href: "/presses", label: messages.navigation.presses },
    { href: "/bio", label: messages.navigation.bio },
    { href: "/contacts", label: messages.navigation.contacts },
  ] as const;
  const pathname = usePathname();
  const isHomepage = stripLocale(pathname) === "/";
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuPresent, setMenuPresent] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      setMenuPresent(true);
      return;
    }
    const timer = setTimeout(
      () => setMenuPresent(false),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320
    );
    return () => clearTimeout(timer);
  }, [menuOpen]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");
    const close = () => {
      if (media.matches) {
        setMenuOpen(false);
        setMenuPresent(false);
      }
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLButtonElement | null>(null);
  useModalAccessibility(menuOpen || menuPresent, menuRef, () =>
    setMenuOpen(false)
  );
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
          <Link href={localizedPath("/", locale)} className={styles.logoLink}>
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

        <div className={styles.headerActions}>
          <div className={styles.navbar}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className={
                    stripLocale(pathname) === item.href ? styles.active : ""
                  }
                >
                  <Link
                    href={localizedPath(item.href, locale)}
                    aria-current={
                      stripLocale(pathname) === item.href ? "page" : undefined
                    }
                    onClick={handleNavigationStart}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={localizedPath(pathname, locale === "it" ? "en" : "it")}
            hrefLang={locale === "it" ? "en" : "it"}
            className={`${styles.languageSwitch} ${styles.desktopLanguage}`}
            aria-label={messages.navigation.switchLanguage}
          >
            <Flag italian={locale === "en"} />
            <span role="tooltip" className={styles.languageTooltip}>
              {messages.navigation.switchLanguage}
            </span>
          </a>
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
        </div>
        <div
          id="mobile-navigation"
          ref={menuRef}
          role="dialog"
          aria-modal={menuOpen || menuPresent ? true : undefined}
          aria-label={messages.navigation.menu}
          aria-hidden={!menuOpen && !menuPresent}
          inert={!menuOpen && !menuPresent}
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
              {navItems.map((item) => (
                <li
                  key={`mobile-${item.href}`}
                  className={`${styles.navItem} ${
                    stripLocale(pathname) === item.href ? styles.active : ""
                  }`}
                >
                  <Link
                    href={localizedPath(item.href, locale)}
                    aria-current={
                      stripLocale(pathname) === item.href ? "page" : undefined
                    }
                    className={styles.navLink}
                    onClick={handleNavigationStart}
                  >
                    <span className={styles.navText}>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className={styles.mobileLanguage}>
                <a
                  href={localizedPath(pathname, locale === "it" ? "en" : "it")}
                  hrefLang={locale === "it" ? "en" : "it"}
                  className={styles.languageSwitch}
                  aria-label={messages.navigation.switchLanguage}
                >
                  <Flag italian={locale === "en"} />
                  <span role="tooltip" className={styles.languageTooltip}>
                    {messages.navigation.switchLanguage}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

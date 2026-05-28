"use client";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
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
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 50;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      <div
        className={`${styles.navWrapper} flex justify-between items-center ${
          scrolled ? styles.scrolledNavWrapper : ""
        }`}
      >
        <div
          className={`${styles.logoContainer} ${
            scrolled ? styles.scrolledLogoContainer : ""
          }`}
        >
          <Link href="/">
            <Image
              src="/branding/logo.jpg"
              alt="Logo Studio Architetto Pignataro"
              width={360}
              height={120}
              priority
              className={styles.logoImage}
              style={{ width: "auto", height: "auto" }}
            />
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
                <Link href={item.href}>{item.label}</Link>
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

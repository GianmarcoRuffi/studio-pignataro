"use client";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.scss";

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
              src="/logo.jpg"
              alt="Logo"
              width={360}
              height={120}
              className={styles.logoImage}
              style={{ width: "auto" }}
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
              <Link href="/bio">Chi sono</Link>
            </li>
            <li className={pathname === "/contacts" ? styles.active : ""}>
              <Link href="/contacts">Contatti</Link>
            </li>
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
              <li
                className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
              >
                <Link href="/" className={styles.navLink}>
                  <span className={styles.navText}>Home</span>
                </Link>
              </li>
              <li
                className={`${styles.navItem} ${pathname === "/projects" ? styles.active : ""}`}
              >
                <Link href="/projects" className={styles.navLink}>
                  <span className={styles.navText}>Progetti</span>
                </Link>
              </li>
              <li
                className={`${styles.navItem} ${pathname === "/presses" ? styles.active : ""}`}
              >
                <Link href="/presses" className={styles.navLink}>
                  <span className={styles.navText}>Pubblicazioni</span>
                </Link>
              </li>
              <li
                className={`${styles.navItem} ${pathname === "/bio" ? styles.active : ""}`}
              >
                <Link href="/bio" className={styles.navLink}>
                  <span className={styles.navText}>Chi sono</span>
                </Link>
              </li>
              <li
                className={`${styles.navItem} ${pathname === "/contacts" ? styles.active : ""}`}
              >
                <Link href="/contacts" className={styles.navLink}>
                  <span className={styles.navText}>Contatti</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

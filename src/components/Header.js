"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importa usePathname
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname(); // Usa usePathname per ottenere il percorso corrente

  return (
    <header className={styles.headerContainer}>
      <div
        className={`${styles.navWrapper} flex justify-between max-lg:flex-col`}
      >
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/logo.jpg" alt="Logo" layout="intrinsic" />
          </Link>
        </div>

        <div className={styles.navbar}>
          <ul className={`${styles.navList} uppercase text-sm`}>
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
}

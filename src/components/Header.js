import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.navWrapper} flex justify-between max-lg:flex-col`}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/logo.jpg" alt="Logo" layout="intrinsic" />
          </Link>
        </div>

        <div className={styles.navbar}>
          <ul className={`${styles.navList} uppercase text-sm`}>
            <li>
              <Link href="/projects">Progetti</Link>
            </li>
            <li>
              <Link href="/presses">Pubblicazioni</Link>
            </li>
            <li>
              <Link href="/bio">Bio</Link>
            </li>
            <li>
              <Link href="/contacts">Contatti</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

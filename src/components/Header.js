import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className="nav-wrapper items-center flex justify-between max-lg:flex-col">
        <div className="logo-container flex">
          <Link href="/">
            <img src="/logo.jpg" alt="" />
          </Link>
        </div>

        <div className="navbar flex">
          <ul className={`nav-list uppercase text-sm ${styles["nav-list"]}`}>
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

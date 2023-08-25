import React from "react";
import Image from "next/image";
import Link from "next/link";
// import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    
      <header className="">
        <div className="nav-wrapper items-center md:grid grid-cols-2 gap-8 pb-8 ">
          <div className="logo-container flex justify-center mr-20">
            <Link href="/">
              <img
                src="/logo2.jpg"
                alt=""
              
              />
            </Link>
          </div>

          <div className="navbar flex justify-center">
            <ul className="nav-list uppercase text-sm">
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

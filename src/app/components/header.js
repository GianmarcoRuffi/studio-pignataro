import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css'

export default function Header() {
  return (

    <div className={styles.container}>
   
  <header className="flex justify-items-center ">

<div className="logo-container container flex-row justify-center items-center">





<Link href="/"><Image src="/logo.jpg" alt="" width="245" height="156"/></Link>



</div>

<div className="navbar">
  <ul className='nav-list uppercase text-sm'>
    <li><Link href="/">works</Link></li>
    <li><Link href="/presses">presses</Link></li>
    <li><Link href="/bio">bio</Link></li>
    <li><Link href="/contacts">contacts</Link></li>
  </ul>
  </div>

</header>

</div>
   
  );
}
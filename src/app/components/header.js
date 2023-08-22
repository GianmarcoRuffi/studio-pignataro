import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css'

export default function Header() {
  return (

    <div className={styles.container}>
   
  <header>

    <div className="nav-wrapper row justify-between items-center grid grid-cols-2 gap-4 pb-20 ">
      <div className="logo-container  flex justify-center">

<Link href="/"><Image src="/logo.jpg" alt="" width="245" height="156" className="ps-8"/></Link>

</div>

<div className="navbar flex justify-center">
  <ul className='nav-list uppercase text-sm'>
    <li><Link href="/">works</Link></li>
    <li><Link href="/presses">presses</Link></li>
    <li><Link href="/bio">bio</Link></li>
    <li><Link href="/contacts">contacts</Link></li>
  </ul>
  </div>
</div>



</header>

</div>
   
  );
}
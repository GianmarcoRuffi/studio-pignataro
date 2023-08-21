import React from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
   
  <header className="flex justify-items-center ">

<div className="logo-container container flex-row justify-center items-center">



<Image src="/logo.jpg" alt="" width="245" height="156"/>



</div>

<div className="navbar">
  <ul className='uppercase text-sm'>
    <li><Link href="/">works</Link></li>
    <li><Link href="/presses">presses</Link></li>
    <li><Link href="/bio">bio</Link></li>
    <li><Link href="/contacts">contacts</Link></li>
  </ul>
  </div>

</header>
   
  );
}
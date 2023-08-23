import Image from "next/image";
import Header from "../../../components/Header";
import Link from "next/link";
import React from 'react';
import Gallery from "../../../components/Gallery";

const images = [
  '/Glisbo/000.jpg',
  '/Glisbo/001.jpg',
  '/Glisbo/002.jpg',
  '/Glisbo/003.jpg',
  '/Glisbo/004.jpg',
  '/Glisbo/005.jpg',
  '/Glisbo/006.jpg',
  '/Glisbo/007.jpg',
  '/Glisbo/008.jpg',
  '/Glisbo/009.jpg',
];


export default function GalleryOne() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Agenzia pubblicitaria Glisbo"} galleryDescription={"Stand modulare per la “Regione Autonoma della Sardegna”. Www.glisbo.com"} />

     
    </div>
  );
}

import Image from "next/image";
import Header from "../../components/Header";
import Link from "next/link";
import React from 'react';
import Gallery from "../../components/Gallery";

const images = [
  '/IMG_26.jpg',
  '/IMG_05.JPG',
  '/IMG_28.JPG',
  '/IMG_22.jpg',
];


export default function GalleryOne() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Titolo 1"} galleryDescription={"Descrizione1"} />

     
    </div>
  );
}

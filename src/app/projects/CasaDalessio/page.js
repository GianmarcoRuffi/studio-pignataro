import React from 'react';
import Gallery from "../../../components/Gallery";

const images = [
  '/CasaDalessio/1.jpg',
  '/CasaDalessio/2.jpg',
  '/CasaDalessio/3.jpg',
  '/CasaDalessio/4.jpg',
  '/CasaDalessio/5.jpg',
  '/CasaDalessio/6.jpg',
  '/CasaDalessio/7.jpg',
  '/CasaDalessio/8.jpg',
  '/CasaDalessio/9.jpg',
  '/CasaDalessio/10.jpg',
];


export default function Project() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Casa D'Alessio"} galleryDescription={`Ristrutturazione nel palazzo storico Zedda-Piras.
    V.le Regina Margherita n.15, Cagliari
    `} />

     
    </div>
  );
}
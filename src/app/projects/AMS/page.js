import React from 'react';
import Gallery from "../../../components/Gallery";

const images = [
  '/AMS/1.jpg',
  '/AMS/3.jpg',
  '/AMS/2.jpg',
  '/AMS/4.jpg',
  '/AMS/5.jpg',

];


export default function Project() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Agenzia Immobiliare AMS"} galleryDescription={`Interior design e d.l.
    Via Cagliari n.19, Capoterra (CA)
    `} />

     
    </div>
  );
}

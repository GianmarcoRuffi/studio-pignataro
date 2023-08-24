import React from 'react';
import Gallery from "../../../components/Gallery";

const images = [
  '/CasaGuicciardi/1.jpg',
  '/CasaGuicciardi/2.jpg',
  '/CasaGuicciardi/3.jpg',
  '/CasaGuicciardi/4.jpg',
  '/CasaGuicciardi/5.jpg',
  '/CasaGuicciardi/6.jpg',
  '/CasaGuicciardi/7.jpg',
  '/CasaGuicciardi/8.jpg',
  '/CasaGuicciardi/9.jpg',
  '/CasaGuicciardi/10.jpg',
];


export default function Project() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Casa Guicciardi"} galleryDescription={`Ristrutturazione con Interior design. (lavoro pubblicato)
    Via Machiavelli n.108 Cagliari
    `} galleryLink={<a href="https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario">
    {" "}
    https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario
  </a>} 
  galleryLinkTwo={
    <a href="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/">
      {" "}
      https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/
    </a>
  } />

     
    </div>
  );
}

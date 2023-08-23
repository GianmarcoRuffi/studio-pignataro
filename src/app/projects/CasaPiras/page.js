import React from 'react';
import Gallery from "../../../components/Gallery";

const images = [
  '/CasaPiras/1.jpg',
  '/CasaPiras/2.jpg',
  '/CasaPiras/3.jpg',
  '/CasaPiras/4.jpg',
  '/CasaPiras/5.jpg',
  '/CasaPiras/6.jpg',
  '/CasaPiras/7.jpg',
  '/CasaPiras/8.jpg',
  '/CasaPiras/9.jpg',
  '/CasaPiras/10.jpg',
  '/CasaPiras/11.jpg',
  '/CasaPiras/12.jpg',
];


export default function Project() {
  return (
<div>

 <Gallery images={images} galleryTitle={"Casa Piras"} galleryDescription={`Ristrutturazione con Interior design nel centro storico di Cagliari.(lavoro pubblicato)
    Vico V di via S. Giovanni n.6
    https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte
    
    https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti
    `} />

     
    </div>
  );
}

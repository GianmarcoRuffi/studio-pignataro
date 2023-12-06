import React from "react";
import Gallery from "../../../components/Gallery";

const images = [
  "/CasaBarranu/1.jpg",
  "/CasaBarranu/2.jpg",
  "/CasaBarranu/3.jpg",
  "/CasaBarranu/4.jpg",
  "/CasaBarranu/5.jpg",
  "/CasaBarranu/6.jpg",
  "/CasaBarranu/7.jpg",
  "/CasaBarranu/8.jpg",
  "/CasaBarranu/9.jpg",
  "/CasaBarranu/10.jpg",
  "/CasaBarranu/11.jpg",
  "/CasaBarranu/12.jpg",
  "/CasaBarranu/13.jpg",
  "/CasaBarranu/14.jpg",
  "/CasaBarranu/15.jpg",
];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Via Canonico Sanna"}
        galleryDescription={`Ristrutturazione di una palazzina nel centro storico di Baunei (OG)
    `}
        galleryLinks={[""]}
        imgCredits={"Foto © Luigi Corda"}
      />
    </div>
  );
}

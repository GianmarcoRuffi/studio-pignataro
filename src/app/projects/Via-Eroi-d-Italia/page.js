import React from "react";
import Gallery from "../../../components/Gallery";

const images = [
  "/EdificioCommendatore/1.jpg",
  "/EdificioCommendatore/2.jpg",
  "/EdificioCommendatore/3.jpg",
  "/EdificioCommendatore/4.jpg",
  "/EdificioCommendatore/5.jpg",
  "/EdificioCommendatore/6.jpg",
  "/EdificioCommendatore/7.jpg",
  "/EdificioCommendatore/8.jpg",
];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Via Eroi d’Italia"}
        galleryDescription={`Progettazione e Interior design e d.l. di una palazzina residenziale a Cagliari.
    `}
        galleryLinks={[""]}
        imgCredits={"Foto © Matteo Piazza"}
      />
    </div>
  );
}

import React from "react";
import Gallery from "../../../components/Gallery";

const images = [
  "/TangexCorp/1.jpg",
  "/TangexCorp/2.jpg",
  "/TangexCorp/3.jpg",
  "/TangexCorp/4.jpg",
];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Tangex Corp."}
        galleryDescription={`Progettazione di una villa a Ocean Park San Juan, Puerto Rico (U.S.A.)`}
        imgCredits={"Foto © Guanina Santiago de Jesus"}
      />
    </div>
  );
}

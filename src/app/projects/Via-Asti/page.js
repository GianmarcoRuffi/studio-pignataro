import React from "react";
import Gallery from "../../../components/Gallery";
import projects from "../../../data/data";

const images = [
  "/CasaCorda/1.jpg",
  "/CasaCorda/2.jpg",
  "/CasaCorda/3.jpg",
  "/CasaCorda/4.jpg",
  "/CasaCorda/5.jpg",
  "/CasaCorda/6.jpg",
  "/CasaCorda/7.jpg",
  "/CasaCorda/8.jpg",
  "/CasaCorda/9.jpg",
  "/CasaCorda/10.jpg",
  "/CasaCorda/11.jpg",
  "/CasaCorda/12.jpg",
];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Via Asti"}
        galleryDescription={`Ristrutturazione con Interior design a Cagliari.(lavoro pubblicato)`}
        galleryLinks={["https://www.luigicorda.com/"]}
        imgCredits={"Foto © Luigi Corda"}
      />
    </div>
  );
}

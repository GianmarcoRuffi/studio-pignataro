import React from "react";
import Gallery from "../../../components/Gallery";

const images = [
  "/Glisbo/01.jpg",
  "/Glisbo/02.jpg",
  "/Glisbo/03.jpg",
  "/Glisbo/04.jpg",
  "/Glisbo/render.gif",
];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Agenzia pubblicitaria Glisbo"}
        galleryDescription={
          "Stand modulare per la “Regione Autonoma della Sardegna”."
        }
        galleryLinks={["https://glisbo.com/"]}
        imgCredits={
          "Render di Gianpierluigi Secci - 3d Designer -www. mistralstudio.it "
        }
      />
    </div>
  );
}

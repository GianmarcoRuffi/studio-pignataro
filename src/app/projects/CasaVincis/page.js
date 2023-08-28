import React from "react";
import Gallery from "../../../components/Gallery";

const images = ["/CasaVincis/1.jpg", "/CasaVincis/2.jpg", "/CasaVincis/3.jpg"];

export default function Project() {
  return (
    <div>
      <Gallery
        images={images}
        galleryTitle={"Casa Vincis"}
        galleryDescription={`Progettazione e d.l. di una palazzina residenziale.
    Via Vittorio Amedeo II n. 44, Cagliari
    `}
        imgCredits={"Foto © Luigi Corda"}
      />
    </div>
  );
}

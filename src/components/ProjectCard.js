import React from "react";

export default function ProjectCard({ name, imageSource, description }) {
  return (
    <div className="rounded overflow-hidden shadow-lg lg:h-[600px] md:h-[500px] sm:h-auto flex flex-col">
      <div className="lg:h-4/5 sm:h-auto md:h-3/5 w-full">
        {/* Imposta altezza e larghezza fissa per l'immagine */}
        <img
          src={imageSource}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 py-4 flex-1 flex flex-col justify-center">
        {/* Nome del progetto */}
        <div className="font-bold text-lg mb-2 text-left break-words text-sm md:text-base">
          {name}
        </div>

        {/* Descrizione limitata a 3 righe */}
        <p className="text-gray-700 text-sm md:text-base line-clamp-3 text-left">
          {description}
        </p>
      </div>
    </div>
  );
}

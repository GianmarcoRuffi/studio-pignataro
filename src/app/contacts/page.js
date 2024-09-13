"use client";
import { useState, useEffect } from "react";
import { contactsData } from "../../data/contactsData";

export default function Contacts() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Verifica se l'immagine è stata già caricata
  useEffect(() => {
    const img = document.querySelector("img[src='/Studio.jpg']");
    if (img && img.complete) {
      setIsImageLoaded(true); // Se già caricata, attiva subito l'immagine
    }
  }, []);

  return (
    <div className="contacts-container flex justify-center items-center bg-gray-100 max-lg:flex-col">
      <div className="image-container lg:w-2/3 lg:pr-4">
        {/* Aggiunta di opacity e transizione sull'immagine */}
        <img
          src="/Studio.jpg"
          alt="studio"
          className={`max-w-full transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <div className="contacts-box py-8 lg:w-1/3 flex items-center text-xs md:text-sm">
        <ul className="contacts">
          <li className="p-4">
            <strong>Studio:</strong> {contactsData.studio}
          </li>
          <li className="p-4">
            <strong>Email:</strong>{" "}
            <a href={contactsData.email.mailto} className="mailto">
              {contactsData.email.address}
            </a>
          </li>
          <li className="p-4">
            <strong>Telefono:</strong> {contactsData.phone.landline} / Cell.{" "}
            {contactsData.phone.mobile}
          </li>
        </ul>
      </div>
    </div>
  );
}

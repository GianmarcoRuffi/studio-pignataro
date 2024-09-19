"use client";
import { contactsData } from "../../data/contactsData";
import { useImageLoader } from "../../hooks/useImageLoader"; // Importa l'hook
import styles from "./contacts.module.css";

export default function Contacts() {
  const isImageLoaded = useImageLoader(`img[src='${contactsData.image}']`);

  return (
    <div
      className={`${styles.contactsContainer} flex justify-center items-center max-lg:flex-col`}
    >
      <div className="image-container lg:w-2/3 lg:pr-4">
        <img
          src={contactsData.image}
          alt="studio"
          className={`max-w-full transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="contacts-box py-8 lg:w-1/3 flex items-center text-sm md:text-md">
        <ul className="contacts">
          <li className="p-4">
            <strong>Studio:</strong> {contactsData.studio}
          </li>
          <li className="p-4">
            <strong>Email:</strong>{" "}
            <a href={contactsData.email.mailto} className={styles.mailto}>
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

"use client";
import { contactsData } from "../../data/contactsData";
import { useImageLoader } from "../../hooks/useImageLoader";
import styles from "./contacts.module.scss";

export default function Contacts() {
  const isImageLoaded = useImageLoader(`img[src='${contactsData.image}']`);

  return (
    <div className={`${styles.contactsContainer} flex flex-col lg:flex-row`}>
      {/* Image Container */}
      <div className={`${styles.imageContainer} lg:pr-4 mb-8 lg:mb-0`}>
        <img
          src={contactsData.image}
          alt="studio"
          className={`max-w-full transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Info Container */}
      <div className={`${styles.infoContainer} lg:pr-4 flex flex-col`}>
        {/* Contacts Box */}
        <div className={`${styles.contactsBox} pt-8`}>
          <ul className="contacts text-sm md:text-md">
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
              <strong>Telefono:</strong> {contactsData.phone.landline} /{" "}
              <strong>Cell.</strong> {contactsData.phone.mobile}
            </li>
          </ul>
        </div>

        {/* Map Container */}
        <div className={`${styles.mapContainer} pb-2`}>
          <iframe
            src={contactsData.embed_data}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

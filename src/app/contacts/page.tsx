"use client";
import Image from "next/image";
import { useState } from "react";
import { contactsData } from "../../data/contactsData";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import ContactForm from "../../components/ContactForm/ContactForm";
import styles from "./contacts.module.scss";

export default function Contacts() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.studioImage}>
            <Image
              src={contactsData.image}
              alt="Studio Pignataro"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              quality={95}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className={`${styles.studioImg} ${
                isImageLoaded ? styles.loaded : styles.loading
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)}
            />
          </div>
          <div className={styles.studioInfo}>
            <h1 className={styles.pageTitle}>Contatti</h1>
            <p className={styles.studioDescription}>
              Il nostro studio di architettura è situato nel cuore di Cagliari,
              facilmente raggiungibile e sempre pronto ad accogliere i nostri
              clienti.
            </p>
            <a
              href="#contact-form"
              className={styles.contactFormLink}
              onClick={scrollToForm}
            >
              Inviaci un messaggio
            </a>
          </div>
        </div>
      </div>

      <div className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h2 className={styles.sectionTitle}>Informazioni di Contatto</h2>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h3 className={styles.cardTitle}>Dati di Contatto</h3>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Studio:</span>
                  <span className={styles.contactValue}>
                    {contactsData.studio}
                  </span>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email:</span>
                  <a
                    href={contactsData.email.mailto}
                    className={styles.contactLink}
                  >
                    {contactsData.email.address}
                  </a>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Telefono:</span>
                  <span className={styles.contactValue}>
                    {contactsData.phone.landline}
                  </span>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Cellulare:</span>
                  <span className={styles.contactValue}>
                    {contactsData.phone.mobile}
                  </span>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>P.IVA:</span>
                  <span className={styles.contactValue}>
                    {contactsData.p_iva}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.contactCard}>
              <h3 className={styles.cardTitle}>Social Network</h3>
              <div className={styles.socialLinks}>
                <a
                  href={contactsData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  LinkedIn →
                </a>
                <a
                  href={contactsData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Facebook →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mapSection}>
        <div className={styles.mapContent}>
          <h2 className={styles.sectionTitle}>Dove Siamo</h2>
          <div className={styles.mapContainer}>
            <iframe
              src={contactsData.embed_data}
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location"
              className={styles.mapFrame}
            ></iframe>
          </div>
        </div>
      </div>

      <div id="contact-form" className={styles.formSection}>
        <ContactForm />
      </div>

      <ScrollUpButton />
    </div>
  );
}

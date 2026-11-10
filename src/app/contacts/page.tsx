"use client";
import Image from "next/image";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useImageLoad } from "../../hooks/useImageLoad";
import OptionalScripts from "../../components/OptionalScripts/OptionalScripts";
import { openConsentPreferences } from "../../utils/consent";
import styles from "./contacts.module.scss";
import { contactsData } from "./data";

export default function Contacts() {
  const isImageLoaded = useImageLoad(contactsData.image);

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.headerContent}>
        <div className={styles.studioInfo}>
          <p className={styles.eyebrow}>Studio Gianluca Pignataro · Cagliari</p>
          <h1 className={styles.pageTitle}>Contatti</h1>
          <p className={styles.studioDescription}>
            Per parlare di un progetto, scrivimi o contatta lo studio.
          </p>
          <dl className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <dt>Email</dt>
              <dd>
                <a href={contactsData.email.mailto}>
                  {contactsData.email.address}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>Telefono</dt>
              <dd>
                <a href={`tel:+39${contactsData.phone.landline}`}>
                  {contactsData.phone.landline}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>Cellulare</dt>
              <dd>
                <a href={`tel:+39${contactsData.phone.mobile}`}>
                  {contactsData.phone.mobile}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>Studio</dt>
              <dd>{contactsData.studio}</dd>
            </div>
          </dl>
          <p className={styles.vatNumber}>P.IVA {contactsData.vatNumber}</p>
        </div>
        <div className={styles.studioImage}>
          <Image
            src={contactsData.image}
            alt="Interno dello Studio Pignataro a Cagliari"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            priority
            className={`${styles.studioImg} ${isImageLoaded ? styles.loaded : styles.loading}`}
          />
        </div>
      </div>

      <div className={styles.socialSection}>
        <h2>Segui lo studio</h2>
        <div className={styles.socialLinks}>
          <a
            href={contactsData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href={contactsData.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook ↗
          </a>
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2 className={styles.sectionTitle}>Dove siamo</h2>
        <p className={styles.mapAddress}>{contactsData.studio}</p>
        <div className={styles.mapContainer}>
          <OptionalScripts
            fallback={
              <div className={styles.mapPlaceholder}>
                <p>
                  La mappa Google Maps viene caricata solo con il tuo consenso.
                </p>
                <button type="button" onClick={openConsentPreferences}>
                  Gestisci preferenze cookie
                </button>
                <p>{contactsData.studio}</p>
              </div>
            }
          >
            <iframe
              src={contactsData.embedData}
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location"
              className={styles.mapFrame}
            />
          </OptionalScripts>
        </div>
      </div>
      <ScrollUpButton />
    </div>
  );
}

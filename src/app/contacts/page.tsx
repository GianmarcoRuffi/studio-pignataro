"use client";
import { useLocale } from "../../locales/LocaleProvider";
import { formatMessage } from "../../locales";

import Image from "next/image";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useImageLoad } from "../../hooks/useImageLoad";
import OptionalScripts from "../../components/OptionalScripts/OptionalScripts";
import { openConsentPreferences } from "../../utils/consent";
import styles from "./contacts.module.scss";
import { contactsData } from "./data";

export default function Contacts() {
  const { messages } = useLocale();
  const isImageLoaded = useImageLoad(contactsData.image);

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.headerContent}>
        <div className={styles.studioInfo}>
          <p className={styles.eyebrow}>{messages.ui.contacts.eyebrow}</p>
          <h1 className={styles.pageTitle}>{messages.ui.common.contacts}</h1>
          <p className={styles.studioDescription}>
            {messages.ui.contacts.intro}
          </p>
          <dl className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <dt>{messages.ui.contacts.email}</dt>
              <dd>
                <a href={contactsData.email.mailto}>
                  {contactsData.email.address}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>{messages.ui.contacts.phone}</dt>
              <dd>
                <a href={`tel:+39${contactsData.phone.landline}`}>
                  {contactsData.phone.landline}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>{messages.ui.contacts.mobile}</dt>
              <dd>
                <a href={`tel:+39${contactsData.phone.mobile}`}>
                  {contactsData.phone.mobile}
                </a>
              </dd>
            </div>
            <div className={styles.contactItem}>
              <dt>{messages.ui.contacts.studio}</dt>
              <dd>{contactsData.studio}</dd>
            </div>
          </dl>
          <p className={styles.vatNumber}>
            {formatMessage(messages.ui.contacts.vatNumber, {
              number: contactsData.vatNumber,
            })}
          </p>
        </div>
        <div className={styles.studioImage}>
          <Image
            src={contactsData.image}
            alt={messages.ui.contacts.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            priority
            className={`${styles.studioImg} ${isImageLoaded ? styles.loaded : styles.loading}`}
          />
        </div>
      </div>

      <div className={styles.socialSection}>
        <h2>{messages.ui.contacts.follow}</h2>
        <div className={styles.socialLinks}>
          <a
            href={contactsData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.ui.contacts.linkedin}
          </a>
          <a
            href={contactsData.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.ui.contacts.facebook}
          </a>
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2 className={styles.sectionTitle}>{messages.ui.contacts.location}</h2>
        <p className={styles.mapAddress}>{contactsData.studio}</p>
        <div className={styles.mapContainer}>
          <OptionalScripts
            fallback={
              <div className={styles.mapPlaceholder}>
                <p>{messages.ui.contacts.mapConsent}</p>
                <button type="button" onClick={openConsentPreferences}>
                  {messages.ui.contacts.manageConsent}
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
              title={messages.ui.contacts.mapTitle}
              className={styles.mapFrame}
            />
          </OptionalScripts>
        </div>
      </div>
      <ScrollUpButton />
    </div>
  );
}

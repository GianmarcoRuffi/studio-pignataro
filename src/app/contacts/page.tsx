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
            aria-label={messages.ui.contacts.linkedin}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.89a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.86H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.58 1.96 3.58 4.51v5.27Z" />
            </svg>
          </a>
          <a
            href={contactsData.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={messages.ui.contacts.facebook}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
            </svg>
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

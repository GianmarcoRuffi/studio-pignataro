import React from "react";
import styles from "./footer.module.css";
import { contactsData } from "../data/contactsData";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div
        className={`${styles.footerWrapper} flex justify-start max-lg:flex-col`}
      >
        <div className="footer-contacts flex">
          <ul className={`${styles.footerList} p-4`}>
            <li>{contactsData.studio}</li>
            <li>
              Tel: {contactsData.phone.landline} / Cell.{" "}
              {contactsData.phone.mobile}
            </li>
            <li>
              <a href={contactsData.email.mailto}>
                {contactsData.email.address}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { contactsData } from "../../data/contactsData";

const Footer: FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        <div className={styles.copyright}>&copy; Gianluca Pignataro</div>

        <div className={styles.footerContent}>
          <ul className={styles.footerList}>
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
            <li>P.iva: {contactsData.p_iva}</li>
          </ul>
        </div>

        <div className={styles.policyLinks}>
          <Link href="/privacy-policy" className={styles.policyLink}>
            Privacy Policy
          </Link>
          <span className={styles.separator}>•</span>
          <Link href="/cookie-policy" className={styles.policyLink}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

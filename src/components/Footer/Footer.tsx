"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./footer.module.scss";
import { LEGAL_PATHS } from "../../constants";
import { sharedContactsData } from "../../data/contactsData";

const Footer: FC = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <footer
      className={`${styles.footerContainer} ${
        isHomepage ? styles.homepage : ""
      }`}
    >
      <div className={styles.footerWrapper}>
        <div className={styles.footerPanel}>
          <div className={styles.copyright}>&copy; Gianluca Pignataro</div>

          <div className={styles.footerContent}>
            <ul className={styles.footerList}>
              <li>{sharedContactsData.studio}</li>
              <li>
                Tel: {sharedContactsData.phone.landline} / Cell.{" "}
                {sharedContactsData.phone.mobile}
              </li>
              <li>
                <a href={sharedContactsData.email.mailto}>
                  {sharedContactsData.email.address}
                </a>
              </li>
              <li>P.iva: {sharedContactsData.vatNumber}</li>
            </ul>
          </div>

          <div className={styles.policyLinks}>
            <Link href={LEGAL_PATHS.privacyPolicy} className={styles.policyLink}>
              Privacy Policy
            </Link>
            <span className={styles.separator}>•</span>
            <Link href={LEGAL_PATHS.cookiePolicy} className={styles.policyLink}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { openConsentPreferences } from "../../utils/consent";
import styles from "./footer.module.scss";
import { LEGAL_PATHS } from "../../constants";
import { messages } from "../../locales";

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
          <div className={styles.copyright}>
            &copy; {messages.footer.copyright}
          </div>

          <div className={styles.policyLinks}>
            <Link
              href={LEGAL_PATHS.privacyPolicy}
              className={styles.policyLink}
            >
              {messages.footer.privacy}
            </Link>
            <span className={styles.separator}>•</span>
            <Link href={LEGAL_PATHS.cookiePolicy} className={styles.policyLink}>
              {messages.footer.cookies}
            </Link>
          </div>
          <button
            type="button"
            className={styles.preferencesButton}
            onClick={openConsentPreferences}
          >
            {messages.footer.preferences}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

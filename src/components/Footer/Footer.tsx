"use client";
import { stripLocale, localizedPath } from "../../locales";
import { useLocale } from "../../locales/LocaleProvider";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { openConsentPreferences } from "../../utils/consent";
import styles from "./footer.module.scss";
import { LEGAL_PATHS } from "../../constants";

const Footer: FC = () => {
  const { messages, locale } = useLocale();
  const pathname = usePathname();
  const isHomepage = stripLocale(pathname) === "/";

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
              href={localizedPath(LEGAL_PATHS.privacyPolicy, locale)}
              className={styles.policyLink}
            >
              {messages.footer.privacy}
            </Link>
            <span className={styles.separator}>•</span>
            <Link
              href={localizedPath(LEGAL_PATHS.cookiePolicy, locale)}
              className={styles.policyLink}
            >
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

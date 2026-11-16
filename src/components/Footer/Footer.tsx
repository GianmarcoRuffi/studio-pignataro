"use client";
import { stripLocale } from "../../locales";
import { useLocale } from "../../locales/LocaleProvider";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { openConsentPreferences } from "../../utils/consent";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  const { messages } = useLocale();
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

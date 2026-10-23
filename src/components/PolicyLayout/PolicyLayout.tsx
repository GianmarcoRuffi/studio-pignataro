import { FC, ReactNode } from "react";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import styles from "./PolicyLayout.module.scss";

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
  containerClassName?: string;
}

/**
 * Shared layout for policy pages (Privacy, Cookie, etc.)
 * Provides consistent structure and styling
 */
export const PolicyLayout: FC<PolicyLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  children,
  containerClassName = styles.policyContainer,
}) => {
  return (
    <div className={containerClassName}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <p className={styles.pageSubtitle}>{subtitle}</p>
          <p className={styles.lastUpdated}>
            Ultimo aggiornamento:{" "}
            <time dateTime={lastUpdated}>
              {new Date(`${lastUpdated}T00:00:00Z`).toLocaleDateString(
                "it-IT",
                { timeZone: "UTC" }
              )}
            </time>
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.policyContent}>{children}</div>
      </div>

      <ScrollUpButton />
    </div>
  );
};

export default PolicyLayout;

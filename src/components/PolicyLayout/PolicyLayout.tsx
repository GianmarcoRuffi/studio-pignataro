import { FC, ReactNode } from "react";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import styles from "./PolicyLayout.module.scss";

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
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
  children,
  containerClassName = styles.policyContainer,
}) => {
  return (
    <div className={containerClassName}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <p className={styles.pageSubtitle}>{subtitle}</p>
          <p className={styles.lastUpdated} suppressHydrationWarning>
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
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

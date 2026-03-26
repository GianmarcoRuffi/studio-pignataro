"use client";

import { FC } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  message?: string;
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

const Loader: FC<LoaderProps> = ({
  message = "Caricamento...",
  size = "medium",
  overlay = true,
}) => {
  return (
    <div className={`${styles.loader} ${overlay ? styles.overlay : ""}`}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.circle}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;

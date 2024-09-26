import React from "react";
import styles from "./presses-skeleton.module.css";

export default function PressesSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonButton}></div>
      <div className={styles.spinner}></div>
    </div>
  );
}

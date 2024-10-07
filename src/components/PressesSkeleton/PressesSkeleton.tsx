import React from "react";
import styles from "./presses-skeleton.module.scss";

const PressesSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonButton}></div>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default PressesSkeleton;

"use client";
import React from "react";
import styles from "./main-skeleton.module.scss";

const MainSkeleton: React.FC = () => {
  return (
    <div className={styles.mainSkeleton}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default MainSkeleton;

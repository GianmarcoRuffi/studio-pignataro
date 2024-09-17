"use client";
import React from "react";
import styles from "./main-skeleton.module.css";

export default function MainSkeleton() {
  return (
    <div className={styles.mainSkeleton}>
      <div className={styles.loader}></div>
    </div>
  );
}

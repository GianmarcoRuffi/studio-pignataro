"use client";
import React from "react";
import styles from "./slider-skeleton.module.css";

export default function SliderSkeleton() {
  return (
    <div className={styles.sliderSkeleton}>
      <div className={styles.loader}></div>
    </div>
  );
}

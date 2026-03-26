import { FC } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFoundContent } from "../data/data";
import styles from "./styles/not-found.module.scss";

export const metadata: Metadata = {
  title: "Pagina non trovata",
};

const NotFound: FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.title}>{notFoundContent.title}</h2>
      <Link href={notFoundContent.ctaHref} className={styles.link}>
        <strong>{notFoundContent.ctaLabel}</strong>
      </Link>
    </div>
  );
};

export default NotFound;

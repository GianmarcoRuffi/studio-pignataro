"use client";
import { localizedPath } from "../locales";
import { useLocale } from "../locales/LocaleProvider";
import { FC } from "react";
import Link from "next/link";
import { getNotFoundContent } from "./not-found.data";
import styles from "./styles/not-found.module.scss";

const NotFound: FC = () => {
  const { messages, locale } = useLocale();
  const notFoundContent = getNotFoundContent(messages);
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.title}>{notFoundContent.title}</h2>
      <Link
        href={localizedPath(notFoundContent.ctaHref, locale)}
        className={styles.link}
      >
        <strong>{notFoundContent.ctaLabel}</strong>
      </Link>
    </div>
  );
};

export default NotFound;

"use client";
import { localizedPath } from "../../locales";
import { useLocale } from "../../locales/LocaleProvider";
import { FC } from "react";
import Link from "next/link";
import { LinkButtonProps } from "../../models/models";
import styles from "./link-button.module.scss";

const LinkButton: FC<LinkButtonProps> = ({ href, children, target, rel }) => {
  const { locale } = useLocale();
  return (
    <Link
      href={localizedPath(href, locale)}
      target={target}
      rel={rel}
      className={styles.linkButton}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

import React from "react";
import Link from "next/link";
import styles from "./link-button.module.scss";

const LinkButton = ({ href, children }) => {
  return (
    <Link href={href} className={styles.linkButton}>
      {children}
    </Link>
  );
};

export default LinkButton;

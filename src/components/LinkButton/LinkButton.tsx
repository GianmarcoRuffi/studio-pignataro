import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./link-button.module.scss";
import { LinkButtonProps } from "../../models/models";

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  target,
  rel,
}) => {
  return (
    <Link href={href} className={styles.linkButton} target={target} rel={rel}>
      {children}
    </Link>
  );
};

export default LinkButton;

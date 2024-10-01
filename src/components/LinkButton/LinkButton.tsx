import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./link-button.module.scss";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}

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

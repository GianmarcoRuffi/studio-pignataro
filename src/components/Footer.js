import React from "react";
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={`${styles.footerWrapper} flex justify-start max-lg:flex-col`}>
        <div className="footer-contacts flex">
          <ul className={`${styles.footerList} p-4`}>
            <li>Via Ada Negri 12, 09127 Cagliari</li>
            <li>0703517306 / Cell. 3485189797</li>
            <li>
              <a href="mailto:glpignataro@yahoo.it">glpignataro@yahoo.it</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

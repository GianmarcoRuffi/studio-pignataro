import Link from "next/link";
import styles from "./styles/not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.title}>
        Siamo spiacenti, la pagina che hai cercato non esiste.
      </h2>
      <Link href="/" className={styles.link}>
        <strong>Clicca qui per tornare alla home</strong>
      </Link>
    </div>
  );
}

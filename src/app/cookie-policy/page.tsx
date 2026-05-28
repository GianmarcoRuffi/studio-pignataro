"use client";

import PolicyLayout from "../../components/PolicyLayout/PolicyLayout";
import { cookiePolicyData, cookieDisclaimerNote } from "./data";
import styles from "./cookie.module.scss";

export default function CookiePolicy() {
  return (
    <PolicyLayout
      title="Cookie Policy"
      subtitle="Informativa sull'utilizzo dei cookie"
    >
      {cookiePolicyData.map((section) => (
        <section key={section.id} className={styles.section}>
          <h2>{section.title}</h2>
          {typeof section.content === "string" && section.content && (
            <p>{section.content}</p>
          )}
          {Array.isArray(section.content) &&
            section.content.map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}

          {section.subsections?.map((subsection, idx) => (
            <div key={idx}>
              <h3>{subsection.title}</h3>
              <p>{subsection.content}</p>
              {subsection.list && (
                <ul>
                  {subsection.list.items.map((item, itemIdx) => (
                    <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </div>
          ))}

          {section.list && (
            <ul>
              {section.list.items.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          )}

          {section.id === "gestione" && (
            <p dangerouslySetInnerHTML={{ __html: cookieDisclaimerNote }} />
          )}

          {section.cookieTable && (
            <div className={styles.cookieTable}>
              <div className={styles.tableHeader}>
                <span>Nome</span>
                <span>Scopo</span>
                <span>Durata</span>
                <span>Tipo</span>
              </div>
              {section.cookieTable.map((row, idx) => (
                <div key={idx} className={styles.tableRow}>
                  <span>{row.name}</span>
                  <span>{row.purpose}</span>
                  <span>{row.duration}</span>
                  <span>{row.type}</span>
                </div>
              ))}
            </div>
          )}

          {section.contactInfo && (
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${section.contactInfo.email}`}>
                  {section.contactInfo.email}
                </a>
              </p>
              <p>
                <strong>Telefono:</strong>{" "}
                <a href={`tel:+39${section.contactInfo.phone.replace(/\s/g, "")}`}>
                  {section.contactInfo.phone}
                </a>
              </p>
              <p>
                <strong>Cellulare:</strong>{" "}
                <a href={`tel:+39${section.contactInfo.mobile.replace(/\s/g, "")}`}>
                  {section.contactInfo.mobile}
                </a>
              </p>
              <p>
                <strong>Indirizzo:</strong> {section.contactInfo.address}
              </p>
              <p>
                <strong>P.IVA:</strong> {section.contactInfo.vat}
              </p>
            </div>
          )}
        </section>
      ))}
    </PolicyLayout>
  );
}

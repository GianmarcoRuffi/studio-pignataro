"use client";

import { privacyPolicyUpdatedAt } from "./data";
import PolicyLayout from "../../components/PolicyLayout/PolicyLayout";
import { privacyPolicyData, privacyContactEmail } from "./data";
import styles from "./privacy.module.scss";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      lastUpdated={privacyPolicyUpdatedAt}
      title="Privacy Policy"
      subtitle="Informativa sul trattamento dei dati personali"
    >
      {privacyPolicyData.map((section) => (
        <section key={section.id} className={styles.section}>
          <h2>{section.title}</h2>
          {typeof section.content === "string" ? (
            <p>{section.content}</p>
          ) : (
            section.content.map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))
          )}
          {section.list && (
            <ul>
              {section.list.items.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          )}
          {section.id === "diritti" && (
            <p>
              Per esercitare i propri diritti, contattare:
              <a href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
            </p>
          )}
        </section>
      ))}
    </PolicyLayout>
  );
}

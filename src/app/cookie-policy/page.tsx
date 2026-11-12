"use client";
import { useLocale } from "../../locales/LocaleProvider";

import { cookiePolicyUpdatedAt } from "./data";
import PolicyLayout from "../../components/PolicyLayout/PolicyLayout";
import { getCookiePolicyData, getCookieDisclaimerNote } from "./data";
import styles from "./cookie.module.scss";

export default function CookiePolicy() {
  const { messages } = useLocale();
  const cookiePolicyData = getCookiePolicyData(messages);
  const cookieDisclaimerNote = getCookieDisclaimerNote(messages);
  return (
    <PolicyLayout
      lastUpdated={cookiePolicyUpdatedAt}
      title={messages.ui.common.cookies}
      subtitle={messages.ui.policy.cookieSubtitle}
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
                    <li
                      key={itemIdx}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
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
                <span>{messages.ui.policy.name}</span>
                <span>{messages.ui.policy.purpose}</span>
                <span>{messages.ui.policy.duration}</span>
                <span>{messages.ui.policy.type}</span>
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
                <strong>{messages.ui.policy.email}</strong>{" "}
                <a href={`mailto:${section.contactInfo.email}`}>
                  {section.contactInfo.email}
                </a>
              </p>
              <p>
                <strong>{messages.ui.policy.phone}</strong>{" "}
                <a
                  href={`tel:+39${section.contactInfo.phone.replace(/\s/g, "")}`}
                >
                  {section.contactInfo.phone}
                </a>
              </p>
              <p>
                <strong>{messages.ui.policy.mobile}</strong>{" "}
                <a
                  href={`tel:+39${section.contactInfo.mobile.replace(/\s/g, "")}`}
                >
                  {section.contactInfo.mobile}
                </a>
              </p>
              <p>
                <strong>{messages.ui.policy.address}</strong>{" "}
                {section.contactInfo.address}
              </p>
              <p>
                <strong>{messages.ui.policy.vat}</strong>{" "}
                {section.contactInfo.vat}
              </p>
            </div>
          )}
        </section>
      ))}
    </PolicyLayout>
  );
}

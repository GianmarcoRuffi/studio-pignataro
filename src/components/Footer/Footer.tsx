import React from "react";
import styles from "./footer.module.scss";
import { contactsData } from "../../data/contactsData";

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footerContainer} flex flex-col items-center`}>
      <div
        className={`${styles.footerWrapper} flex justify-center max-lg:flex-col`}
      >
        <div className="footer-contacts flex mb-4">
          <ul className={`${styles.footerList} p-4`}>
            <li>{contactsData.studio}</li>
            <li>
              Tel: {contactsData.phone.landline} / Cell.{" "}
              {contactsData.phone.mobile}
            </li>
            <li>
              <a href={contactsData.email.mailto}>
                {contactsData.email.address}
              </a>
            </li>
            <li>P.iva: {contactsData.p_iva}</li>

            {/* <li>
              <a
                href={contactsData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={contactsData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaFacebook className="text-xl" />
                <span>Facebook</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="text-center text-xs">&copy; Gianluca Pignataro</div>
    </footer>
  );
};

export default Footer;
